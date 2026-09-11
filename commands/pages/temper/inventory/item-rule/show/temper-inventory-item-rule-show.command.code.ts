import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  answering,
  readIn,
  refusedAll,
  shapeOf,
  shownRule,
  TSV,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

const SHAPE = shapeOf([TSV], { alone: [TSV], namesARule: true })

export async function temperInventoryItemRuleShow(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.calledAs, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => shownRule("item", id, read.said))
}
