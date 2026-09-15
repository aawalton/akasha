import type { TakenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { after } from "akasha/command/arguments/pages/after.argument.ts"
import { before } from "akasha/command/arguments/pages/before.argument.ts"
import { categoryRuleId } from "akasha/command/arguments/pages/category-rule-id.argument.ts"
import { force } from "akasha/command/arguments/pages/force.argument.ts"
import { toPosition } from "akasha/command/arguments/pages/to-position.argument.ts"
import {
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleReorder as page } from "akasha/command/pages/temper/inventory/rule/reorder/temper-inventory-rule-reorder.command.ts"
import { emitJson } from "akasha/temper/command/modules/format-output/format-output.module.code.ts"
import {
  lockedOff,
  settingsOf,
  unfound,
  type Writing,
  wroteSaid,
} from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  reorderCategoryRule,
  resolveAnchorIndex,
} from "akasha/temper/items-rules-core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"

const PAGES = [force, categoryRuleId, toPosition, before, after]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export async function moving(taken: Taken, writing: Writing, done: string[]): Promise<Answer> {
  const id = taken.categoryRuleId
  const settings = await writing.read()
  const rule = settings.rules.find((one) => one.id === id)
  if (rule === undefined) return unfound("category", id)
  if (rule.locked === true && !taken.force) return lockedOff("category", id)

  const to = taken.toPosition
  let toIndex: number
  if (to !== undefined) {
    if (to > settings.rules.length) {
      return refused(
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
      return refused(`\`${flag}\` names the rule being moved, and a rule anchors to another`, INPUT)
    }
    const found = resolveAnchorIndex(
      settings,
      id,
      anchorId,
      anchor !== undefined ? "before" : "after"
    )
    if (found === undefined) {
      return refused(
        `\`${flag}\` names \`${anchorId}\`, which is no written category rule — a controlled rule is derived rather than written and anchors nothing`,
        DATA
      )
    }
    toIndex = found
  }
  await writing.write(reorderCategoryRule(settings, id, toIndex))
  done.push(wroteSaid("category", id, `moved to ${toIndex}`))
  return told(emitJson({ id, toIndex }).split("\n"))
}

async function moved(taken: Taken, done: string[]): Promise<Answer> {
  return await moving(taken, await settingsOf(), done)
}

export async function temperInventoryRuleReorder(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, moved)
}
