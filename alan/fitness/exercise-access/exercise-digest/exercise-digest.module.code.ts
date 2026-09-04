import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { InputError } from "@akasha/errors-core/exit-code"
import { chosenIn } from "../exercise-choosing/exercise-choosing.module.code.ts"
import { FOCUS_OPTIONS } from "../exercise-vocabulary/exercise-vocabulary.module.code.ts"
import { readBodyweight } from "../selection-policy/selection-policy.module.code.ts"
import type { SetLine } from "../set-history/set-history.module.code.ts"
import { targetSaid } from "../set-target/set-target.module.code.ts"
import { trainingDigest } from "../training-digest/training-digest.module.code.ts"

export const HELP: CommandHelp = {
  flags: [
    {
      name: "--focus",
      argLabel: `<${FOCUS_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Focus to brief (default: today's scheduled focus)",
    },
    { name: "--json", description: "Emit the full digest as a JSON envelope" },
  ],
  exits: [
    { code: 0, meaning: "digest printed" },
    { code: 1, meaning: "bad input or query failure" },
  ],
  examples: [
    "ops exercise digest",
    "ops exercise digest --focus push",
    "ops exercise digest --json",
  ],
}

function setLineStr(line: SetLine | null): string {
  if (line === null) return "-"
  const weight = line.weight ?? "-"
  const reps = line.reps ?? "-"
  const date = line.date ?? "-"
  return `${weight}×${reps} (${date})`
}

export default async function exerciseDigest(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const focusRaw = parsed.string("--focus")
  let focus: string | undefined
  if (focusRaw !== undefined) {
    const chosen = chosenIn("--focus", focusRaw, FOCUS_OPTIONS)
    if ("refused" in chosen) throw new InputError(chosen.refused)
    focus = chosen.chosen
  }
  const json = parsed.boolean("--json")

  const digested = await trainingDigest(focus, new Date(), readBodyweight())
  if ("refused" in digested) throw new Error(digested.refused)
  const digest = digested.digest

  if (json) {
    process.stdout.write(`${JSON.stringify(digest)}\n`)
    return
  }

  let out = ""
  out += `date\t${digest.date}\n`
  out += `focus\t${digest.focus ?? "(none scheduled)"}\n`
  out += `bodyweight\t${digest.bodyweight}\n`

  out += "\n# last trained by focus\n"
  for (const r of digest.lastTrainedByFocus) out += `${r.focus}\t${r.lastTrained ?? "never"}\n`

  out += "\n# equipment\n"
  for (const e of digest.equipment) {
    const avail = e.available ? "" : "\t(proposed)"
    out += `${e.title}\t${e.category ?? "-"}\t${e.configuration ?? "-"}\t${e.loads ?? "-"}${avail}\n`
  }

  out += "\n# movements\n"
  for (const m of digest.movements) {
    out += `${m.name}\tlast ${setLineStr(m.last)}\tbest ${setLineStr(m.best)}\ttarget ${targetSaid(m.target) ?? "-"}\n`
  }

  out += "\n# last session\n"
  if (digest.lastSession !== null) {
    out += `${digest.lastSession.date ?? "-"}\tvolume ${digest.lastSession.totalVolume}\t${digest.lastSession.movements.join(", ")}\n`
  } else {
    out += "(no logged session for this focus)\n"
  }

  out += "\n# mobility\n"
  for (const mob of digest.mobility) {
    const side = mob.side !== null ? ` (${mob.side})` : ""
    out += `${mob.metric}${side}\t${mob.latestText ?? "-"}\t${mob.latestNum ?? "-"}\t${mob.trend}\t${mob.date ?? "-"}\n`
  }

  out += "\n# constraints\n"
  for (const c of digest.constraints) {
    const tags = c.focusTags.length > 0 ? c.focusTags.join(",") : "-"
    out += `${c.kind ?? "-"}\t${tags}\t${c.title}\n`
  }

  process.stdout.write(out)
}

export const help = HELP
