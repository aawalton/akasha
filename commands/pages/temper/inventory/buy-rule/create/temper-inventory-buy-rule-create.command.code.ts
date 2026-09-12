import type { TakenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { active } from "akasha/commands/arguments/pages/active.argument.ts"
import { goal } from "akasha/commands/arguments/pages/goal.argument.ts"
import { itemId } from "akasha/commands/arguments/pages/item-id.argument.ts"
import { itemName } from "akasha/commands/arguments/pages/item-name.argument.ts"
import { notes } from "akasha/commands/arguments/pages/notes.argument.ts"
import { source as sourceArgument } from "akasha/commands/arguments/pages/source.argument.ts"
import { targetQuantity } from "akasha/commands/arguments/pages/target-quantity.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import {
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleCreate as page } from "akasha/commands/pages/temper/inventory/buy-rule/create/temper-inventory-buy-rule-create.command.ts"
import { BUY_SOURCE_VALUES } from "akasha/temper/commands/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import {
  settingsOf,
  type Writing,
  webOf,
  wroteSaid,
} from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import type {
  BuyRule,
  BuySource,
} from "akasha/temper/items-rules-core/buy-rule-types/buy-rule-types.module.code.ts"
import {
  addBuyRule,
  bulkUpdateBuyRules,
} from "akasha/temper/items-rules-core/modules/buy-rule-settings/buy-rule-settings.module.code.ts"

const MERCHANT = "merchant"

const SPACES = 2

const PAGES = [title, notes, goal, active, itemId, itemName, targetQuantity, sourceArgument]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export async function making(taken: Taken, writing: Writing, done: string[]): Promise<Answer> {
  const said = taken.source ?? MERCHANT
  const source: BuySource | undefined = BUY_SOURCE_VALUES.find((one) => one === said)
  if (source === undefined) {
    return refused(
      `\`${sourceArgument.said}\` names \`${said}\`, which is no source a buy rule buys at`,
      INPUT
    )
  }
  const settings = await writing.read()
  const added = addBuyRule(settings, {
    itemId: taken.itemId,
    itemName: taken.itemName,
    targetQuantity: taken.targetQuantity,
    source,
  })
  const created = (added.buyRules ?? [])[0]
  if (created === undefined) {
    return refused("a buy rule was added and none is at the front of the list", DATA)
  }
  const patch: Partial<Pick<BuyRule, "active" | "goal" | "title" | "notes">> = webOf(taken)
  const next =
    Object.keys(patch).length > 0 ? bulkUpdateBuyRules(added, [created.id], patch) : added
  await writing.write(next)
  done.push(wroteSaid("buy", created.id, "added"))
  const after = (next.buyRules ?? []).find((one) => one.id === created.id) ?? created
  const answer = told(JSON.stringify(after, null, SPACES).split("\n"))
  if (after.active === true) return answer
  return told([
    ...answer.report,
    `this buy rule is inactive — say \`akasha temper inventory buy-rule update ${created.id} ${active.said} true\` to start it`,
  ])
}

async function made(taken: Taken, done: string[]): Promise<Answer> {
  return await making(taken, await settingsOf(), done)
}

export async function temperInventoryBuyRuleCreate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, made)
}
