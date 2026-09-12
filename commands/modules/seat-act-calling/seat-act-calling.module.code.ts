import {
  codeOf,
  INPUT,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"

export type Named = { readonly name: string }

export function namedIn(word: string, act: string, rest: readonly string[]): Named | Answer {
  const name = rest[0]
  if (name === undefined) {
    return refused(`\`${word}\` names the seat to ${act}, and nothing followed it`, INPUT)
  }
  if (name.startsWith("-")) {
    return refused(`\`${word}\` names the seat to ${act} first, and \`${name}\` is a flag`, INPUT)
  }
  return { name }
}

export async function ran(running: () => Promise<void>): Promise<Answer> {
  try {
    await running()
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return refused(why, codeOf(thrown))
  }
  return told([])
}
