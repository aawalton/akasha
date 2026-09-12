import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  droppedRule,
  FORCE,
  readIn,
  refusedAll,
  shapeOf,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

const SHAPE = shapeOf([FORCE], { alone: [FORCE], namesARule: true })

export async function temperInventoryItemRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.calledAs, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => droppedRule("item", id, read.said.has(FORCE)))
}
