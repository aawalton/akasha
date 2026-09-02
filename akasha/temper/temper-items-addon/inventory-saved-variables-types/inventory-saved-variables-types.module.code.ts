import type {
  CharacterCurrencies as CoreCharacterCurrencies,
  CurrencyBalances as CoreCurrencyBalances,
  InventoryCurrencies as CoreInventoryCurrencies,
  PlacedFurnishingData as CorePlacedFurnishingData,
  InventoryItemData,
  PriceSource,
} from "@akasha/temper-items-core/inventory-types"
import type { CompiledRuleConfig } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { BankProfile } from "../inventory-bank-profile-types/inventory-bank-profile-types.module.code.ts"
import type { BankTrace } from "../inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import type { ItemRuleVerdictMutation } from "../inventory-item-rule-verdict-core/inventory-item-rule-verdict-core.module.code.ts"
import {
  RULES_CONFIG_DEFAULTS,
  type RulesConfig,
  type RulesTimestamps,
} from "../inventory-rules-types/inventory-rules-types.module.code.ts"
import type { SkillGateEval } from "../inventory-skill-gate-eval-types/inventory-skill-gate-eval-types.module.code.ts"
import type { MasterConsumableTrace } from "../inventory-writ-master-consumable-trace-types/inventory-writ-master-consumable-trace-types.module.code.ts"
import type { MasterCraftTrace } from "../inventory-writ-master-craft-trace-types/inventory-writ-master-craft-trace-types.module.code.ts"
import type { MasterWritProbe } from "../inventory-writ-master-probe-types/inventory-writ-master-probe-types.module.code.ts"
export type ItemData = InventoryItemData

export type PlacedFurnishingData = CorePlacedFurnishingData

export interface LocationData {
  bags: Record<number, Record<number, ItemData>>
  bagSizes: Record<number, number>
  displayName: string
  lastScanned: number
  placedFurnishings?: Record<string, PlacedFurnishingData>
}

export type CurrencyBalances = CoreCurrencyBalances

export type CharacterCurrencies = CoreCharacterCurrencies

export type InventoryCurrencies = CoreInventoryCurrencies

export interface InventoryDatabase {
  locations: Record<string, LocationData>
  meta: {
    displayName: string
    worldName: string
    lastFullScan: number
    priceSource?: PriceSource
  }
  currencies?: InventoryCurrencies
}

export interface QuestAnnotation {
  questType: "delve" | "group-boss" | "world-event"
  questId: number
}

export interface ExplainTrace {
  schemaVersion: number
  timestamp: number
  itemLink: string
  itemId: number
  itemName: string
  itemNameRaw: string
  inventory: { found: boolean; bagId?: number; slotIndex?: number }
  signals: {
    itemType: number
    specializedItemType?: number
    filterType: number
    traitType: number
    equipType: number
    armorType: number
    weaponType: number
    quality: number
  }
  classification: {
    leafCategoryId: string
    ancestorChain: string[]
    categoryPath: string
  }
  motifLookup?: {
    rawName: string
    cleanName: string
    lookupHit: boolean
    coords?: { styleId: number; chapterId: number | null }
  }
  itemKey: {
    kind: "recipe" | "motif" | "script" | "consumable" | "collectible" | "fragment" | "none"
    detail: Record<string, number | string | boolean>
  }
  unlockWalk?: {
    currentCharId: string
    priority: {
      charId: string
      knows: boolean | "no-data-treated-as-knows"
      chosen: boolean
    }[]
    chosen?: string
  }
  itemRulesMatch?: { itemId: number; action: string; destination?: string }
  orderedWalk: {
    rulesConsidered: number
    rulesEvaluated: number
    matched?: {
      index: number
      categoryId: string
      action: string
      destination: string
      conditions: string
    }
    rejections: {
      index: number
      categoryId: string
      action: string
      reason: "category-miss" | "conditions-fail" | "destination-resolve-fail" | "container-skip"
      detail?: string
    }[]
  }
  outcome: { action: string; destination: string; summary: string }
  notes: string[]
}

export interface BuyExplainStoreScan {
  storeOpen: boolean
  numEntries: number
  matchedEntryIndex?: number
  matchPrice?: number
  matchMeetsRequirements?: boolean
  matchMaxBuyable?: number
  computedQuantity?: number
}

export interface BuyExplainRule {
  itemId: number
  hasRule: boolean
  targetQuantity?: number
  liveCurrentCharBackpack: number
  accountStock: number
  byCharSum: number
  globalTotal: number
  shortfall: number
  storeScan: BuyExplainStoreScan
}

export interface BuyExplainTrace {
  schemaVersion: number
  timestamp: number
  currentCharId: string
  playerMoney: number
  stockAvailable: boolean
  rules: BuyExplainRule[]
}

export interface DiagnosticsData {
  lastExplain?: ExplainTrace
  lastBuyExplain?: BuyExplainTrace
  lastBankTrace?: BankTrace
  lastBankProfile?: BankProfile
  lastGateEval?: SkillGateEval
  lastMasterWritProbe?: MasterWritProbe
  masterCraftTraces?: MasterCraftTrace[]
  masterConsumableTraces?: MasterConsumableTrace[]
}

export interface SavedVariablesData {
  db: InventoryDatabase
  sell: RulesConfig
  sellTimestamps: RulesTimestamps
  sellCompiled?: CompiledRuleConfig
  craftingLevels?: Record<string, Record<number, number>>
  logging?: {
    actionReports: "none" | "minimal" | "verbose"
    perfTracing?: "none" | "minimal"
  }
  safety?: {
    confirmActions: string[]
    openCooldownProtection?: boolean
  }
  automation?: {
    global?: {
      characters?: {
        equipment?: boolean
        food?: boolean
        potions?: boolean
        recharge?: boolean
        repair?: boolean
        soulGems?: boolean
        repairKits?: boolean
        lockpicks?: boolean
        dailyWrits?: boolean
        dailyWritBlacksmithing?: boolean
        dailyWritClothier?: boolean
        dailyWritWoodworking?: boolean
        dailyWritJewelrycrafting?: boolean
        dailyWritEnchanting?: boolean
        dailyWritAlchemy?: boolean
        dailyWritProvisioning?: boolean
        dailyWritAutoCraft?: boolean
        masterWrits?: boolean
        masterWritBlacksmithing?: boolean
        masterWritClothier?: boolean
        masterWritWoodworking?: boolean
        masterWritJewelrycrafting?: boolean
        masterWritEnchanting?: boolean
        masterWritAlchemy?: boolean
        masterWritProvisioning?: boolean
      }
      companions?: { equipment?: boolean; skills?: boolean }
    }
    characters: Record<
      string,
      {
        equipment?: boolean
        food?: boolean
        potions?: boolean
        recharge?: boolean
        repair?: boolean
        soulGems?: boolean
        repairKits?: boolean
        lockpicks?: boolean
        dailyWrits?: boolean
        dailyWritBlacksmithing?: boolean
        dailyWritClothier?: boolean
        dailyWritWoodworking?: boolean
        dailyWritJewelrycrafting?: boolean
        dailyWritEnchanting?: boolean
        dailyWritAlchemy?: boolean
        dailyWritProvisioning?: boolean
        dailyWritAutoCraft?: boolean
        masterWrits?: boolean
        masterWritBlacksmithing?: boolean
        masterWritClothier?: boolean
        masterWritWoodworking?: boolean
        masterWritJewelrycrafting?: boolean
        masterWritEnchanting?: boolean
        masterWritAlchemy?: boolean
        masterWritProvisioning?: boolean
      }
    >
    companions: Record<string, { equipment?: boolean; skills?: boolean }>
  }
  backpack?: { bufferSlots: number; autoStack: boolean }
  inventoryActionPanel?: { left: number; top: number }
  bankActionPanel?: { left: number; top: number }
  inventoryFilterPanel?: { left: number; top: number }
  inventoryBrowser?: { position?: { left: number; top: number } }
  diagnostics?: DiagnosticsData
  openCooldowns?: Record<string, number>
  transmuteCrystalCap?: number
  transmuteCrystalAmount?: number
  questAnnotations?: Record<string, QuestAnnotation>
  temperLocks?: Record<string, true>
  pendingSettingsMutations?: ItemRuleVerdictMutation[]
  perf?: { loadTimeMs: number }
  session: { startTime: number; startNetWorth: number; startCharId: string }
}

export interface InventoryConfigGlobal {
  readonly version: number
  readonly sell?: SavedVariablesData["sell"]
  readonly sellTimestamps?: SavedVariablesData["sellTimestamps"]
  readonly sellCompiled?: SavedVariablesData["sellCompiled"]
  readonly logging?: SavedVariablesData["logging"]
  readonly safety?: SavedVariablesData["safety"]
  readonly automation?: SavedVariablesData["automation"]
  readonly backpack?: SavedVariablesData["backpack"]
  readonly currencyRates?: Record<string, number>
  readonly crownReplacementCosts?: Record<number, number>
}

export const SAVED_VARIABLES_DEFAULTS: SavedVariablesData = {
  db: {
    locations: {},
    meta: {
      displayName: "",
      worldName: "",
      lastFullScan: 0,
    },
    currencies: {
      characters: {},
    },
  },
  sell: RULES_CONFIG_DEFAULTS,
  sellTimestamps: {},
  session: { startTime: 0, startNetWorth: 0, startCharId: "" },
}
