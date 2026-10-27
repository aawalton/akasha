import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { loadedOff } from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  linesAskedFor,
  type Summed,
  settledAt,
  summedFor,
  sumsOf,
} from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { rolledBy } from "akasha/command/pages/story/modules/settle-difficulty/settle-difficulty.module.code.ts"
import { seedAfter } from "akasha/command/pages/story/modules/settle-seeding/settle-seeding.module.code.ts"
import {
  NEXT,
  type Placed,
  placedFor,
} from "akasha/command/pages/story/montage/modules/montage-placing/montage-placing.module.code.ts"
import {
  montageRan,
  type Next,
  type Ran,
  type Rules,
} from "akasha/command/pages/story/montage/modules/montage-running/montage-running.module.code.ts"
import { taken } from "akasha/command/pages/story/montage/modules/montage-taking/montage-taking.module.code.ts"
import { onDisk } from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import { pathOf } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import { thrownFrom } from "akasha/story/world/mechanics/modules/dice-throwing/dice-throwing.module.code.ts"
import { z } from "zod"

const TAB = "\t"

const NEXT_SAID = z.object({
  reading: z.record(z.string(), z.unknown()),
  crossed: z.array(z.string()),
  left: z.string().nullable(),
})

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

function nextSaid(root: string, code: string, reading: unknown, answered: unknown): Held<Next> {
  const next = loadedOff(root, code)[NEXT]
  if (typeof next !== "function") return { refused: `exports no \`${NEXT}\`` }
  try {
    const said = NEXT_SAID.safeParse(next(reading, answered))
    if (said.success) return { answered: said.data }
    return { refused: `\`${NEXT}\` answers ${z.prettifyError(said.error)}` }
  } catch (error) {
    const why = error instanceof Error ? error.message : String(error)
    return { refused: `\`${NEXT}\` threw: ${why}` }
  }
}

function rulesFor(root: string, placed: Placed): Rules {
  const codeOf = (check: string): string => placed.codes.get(check) ?? check
  return {
    cast: (before, place, dice) => {
      const seed = seedAfter(before, placed.on.slug, place, placed.unmade)
      const thrown = thrownFrom(seed, dice)
      if ("refused" in thrown) return thrown
      const roll = rolledBy(thrown.answered.roll, placed.odds)
      const moved = placed.odds === null ? {} : { difficultyLevel: placed.odds }
      return { answered: { stated: { dice: thrown.answered.dice, seed, ...moved }, roll } }
    },
    settle: async (check, reading, roll) => await settledAt(root, codeOf(check), reading, roll),
    next: (check, reading, answered) => nextSaid(root, codeOf(check), reading, answered),
  }
}

function totalled(sums: readonly Summed[]): readonly Summed[] {
  const totals = new Map<string, Summed>()
  for (const one of sums) {
    const named = `${one.at}${TAB}${one.key}`
    totals.set(named, { ...one, by: (totals.get(named)?.by ?? 0) + one.by })
  }
  return [...totals.values()]
}

function rowsOf(
  ran: Ran,
  placed: Placed,
  sums: readonly Summed[],
  commit: string | null
): readonly string[] {
  const { montage, on } = placed
  const rows = [
    `check${TAB}${montage.activity.check}`,
    `turn${TAB}${on.slug}`,
    `from${TAB}${montage.from}`,
    `sessions${TAB}${ran.sessions.length}`,
    `endsAt${TAB}${ran.endsAt}`,
  ]
  for (const one of ran.sessions) {
    for (const crossed of one.crossed) {
      rows.push(["crossed", one.session, one.endsAt, crossed].join(TAB))
    }
    if (one.left !== null) rows.push(["left", one.session, one.endsAt, one.left].join(TAB))
  }
  rows.push(`stopped${TAB}${ran.stopped}${TAB}${ran.why}`)
  for (const one of totalled(sums)) rows.push(["added", one.at, one.key, one.by].join(TAB))
  rows.push(commit === null ? `landed${TAB}nothing` : `commit${TAB}${commit}`)
  return rows
}

async function ranOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const placed = placedFor(given.root, held)
  if ("refused" in placed) return refused(placed.refused, placed.by)
  const said = await montageRan(placed.montage, rulesFor(given.root, placed))
  if ("refused" in said) return refused(said.refused, DATA)
  const ran = said.answered
  if (ran.lines.length === 0) return told(rowsOf(ran, placed, [], null))
  const sums = sumsOf(ran.added, (one) => pathOf(given.root, one))
  if ("refused" in sums) return refused(sums.refused, DATA)
  const read = onDisk(given.root)
  const asked = linesAskedFor(placed.at, placed.on.at, ran.lines, ran.endsAt, read(placed.on.at))
  const landed = await landing(
    given.root,
    [...asked, ...summedFor(sums, read)],
    `montage ${held.check} on ${placed.on.slug}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(rowsOf(ran, placed, sums, landed.commit))
}

export async function storyMontage(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await ranOn(done, argv, given, landing))
}
