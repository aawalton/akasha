import {
  answering,
  copiedRule,
  readIn,
  refusedAll,
  shapeOf,
} from "../../../../../../temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-item-rule-duplicate"

const SHAPE = shapeOf([], { namesARule: true })

export async function temperInventoryItemRuleDuplicate(
  argv: readonly string[] = []
): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => copiedRule("item", id))
}
