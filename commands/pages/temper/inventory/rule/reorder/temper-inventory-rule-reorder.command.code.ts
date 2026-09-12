import type { TakenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { after } from "akasha/commands/arguments/pages/after.argument.ts"
import { before } from "akasha/commands/arguments/pages/before.argument.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { toPosition } from "akasha/commands/arguments/pages/to-position.argument.ts"
import {
  DATA,
  INPUT,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryRuleReorder as page } from "akasha/commands/pages/temper/inventory/rule/reorder/temper-inventory-rule-reorder.command.ts"
import { emitJson } from "akasha/temper/commands/format-output/format-output.module.code.ts"
import {
  answeredByPage,
  lockedOff,
  refusing,
  settingsOf,
  unfound,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  reorderCategoryRule,
  resolveAnchorIndex,
} from "akasha/temper/items-rules-core/inventory-rule-settings/inventory-rule-settings.module.code.ts"

const PAGES = [force, categoryRuleId, toPosition, before, after]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

async function moved(taken: Taken): Promise<Answer> {
  const id = taken.categoryRuleId
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const rule = settings.rules.find((one) => one.id === id)
  if (rule === undefined) return unfound("category", id)
  if (rule.locked === true && !taken.force) return lockedOff("category", id)

  const to = taken.toPosition
  let toIndex: number
  if (to !== undefined) {
    if (to > settings.rules.length) {
      return refusing(
        `\`${toPosition.said}\` names the index ${to} and the written rules run to ${settings.rules.length}`,
        INPUT
      )
    }
    toIndex = to
  } else {
    const anchor = taken.before
    const flag = anchor !== undefined ? before.said : after.said
    const anchorId = anchor ?? taken.after ?? ""
    if (anchorId === id) {
      return refusing(
        `\`${flag}\` names the rule being moved, and a rule anchors to another`,
        INPUT
      )
    }
    const found = resolveAnchorIndex(
      settings,
      id,
      anchorId,
      anchor !== undefined ? "before" : "after"
    )
    if (found === undefined) {
      return refusing(
        `\`${flag}\` names \`${anchorId}\`, which is no written category rule — a controlled rule is derived rather than written and anchors nothing`,
        DATA
      )
    }
    toIndex = found
  }
  await settingsAccess.write(reorderCategoryRule(settings, id, toIndex))
  return told(emitJson({ id, toIndex }).split("\n"))
}

export async function temperInventoryRuleReorder(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, moved)
}
