import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryRuleList as page } from "akasha/commands/pages/temper/inventory/rule/list/temper-inventory-rule-list.command.ts"
import {
  answeredByPage,
  categoryRow,
  settingsOf,
  toldOf,
  toldRows,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { buildAllControlledRules } from "akasha/temper/items-rules-core/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

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

async function withControlled(asJson: boolean): Promise<Answer> {
  const settingsAccess = await settingsOf()
  const [settings, automation] = await Promise.all([
    settingsAccess.read(),
    settingsAccess.readAutomation(),
  ])
  const derived = buildAllControlledRules(automation)
  const controlled = [...derived.characterRules, ...derived.companionRules]
  if (asJson) {
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

export async function temperInventoryRuleList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [json], (taken) =>
    withControlled(taken.json)
  )
}
