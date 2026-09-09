import type { Answer } from "../../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../../command-system/fault-saying/fault-saying.module.code.ts"

export const OK = 0

export const INPUT = 1

export const DATA = 2

export const OPERATIONAL = 3

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
  return { report: [], refusals: [whyOf(thrown)], code: codeOf(thrown) }
}

export async function answering(work: () => Answer | Promise<Answer>): Promise<Answer> {
  try {
    return await work()
  } catch (thrown) {
    return faulted(thrown)
  }
}

export function flagsAloneIn(said: Loose): readonly string[] {
  return said.loose.map((one) => `\`${one}\` follows nothing this takes — it takes flags alone`)
}
