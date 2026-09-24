import { json } from "akasha/command/argument/pages/json.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleList as page } from "akasha/command/pages/temper/inventory/rule/list/temper-inventory-rule-list.command.ts"
import { emitJson } from "akasha/temper/command/modules/format-output/format-output.module.code.ts"
import {
  categoryRow,
  settingsOf,
  toldRows,
} from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { buildAllControlledRules } from "akasha/temper/items/rules/core/modules/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const COLUMNS = [
  "pos",
  "id",
  "title",
  "categoryId",
  "action",
  "active",
  "locked",
  "destination",
  "craftShortfall",
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
    const said = every.map((one, at) => ({
      ...one,
      pos: at < controlled.length ? undefined : at - controlled.length,
    }))
    return told(emitJson(said).split("\n"))
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
