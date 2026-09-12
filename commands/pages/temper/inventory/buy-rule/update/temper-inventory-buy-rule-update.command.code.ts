import type { TakenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { active } from "akasha/commands/arguments/pages/active.argument.ts"
import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { goal } from "akasha/commands/arguments/pages/goal.argument.ts"
import { notes } from "akasha/commands/arguments/pages/notes.argument.ts"
import { source as sourceArgument } from "akasha/commands/arguments/pages/source.argument.ts"
import { targetQuantity as targetArgument } from "akasha/commands/arguments/pages/target-quantity.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import {
  INPUT,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryBuyRuleUpdate as page } from "akasha/commands/pages/temper/inventory/buy-rule/update/temper-inventory-buy-rule-update.command.ts"
import { emitJson } from "akasha/temper/commands/format-output/format-output.module.code.ts"
import {
  answeredByPage,
  lockedOff,
  named,
  settingsOf,
  unfound,
  type Writing,
  webOf,
  wroteSaid,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { BUY_SOURCE_VALUES } from "akasha/temper/commands/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { bulkUpdateBuyRules } from "akasha/temper/items-rules-core/buy-rule-settings/buy-rule-settings.module.code.ts"
import type {
  BuyRule,
  BuySource,
} from "akasha/temper/items-rules-core/buy-rule-types/buy-rule-types.module.code.ts"

const CHANGED = [targetArgument, sourceArgument, title, notes, goal, active]

const PAGES = [...CHANGED, force, buyRuleId]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export async function changing(
  taken: Taken,
  calledAs: string,
  writing: Writing,
  done: string[]
): Promise<Answer> {
  const said = taken.source
  let source: BuySource | undefined
  if (said !== undefined) {
    source = BUY_SOURCE_VALUES.find((one) => one === said)
    if (source === undefined) {
      return refused(
        `\`${sourceArgument.said}\` names \`${said}\`, which is no source a buy rule buys at`,
        INPUT
      )
    }
  }
  const patch: Partial<
    Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
  > = {
    ...(taken.targetQuantity !== undefined ? { targetQuantity: taken.targetQuantity } : {}),
    ...(source !== undefined ? { source } : {}),
    ...webOf(taken),
  }
  if (Object.keys(patch).length === 0) {
    const every = named(CHANGED.map((one) => one.said))
    return refused(`\`${calledAs}\` names no field to change — it changes ${every}`, INPUT)
  }
  const id = taken.buyRuleId
  const settings = await writing.read()
  const rule = (settings.buyRules ?? []).find((one) => one.id === id)
  if (rule === undefined) return unfound("buy", id)
  if (rule.locked === true && !taken.force) return lockedOff("buy", id)
  const next = bulkUpdateBuyRules(settings, [id], patch, { force: taken.force })
  await writing.write(next)
  done.push(wroteSaid("buy", id, "changed"))
  return told(emitJson((next.buyRules ?? []).find((one) => one.id === id) ?? rule).split("\n"))
}

async function changed(taken: Taken, calledAs: string, done: string[]): Promise<Answer> {
  return await changing(taken, calledAs, await settingsOf(), done)
}

export async function temperInventoryBuyRuleUpdate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, (taken, done) =>
    changed(taken, given.calledAs, done)
  )
}
