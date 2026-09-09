import {
  answering,
  readIn,
  refusedAll,
  shapeOf,
  shownRule,
  TSV,
} from "../../../../../../temper/temper-commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-buy-rule-show"

const SHAPE = shapeOf([TSV], { alone: [TSV], namesARule: true })

export async function temperInventoryBuyRuleShow(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => shownRule("buy", id, read.said))
}
