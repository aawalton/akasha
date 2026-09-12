import {
  codeOf,
  INPUT,
  partWay,
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

export async function ran(running: (done: string[]) => Promise<void>): Promise<Answer> {
  const done: string[] = []
  try {
    await running(done)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    const code = codeOf(thrown)
    if (done.length === 0) return refused(why, code)
    return { report: done, refusals: [why, ...partWay(done)], code }
  }
  return told(done)
}
