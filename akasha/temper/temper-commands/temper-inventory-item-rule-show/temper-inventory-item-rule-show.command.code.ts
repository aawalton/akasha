import type { Answer } from "@akasha/command-system/calling"
import {
  answering,
  readIn,
  refusedAll,
  shapeOf,
  shownRule,
  TSV,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-item-rule-show"

const SHAPE = shapeOf([TSV], { alone: [TSV], namesARule: true })

export async function temperInventoryItemRuleShow(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => shownRule("item", id, read.said))
}
