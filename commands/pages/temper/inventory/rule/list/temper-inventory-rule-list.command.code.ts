import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  answeredCall,
  categoryRow,
  JSON_FLAG,
  settingsOf,
  shapeOf,
  toldOf,
  toldRows,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { buildAllControlledRules } from "akasha/temper/items-rules-core/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const CALLED_AS = "akasha temper-inventory-rule-list"

const SHAPE = shapeOf([JSON_FLAG], { alone: [JSON_FLAG] })

const COLUMNS = [
  "pos",
  "id",
  "categoryId",
  "action",
  "active",
  "locked",
  "destination",
  "controlled",
]

async function listed(held: ReadonlyMap<string, string>): Promise<Answer> {
  const settingsAccess = await settingsOf()
  const [settings, automation] = await Promise.all([
    settingsAccess.read(),
    settingsAccess.readAutomation(),
  ])
  const derived = buildAllControlledRules(automation)
  const controlled = [...derived.characterRules, ...derived.companionRules]
  if (held.has(JSON_FLAG)) {
    const every: readonly CategoryRule[] = [...controlled, ...settings.rules]
    return toldOf(
      every.map((one, at) => ({
        ...one,
        pos: at < controlled.length ? undefined : at - controlled.length,
      }))
    )
  }
  return toldRows(
    [
      ...controlled.map((one) => ({ ...categoryRow(one), pos: undefined, controlled: true })),
      ...settings.rules.map((one, at) => ({ ...categoryRow(one), pos: at, controlled: false })),
    ],
    COLUMNS
  )
}

export async function temperInventoryRuleList(argv: readonly string[] = []): Promise<Answer> {
  return await answeredCall(argv, CALLED_AS, SHAPE, listed)
}
