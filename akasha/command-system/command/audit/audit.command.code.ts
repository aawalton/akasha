import { resolve } from "node:path"
import { auditingIn, everythingIn } from "../../../checks-system/checking/checking.module.code.ts"
import type {
  Judged,
  Judging,
  Leaving,
} from "../../../checks-system/judging/judging.module.code.ts"
import { counted } from "../../asking/asking.module.code.ts"
import type { Answer, Given, Surface } from "../../calling/calling.module.code.ts"
import { oneLine } from "../../landing/landing.module.code.ts"

export const ANSWER_CEILING = 28000

const NOTHING_RUNS =
  "no check runs at audit, so nothing would judge the folder and a clean answer would mean nothing"

export const surface: Surface = {
  taking: [],
  notes: [
    "audit takes nothing: it judges every file the index names.",
    "a flag naming fewer files is refused, because an audit over some of them would answer as " +
      "though it had judged them all.",
    "it writes nothing, and holds nothing still while it runs.",
  ],
}

function whyOf(thrown: unknown): string {
  return oneLine(thrown instanceof Error ? thrown.message : String(thrown))
}

export function heldTo(said: readonly string[], ceiling: number): readonly string[] {
  const held: string[] = []
  let bytes = 0
  for (const one of said) {
    bytes += new TextEncoder().encode(one).length + 1
    if (bytes > ceiling) {
      held.push(
        `${counted(said.length - held.length, "more refusal")} is not here — one answer holds ` +
          `${ceiling} bytes, and what stands above is where to start`
      )
      return held
    }
    held.push(one)
  }
  return held
}

export function judgedOver(judging: Judging, leaving: Leaving): Answer {
  if (judging.named.length === 0) return { report: [], refusals: [NOTHING_RUNS], code: 3 }
  let said: readonly Judged[]
  try {
    said = judging.over(leaving)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  const over = `${counted(judging.named.length, "check")} judged ${counted(leaving.changed.length, "file")}`
  if (said.length === 0) return { report: [`${over}, and none refused`], refusals: [], code: 0 }
  const lines = said.map((one) => `${one.path} — ${oneLine(one.reason)}`)
  return {
    report: [`${over}, and ${counted(said.length, "refusal")} stands`],
    refusals: heldTo(lines, ANSWER_CEILING),
    code: 2,
  }
}

export function audit(argv: readonly string[], given: Given): Answer {
  const one = argv[0]
  if (one !== undefined) {
    return {
      report: [],
      refusals: [
        `\`${one}\` is not an argument this takes — an audit judges every file the index names, ` +
          "and takes nothing that would narrow it",
      ],
      code: 1,
    }
  }
  const root = resolve(given.root)
  try {
    return judgedOver(auditingIn(root), everythingIn(root))
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
}
