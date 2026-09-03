import type { Answer } from "@akasha/command-system/calling"
import { bulkUpdateCategoryRules } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import {
  ACTIVE,
  answering,
  FORCE,
  GOAL,
  INPUT,
  lockedOff,
  NOTES,
  named,
  readIn,
  refusedAll,
  refusing,
  settingsOf,
  shapeOf,
  TITLE,
  toldOf,
  unfound,
  webIn,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  narrowItemAction,
  narrowMoveToDestination,
  narrowStockScope,
  parseConditionsJson,
  parseDestinationChainJson,
} from "../inventory-rule-flags/inventory-rule-flags.module.code.ts"

const CALLED_AS = "akasha temper-inventory-rule-update"

const CATEGORY = "--category"

const ACTION = "--action"

const DESTINATION = "--destination"

const CHAIN = "--destination-chain"

const CONDITIONS = "--conditions"

const STOCK_SCOPE = "--stock-scope"

const CHANGES = [
  CATEGORY,
  ACTION,
  DESTINATION,
  CHAIN,
  CONDITIONS,
  TITLE,
  NOTES,
  GOAL,
  ACTIVE,
  STOCK_SCOPE,
]

const SHAPE = shapeOf([...CHANGES, FORCE], { alone: [FORCE], yesNo: [ACTIVE], namesARule: true })

async function changed(id: string, held: ReadonlyMap<string, string>): Promise<Answer> {
  const action = held.get(ACTION)
  const destination = held.get(DESTINATION)
  const scope = held.get(STOCK_SCOPE)
  const goal = held.get(GOAL)
  const categoryId = held.get(CATEGORY)
  const chain = parseDestinationChainJson(held.get(CHAIN))
  const conditions = parseConditionsJson(held.get(CONDITIONS))
  const clears = chain !== undefined && destination === undefined
  const patch = {
    ...(categoryId !== undefined ? { categoryId } : {}),
    ...(action !== undefined ? { action: narrowItemAction(action, ACTION) } : {}),
    ...(destination !== undefined
      ? { destination: narrowMoveToDestination(destination, DESTINATION) }
      : {}),
    ...(clears ? { destination: undefined } : {}),
    ...(chain !== undefined ? { destinationChain: chain } : {}),
    ...(conditions !== undefined ? { conditions } : {}),
    ...(scope !== undefined ? { stockScope: narrowStockScope(scope, STOCK_SCOPE) } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...webIn(held),
  }
  if (Object.keys(patch).length === 0) {
    return refusing(
      `\`${CALLED_AS}\` names no field to change — it changes ${named(CHANGES)}`,
      INPUT
    )
  }
  const force = held.has(FORCE)
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const standing = settings.rules.find((one) => one.id === id)
  if (standing === undefined) return unfound("category", id)
  if (standing.locked === true && !force) return lockedOff("category", id)
  const next = bulkUpdateCategoryRules(settings, [id], patch, { force })
  await settingsAccess.write(next)
  return toldOf(next.rules.find((one) => one.id === id) ?? standing)
}

export async function temperInventoryRuleUpdate(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => changed(id, read.said))
}
