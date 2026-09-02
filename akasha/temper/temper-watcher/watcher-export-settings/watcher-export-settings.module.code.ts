import { getPage } from "@akasha/pages-access/get"
import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import type { BackpackSettings } from "@akasha/temper-items-core/backpack-settings-types"
import { DEFAULT_BACKPACK_SETTINGS } from "@akasha/temper-items-core/backpack-settings-types"
import { compileRules } from "@akasha/temper-items-rules-core/inventory-rule-compiler"
import { buildAllControlledRules } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import { rulesToInventoryConfig } from "@akasha/temper-items-rules-core/inventory-rule-mapping"
import type { InventoryTimestamps } from "@akasha/temper-items-rules-core/inventory-settings-types"
import { ruleFingerprint } from "@akasha/temper-items-rules-core/rule-fingerprint"
import { serializeLuaBlock } from "@akasha/temper-saved-variables/lua-serializer"
import { asRecord } from "@akasha/utils-narrow/as-record"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"
import type { PricingTables } from "../watcher-pricing-tables/watcher-pricing-tables.module.code.ts"
import { computePricingTables } from "../watcher-pricing-tables/watcher-pricing-tables.module.code.ts"
import {
  compileBuyStock,
  compileCharacterPriority,
  compileConsumableStock,
  compileWantedConsumables,
  describeInventoryReadFailure,
  readLatestInventory,
  toRuleSettings,
} from "../watcher-settings-consumables/watcher-settings-consumables.module.code.ts"
import {
  compileWantedCompanionEquipment,
  compileWantedEquipment,
} from "../watcher-settings-equipment/watcher-settings-equipment.module.code.ts"
import {
  detectIndent,
  replaceOrInsertLuaBlock,
} from "../watcher-settings-lua-block/watcher-settings-lua-block.module.code.ts"
import {
  toLoggingSettings,
  toSafetySettings,
} from "../watcher-settings-normalize/watcher-settings-normalize.module.code.ts"
import type { SideFileValues } from "../watcher-side-file/watcher-side-file.module.code.ts"
import {
  buildSideFileContent,
  writeSideFileIfChanged,
} from "../watcher-side-file/watcher-side-file.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

const TEMPER_INVENTORY_SIBLINGS = ["db", "version"] as const

const TEMPER_PLAYER_PAGE_TYPE_SLUG = "temper-player"

const INVENTORY_TYPE = "inventory"
const AUTOMATION_TYPE = "automation"
const LOGGING_TYPE = "logging"
const SAFETY_TYPE = "safety"
const BACKPACK_TYPE = "backpack"

const ALL_SETTING_TYPES = [
  INVENTORY_TYPE,
  AUTOMATION_TYPE,
  LOGGING_TYPE,
  SAFETY_TYPE,
  BACKPACK_TYPE,
] as const

const NOTHING_TO_EXPORT = "No settings to export."

export type Say = (message: string) => undefined

export interface ExportSettingsSeams {
  readonly say: Say
  readonly readPlayerSettings: (
    userId: string,
    types: readonly string[]
  ) => Promise<Record<string, unknown>>
  readonly pricingTables: (say: Say) => Promise<PricingTables>
  readonly writeSideFile: (path: string, content: string) => string
}

function toBackpackSettings(value: unknown): BackpackSettings {
  const held = asRecord(value)
  if (!held) return { ...DEFAULT_BACKPACK_SETTINGS }
  const wanted = held.bufferSlots
  const bufferSlots =
    typeof wanted === "number" && Number.isInteger(wanted) && wanted >= 0 && wanted <= 100
      ? wanted
      : DEFAULT_BACKPACK_SETTINGS.bufferSlots
  return { bufferSlots, autoStack: held.autoStack !== false }
}

function isAutomationSettings(value: unknown): value is AutomationSettings {
  const held = asRecord(value)
  if (!held) return false
  return isRecord(held.characters) && isRecord(held.companions)
}

async function readSettings(
  userId: string,
  types: readonly string[]
): Promise<Record<string, unknown>> {
  const page = await getPage({
    pageTypeSlug: TEMPER_PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
  })
  const settings = page == null ? undefined : asRecord(page.settings)
  if (!settings) return {}
  const held: Record<string, unknown> = {}
  for (const type of types) {
    if (settings[type] !== undefined) held[type] = settings[type]
  }
  return held
}

const WATCHER_SEAMS: ExportSettingsSeams = {
  say: log,
  readPlayerSettings: readSettings,
  pricingTables: computePricingTables,
  writeSideFile: writeSideFileIfChanged,
}

type RuleSettings = ReturnType<typeof toRuleSettings>

function withControlledRules(
  base: RuleSettings,
  automationSettings: AutomationSettings | undefined
): RuleSettings {
  if (automationSettings === undefined) return base
  const { characterRules, companionRules } = buildAllControlledRules(automationSettings)
  const controlledRules = [...characterRules, ...companionRules]
  if (controlledRules.length === 0) return base
  return { ...base, rules: [...controlledRules, ...base.rules] }
}

function timestampsOf(ruleSettings: RuleSettings): InventoryTimestamps {
  const timestamps: InventoryTimestamps = {}
  for (const rule of ruleSettings.rules) {
    if (rule.categoryId == null || rule.updatedAt == null) continue
    timestamps[ruleFingerprint(rule)] = Math.floor(rule.updatedAt / 1000)
  }
  return timestamps
}

function activeBuyItemIds(ruleSettings: RuleSettings): Set<number> {
  const itemIds = new Set<number>()
  for (const rule of ruleSettings.buyRules ?? []) {
    if (rule.active === false) continue
    itemIds.add(rule.itemId)
  }
  return itemIds
}

function suspendedBuyRules(buyItemIds: ReadonlySet<number>): string {
  const named = [...buyItemIds].join(", ")
  return `${buyItemIds.size} buy rule(s) suspended for item(s) ${named}: without an inventory snapshot the addon cannot tell what is already owned, so it will decline rather than buy.`
}

type InventoryValues = Pick<SideFileValues, "sell" | "sellTimestamps" | "sellCompiled">

async function compileInventoryValues(
  userId: string,
  inventoryValue: unknown,
  automationSettings: AutomationSettings | undefined,
  say: Say
): Promise<InventoryValues> {
  const ruleSettings = withControlledRules(toRuleSettings(inventoryValue), automationSettings)

  const [wantedEquipment, wantedCompanionEquipment] = await Promise.all([
    compileWantedEquipment(userId, automationSettings),
    compileWantedCompanionEquipment(userId, automationSettings),
  ])
  if (wantedEquipment.length > 0) {
    say(`Compiled ${wantedEquipment.length} wanted equipment signature(s).`)
  }
  if (wantedCompanionEquipment.length > 0) {
    say(`Compiled ${wantedCompanionEquipment.length} wanted companion equipment signature(s).`)
  }

  const inventoryRead = await readLatestInventory(userId)
  if (!inventoryRead.ok) {
    say(`inventory stock unavailable: ${describeInventoryReadFailure(inventoryRead.failure)}.`)
  }

  const wantedConsumables = await compileWantedConsumables(userId, automationSettings)
  const consumableStock = compileConsumableStock(
    inventoryRead.ok ? inventoryRead.db : null,
    new Set(Object.keys(wantedConsumables).map(Number))
  )

  const buyItemIds = activeBuyItemIds(ruleSettings)
  const buyStock = compileBuyStock(inventoryRead, buyItemIds)

  const characterPriority = await compileCharacterPriority(userId)
  if (characterPriority.length > 0) {
    say(`Compiled ${characterPriority.length} character(s) in priority order.`)
  }

  const compiled = compileRules(
    ruleSettings,
    wantedEquipment,
    wantedCompanionEquipment,
    wantedConsumables,
    consumableStock,
    characterPriority
  )

  const sell = rulesToInventoryConfig(ruleSettings)
  const sellTimestamps = timestampsOf(ruleSettings)
  if (buyItemIds.size === 0) return { sell, sellTimestamps, sellCompiled: compiled }

  if (!buyStock.available) say(suspendedBuyRules(buyItemIds))
  return {
    sell,
    sellTimestamps,
    sellCompiled: {
      ...compiled,
      buyStockAvailable: buyStock.available,
      buyStockByChar: buyStock.buyStockByChar,
      buyStockAccount: buyStock.buyStockAccount,
    },
  }
}

export interface ExportSettingsResult {
  content: string
  modified: boolean
  inventoryConfigSideFileHash: string | null
}

export async function runExportSettings(
  content: string,
  supabase: SignedInReader,
  options: { userId?: string; dryRun?: boolean; inventoryConfigPath?: string } = {},
  seams: ExportSettingsSeams = WATCHER_SEAMS
): Promise<ExportSettingsResult> {
  const dryRun = options.dryRun ?? false
  const say = seams.say
  const userId = await userIdFor(supabase, options.userId, "export these settings")

  const settingsByType = await seams.readPlayerSettings(userId, ALL_SETTING_TYPES)
  const named = Object.keys(settingsByType)
  if (named.length === 0) {
    say(NOTHING_TO_EXPORT)
    return { content, modified: false, inventoryConfigSideFileHash: null }
  }
  say(`settings to export: ${named.join(", ")}`)

  const automationValue = settingsByType[AUTOMATION_TYPE]
  const automationSettings = isAutomationSettings(automationValue) ? automationValue : undefined

  const inventoryValue = settingsByType[INVENTORY_TYPE]
  const inventoryValues: InventoryValues =
    inventoryValue === undefined
      ? {}
      : await compileInventoryValues(userId, inventoryValue, automationSettings, say)

  const { currencyRates, crownReplacementCosts } = await seams.pricingTables(say)

  const values: Record<string, unknown> & SideFileValues = {
    ...inventoryValues,
    logging: toLoggingSettings(settingsByType[LOGGING_TYPE] ?? null),
    safety: toSafetySettings(settingsByType[SAFETY_TYPE] ?? null),
    ...(automationSettings === undefined ? {} : { automation: automationSettings }),
    backpack: toBackpackSettings(settingsByType[BACKPACK_TYPE] ?? null),
    currencyRates,
    crownReplacementCosts,
  }

  const indent = detectIndent(content.split("\n"), "sell", TEMPER_INVENTORY_SIBLINGS)
  let lines: readonly string[] = content.split("\n")
  for (const [key, value] of Object.entries(values)) {
    const block = serializeLuaBlock(key, value, indent)
    if (dryRun) {
      say(`generated lua block ${key}:`)
      for (const line of block) say(line)
    }
    lines = replaceOrInsertLuaBlock(lines, key, block, TEMPER_INVENTORY_SIBLINGS)
  }

  const modifiedContent = lines.join("\n")
  const sideFilePath = options.inventoryConfigPath
  const inventoryConfigSideFileHash =
    sideFilePath == null || dryRun
      ? null
      : seams.writeSideFile(sideFilePath, buildSideFileContent(values))

  return {
    content: modifiedContent,
    modified: modifiedContent !== content,
    inventoryConfigSideFileHash,
  }
}
