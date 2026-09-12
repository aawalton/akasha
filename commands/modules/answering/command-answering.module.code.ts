import { EXIT } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { framesOf, whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"

export const OK: number = EXIT.OK

export const INPUT: number = EXIT.INPUT

export const DATA: number = EXIT.DATA

export const OPERATIONAL: number = EXIT.OPERATIONAL

export const UNCLASSIFIED: number = EXIT.UNCLASSIFIED

const CARRIES_A_CODE: ReadonlySet<string> = new Set([
  "ExitError",
  "CliError",
  "InputError",
  "DataError",
  "OperationalError",
])

export function refusedBy(said: readonly string[], code = INPUT): Answer {
  return { report: [], refusals: said, code }
}

export function told(report: readonly string[]): Answer {
  return { report, refusals: [], code: OK }
}

export function asJson(value: unknown): Answer {
  return told([JSON.stringify(value)])
}

export function asIndentedJson(value: unknown): Answer {
  return told(JSON.stringify(value, null, 2).split("\n"))
}

export function codeOf(thrown: unknown): number {
  if (thrown instanceof Error && CARRIES_A_CODE.has(thrown.name)) {
    const held = (thrown as { readonly code?: unknown }).code
    if (typeof held === "number" && held >= INPUT && held <= OPERATIONAL) return held
  }
  return OPERATIONAL
}

export function faulted(thrown: unknown): Answer {
  const [frame] = framesOf(thrown, 1)
  const said = frame === undefined ? [whyOf(thrown)] : [whyOf(thrown), `thrown at ${frame}`]
  return { report: [], refusals: said, code: codeOf(thrown) }
}

export function unclassified(thrown: unknown, calledAs: string): Answer {
  return { report: [], refusals: [`${calledAs}: ${whyOf(thrown)}`], code: UNCLASSIFIED }
}

const STOPPED = "this stopped part way. What it had done by then is this:"

export function partWay(done: readonly string[]): readonly string[] {
  if (done.length === 0) return []
  return [`${STOPPED} ${done.join("; ")}. Nothing after that ran.`]
}

export function naming(done: readonly string[], said: Answer): Answer {
  if (said.refusals.length === 0 || done.length === 0) return said
  return { ...said, refusals: [...said.refusals, ...partWay(done)] }
}

export function keeping(done: readonly string[], said: Answer): Answer {
  if (said.refusals.length === 0 || done.length === 0) return said
  return { ...naming(done, said), report: [...done, ...said.report] }
}

export async function answering(
  work: (done: string[]) => Answer | Promise<Answer>
): Promise<Answer> {
  const done: string[] = []
  try {
    return await work(done)
  } catch (thrown) {
    const said = faulted(thrown)
    if (done.length === 0) return said
    return { report: done, refusals: [...said.refusals, ...partWay(done)], code: said.code }
  }
}

export function keyedLines(
  entries: ReadonlyArray<readonly [string, string | number | boolean | null | undefined]>
): string[] {
  const lines: string[] = []
  for (const [key, value] of entries) {
    if (value === undefined) continue
    lines.push(`${key}\t${value === null ? "" : value}`)
  }
  return lines
}

export function answeredWith(
  report: readonly string[],
  refusals: readonly string[],
  code: number
): Answer {
  return { report, refusals, code }
}

export function refused(said: string, code: number): Answer {
  return refusedBy([said], code)
}
