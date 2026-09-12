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

export type Loose = {
  readonly loose: readonly string[]
}

export function refusedBy(said: readonly string[], code = INPUT): Answer {
  return { report: [], refusals: said, code }
}

export function told(report: readonly string[]): Answer {
  return { report, refusals: [], code: OK }
}

export function asJson(value: unknown): Answer {
  return told([JSON.stringify(value)])
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

export async function answering(
  work: (done: string[]) => Answer | Promise<Answer>
): Promise<Answer> {
  const done: string[] = []
  try {
    return await work(done)
  } catch (thrown) {
    const said = faulted(thrown)
    if (done.length === 0) return said
    return {
      report: done,
      refusals: [...said.refusals, `${STOPPED} ${done.join("; ")}. Nothing after that ran.`],
      code: said.code,
    }
  }
}

export function flagsAloneIn(said: Loose): readonly string[] {
  return said.loose.map((one) => `\`${one}\` follows nothing this takes — it takes flags alone`)
}
