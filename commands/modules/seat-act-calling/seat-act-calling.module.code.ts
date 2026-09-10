import { exitCodeForThrowable } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Answer } from "../calling/calling.module.code.ts"
import { refused } from "../calling/calling.module.code.ts"

export type Named = { readonly name: string }

export function quoted(every: readonly string[]): string {
  return every.map((one) => `\`${one}\``).join(", ")
}

export function namedIn(word: string, act: string, rest: readonly string[]): Named | Answer {
  const name = rest[0]
  if (name === undefined) {
    return refused(`\`${word}\` names the seat to ${act}, and nothing followed it`, 1)
  }
  if (name.startsWith("-")) {
    return refused(`\`${word}\` names the seat to ${act} first, and \`${name}\` is a flag`, 1)
  }
  return { name }
}

export async function ran(running: () => Promise<void>): Promise<Answer> {
  try {
    await running()
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return refused(why, exitCodeForThrowable(thrown))
  }
  return { report: [], refusals: [], code: 0 }
}
