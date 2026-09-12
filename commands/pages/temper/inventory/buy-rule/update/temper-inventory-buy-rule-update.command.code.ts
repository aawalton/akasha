import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  ACTIVE,
  answeredCall,
  FORCE,
  GOAL,
  lockedOff,
  NOTES,
  named,
  refusing,
  settingsOf,
  shapeOf,
  TITLE,
  toldOf,
  unfound,
  webIn,
  wholeOf,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { BUY_SOURCE_VALUES } from "akasha/temper/commands/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { bulkUpdateBuyRules } from "akasha/temper/items-rules-core/buy-rule-settings/buy-rule-settings.module.code.ts"
import type {
  BuyRule,
  BuySource,
} from "akasha/temper/items-rules-core/buy-rule-types/buy-rule-types.module.code.ts"

const TARGET = "--target"

const SOURCE = "--source"

const CHANGES = [TARGET, SOURCE, TITLE, NOTES, GOAL, ACTIVE]

const SHAPE = shapeOf([...CHANGES, FORCE], {
  alone: [FORCE],
  whole: [TARGET],
  yesNo: [ACTIVE],
  namesARule: true,
})

async function changed(
  id: string,
  held: ReadonlyMap<string, string>,
  calledAs: string
): Promise<Answer> {
  const said = held.get(SOURCE)
  let source: BuySource | undefined
  if (said !== undefined) {
    source = BUY_SOURCE_VALUES.find((one) => one === said)
    if (source === undefined) {
      return refusing(
        `\`${SOURCE}\` names \`${said}\`, which is no source a buy rule buys at`,
        INPUT
      )
    }
  }
  const targetQuantity = wholeOf(held, TARGET)
  const patch: Partial<
    Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
  > = {
    ...(targetQuantity !== undefined ? { targetQuantity } : {}),
    ...(source !== undefined ? { source } : {}),
    ...webIn(held),
  }
  if (Object.keys(patch).length === 0) {
    return refusing(
      `\`${calledAs}\` names no field to change — it changes ${named(CHANGES)}`,
      INPUT
    )
  }
  const force = held.has(FORCE)
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const rule = (settings.buyRules ?? []).find((one) => one.id === id)
  if (rule === undefined) return unfound("buy", id)
  if (rule.locked === true && !force) return lockedOff("buy", id)
  const next = bulkUpdateBuyRules(settings, [id], patch, { force })
  await settingsAccess.write(next)
  return toldOf((next.buyRules ?? []).find((one) => one.id === id) ?? rule)
}

export async function temperInventoryBuyRuleUpdate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredCall(argv, given.calledAs, SHAPE, (held, id) =>
    changed(id, held, given.calledAs)
  )
}
