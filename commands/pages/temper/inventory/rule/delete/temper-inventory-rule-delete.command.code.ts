import {
  answering,
  droppedRule,
  FORCE,
  readIn,
  refusedAll,
  shapeOf,
} from "../../../../../../temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-rule-delete"

const SHAPE = shapeOf([FORCE], { alone: [FORCE], namesARule: true })

export async function temperInventoryRuleDelete(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => droppedRule("category", id, read.said.has(FORCE)))
}
