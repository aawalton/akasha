import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

const MAX_NUMBER_OF_DAYS_CVAR_SUFFIX: Record<number, string> = {
  [GUILD_HISTORY_EVENT_CATEGORY_ACTIVITY]: "activity",
  [GUILD_HISTORY_EVENT_CATEGORY_AVA_ACTIVITY]: "ava_activity",
  [GUILD_HISTORY_EVENT_CATEGORY_BANKED_CURRENCY]: "banked_currency",
  [GUILD_HISTORY_EVENT_CATEGORY_BANKED_ITEM]: "banked_item",
  [GUILD_HISTORY_EVENT_CATEGORY_MILESTONE]: "milestone",
  [GUILD_HISTORY_EVENT_CATEGORY_ROSTER]: "roster",
  [GUILD_HISTORY_EVENT_CATEGORY_TRADER]: "trader",
}
const SECONDS_PER_DAY = 60 * 60 * 24
const DEFAULT_MAX_CACHE_DAYS = 30
const MAX_SERVER_DAYS_FOR_CATEGORY: Record<number, number> = {}
for (
  let eventCategory = GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN;
  eventCategory <= GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END;
  eventCategory = eventCategory + 1
) {
  MAX_SERVER_DAYS_FOR_CATEGORY[eventCategory] = DEFAULT_MAX_CACHE_DAYS
}
MAX_SERVER_DAYS_FOR_CATEGORY[GUILD_HISTORY_EVENT_CATEGORY_MILESTONE] = 180
MAX_SERVER_DAYS_FOR_CATEGORY[GUILD_HISTORY_EVENT_CATEGORY_ROSTER] = 180

interface CacheRef {
  GetCategoryCache: (this: CacheRef, guildId: number, category: number) => unknown
}

interface CategoryTreeNode {
  children?: CategoryTreeNode[]
  selectionFunction?: unknown
  [key: string]: unknown
}

interface HistoryRef {
  guildId: number
  selectedEventCategory: number
  categoryTree: { rootNode: CategoryTreeNode }
  SwapToGuildIndexWithoutAutoRequest: (this: HistoryRef, guildIndex: number) => void
  SelectNodeForEventCategory: (
    this: HistoryRef,
    category: number,
    index: number,
    reselect: boolean
  ) => void
}

interface CacheSaveData {
  lastListenerRegisteredTime?: number
  lastProcessorRegisteredTime?: number
  newestLinkedEventId?: number
  newestManagedEventId?: number
  newestLinkedEventTime?: number
  newestManagedEventTime?: number
  oldestLinkedEventId?: number
  oldestManagedEventId?: number
  oldestLinkedEventTime?: number
  oldestManagedEventTime?: number
  [key: string]: unknown
}

type SaveDataTable = Record<string, CacheSaveData | undefined>

interface AdapterSettings {
  markGapsInHistory: boolean
  [key: string]: unknown
}

export interface GuildHistoryAdapterInstance {
  machineWideSaveData: SaveDataTable
  accountSaveData: SaveDataTable
  settings: AdapterSettings
  activeKeys: Record<string, boolean>
  history?: HistoryRef
  cache?: CacheRef
  selectedCategoryCache?: unknown

  Initialize: (
    this: GuildHistoryAdapterInstance,
    saveData: SaveDataTable,
    settings: AdapterSettings
  ) => void
  InitializeGapRows: (this: GuildHistoryAdapterInstance) => void
  GetOrCreateCacheSaveData: (this: GuildHistoryAdapterInstance, key: string) => CacheSaveData
  DeleteInactiveCacheSaveData: (this: GuildHistoryAdapterInstance) => void
  InitializeDeferred: (
    this: GuildHistoryAdapterInstance,
    history: HistoryRef,
    cache: CacheRef
  ) => void
  SelectGuildByIndex: (this: GuildHistoryAdapterInstance, guildIndex: number) => void
  SelectCategory: (this: GuildHistoryAdapterInstance, category: number) => void
  GetSelectedCategoryCache: (this: GuildHistoryAdapterInstance) => unknown
  GetGuildHistoryEventIndicesForTimeRange: (
    this: GuildHistoryAdapterInstance,
    guildId: number,
    category: number,
    newestTime: number,
    oldestTime: number
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetGuildHistoryCacheMaxDays: (this: GuildHistoryAdapterInstance, category: number) => number
  SetGuildHistoryCacheMaxDays: (
    this: GuildHistoryAdapterInstance,
    category: number,
    days: number
  ) => void
  GetGuildHistoryCacheMaxTime: (this: GuildHistoryAdapterInstance, category: number) => number
  GetGuildHistoryServerMaxDays: (this: GuildHistoryAdapterInstance, category: number) => number
  GetGuildHistoryServerMaxTime: (this: GuildHistoryAdapterInstance, category: number) => number
  IsAutoDeleteLeftGuildsEnabled: (this: GuildHistoryAdapterInstance) => boolean
  SetAutoDeleteLeftGuildsEnabled: (this: GuildHistoryAdapterInstance, enabled: boolean) => void
  IsGuildHistoryLoggingEnabled: (this: GuildHistoryAdapterInstance) => boolean
  SetGuildHistoryLoggingEnabled: (this: GuildHistoryAdapterInstance, enabled: boolean) => void
  IsMarkGapsFeatureEnabled: (this: GuildHistoryAdapterInstance) => boolean
  SetMarkGapsFeatureEnabled: (this: GuildHistoryAdapterInstance, enabled: boolean) => void
}

export interface GuildHistoryAdapterClass extends GuildHistoryAdapterInstance {
  New: (
    this: GuildHistoryAdapterClass,
    saveData: SaveDataTable,
    settings: AdapterSettings
  ) => GuildHistoryAdapterInstance
}

export const GuildHistoryAdapter = ZO_InitializingObject.Subclass<GuildHistoryAdapterClass>()
internal.class.GuildHistoryAdapter = GuildHistoryAdapter

GuildHistoryAdapter.Initialize = function (this, saveData, settings) {
  this.machineWideSaveData = saveData
  this.accountSaveData = asSaveDataTable(saveData[GetDisplayName()])
  this.settings = settings
  this.activeKeys = {}

  if (settings.markGapsInHistory) {
    this.InitializeGapRows()
  }
}

function asHistoryRef(value: unknown): HistoryRef {
  return value as HistoryRef
}
function asSaveDataTable(value: unknown): SaveDataTable {
  return value as SaveDataTable
}

GuildHistoryAdapter.GetOrCreateCacheSaveData = function (this, key) {
  if (this.machineWideSaveData[key] != null) {
    logger.Info("Migrating machine wide save data for", key, "to account wide save data")
    this.accountSaveData[key] = this.machineWideSaveData[key]
    this.machineWideSaveData[key] = undefined
  }
  const emptySaveData: CacheSaveData = {}
  const saveData = this.accountSaveData[key] ?? emptySaveData
  this.accountSaveData[key] = saveData
  this.activeKeys[key] = true

  if (saveData.lastListenerRegisteredTime != null) {
    saveData.lastProcessorRegisteredTime = saveData.lastListenerRegisteredTime
    saveData.lastListenerRegisteredTime = undefined
  }

  if (saveData.newestLinkedEventId != null) {
    saveData.newestManagedEventId = saveData.newestLinkedEventId
    saveData.newestLinkedEventId = undefined
  }

  if (saveData.newestLinkedEventTime != null) {
    saveData.newestManagedEventTime = saveData.newestLinkedEventTime
    saveData.newestLinkedEventTime = undefined
  }

  if (saveData.oldestLinkedEventId != null) {
    saveData.oldestManagedEventId = saveData.oldestLinkedEventId
    saveData.oldestLinkedEventId = undefined
  }

  if (saveData.oldestLinkedEventTime != null) {
    saveData.oldestManagedEventTime = saveData.oldestLinkedEventTime
    saveData.oldestLinkedEventTime = undefined
  }

  return saveData
}

GuildHistoryAdapter.DeleteInactiveCacheSaveData = function (this) {
  const keys: string[] = []
  for (const [key] of pairs(this.accountSaveData)) {
    const [matchStart] = string.find(key, "^" + internal.WORLD_NAME)
    if (matchStart != null) {
      keys[keys.length] = key
    }
  }

  for (const [, key] of ipairs(keys)) {
    if (!this.activeKeys[key]) {
      this.accountSaveData[key] = undefined
      logger.Info("Removed inactive cache save data for", key)
    }
  }
}

GuildHistoryAdapter.InitializeDeferred = function (this, history, cache) {
  this.history = history
  this.cache = cache
  this.selectedCategoryCache = cache.GetCategoryCache(
    history.guildId,
    history.selectedEventCategory
  )

  const refreshSelectedCategoryCache = (): undefined => {
    const selectedCategoryCache = cache.GetCategoryCache(
      history.guildId,
      history.selectedEventCategory
    )
    if (selectedCategoryCache !== this.selectedCategoryCache) {
      this.selectedCategoryCache = selectedCategoryCache
      internal.FireCallbacks(
        internal.callback.SELECTED_CATEGORY_CACHE_CHANGED,
        selectedCategoryCache
      )
    }
  }

  const guildSelectionProxy = {
    SetGuildId: refreshSelectedCategoryCache,
  }
  const guildWindows = GUILD_SELECTOR.guildWindows
  guildWindows[guildWindows.length] = guildSelectionProxy

  function onSelectionChanged(
    this: void,
    _control: unknown,
    _data: unknown,
    selected: boolean,
    _reselectingDuringRebuild: boolean
  ): undefined {
    if (selected) {
      refreshSelectedCategoryCache()
    }
  }

  const root = history.categoryTree.rootNode
  const rootChildren = root.children ?? []
  for (let i = 1; i <= rootChildren.length; i = i + 1) {
    const child = rootChildren[i]
    if (child != null) {
      if (child.children != null) {
        const childChildren = child.children
        for (let j = 1; j <= childChildren.length; j = j + 1) {
          const leaf = childChildren[j]
          if (leaf != null) {
            SecurePostHook(leaf, "selectionFunction", onSelectionChanged)
          }
        }
      } else {
        SecurePostHook(child, "selectionFunction", onSelectionChanged)
      }
    }
  }
}

GuildHistoryAdapter.SelectGuildByIndex = function (this, guildIndex) {
  asHistoryRef(this.history).SwapToGuildIndexWithoutAutoRequest(guildIndex)
}

GuildHistoryAdapter.SelectCategory = function (this, category) {
  asHistoryRef(this.history).SelectNodeForEventCategory(category, 1, true)
}

GuildHistoryAdapter.GetSelectedCategoryCache = function (this) {
  return this.selectedCategoryCache
}

GuildHistoryAdapter.GetGuildHistoryEventIndicesForTimeRange = function (
  this,
  guildId,
  category,
  newestTime,
  oldestTime
) {
  assert(newestTime >= oldestTime, "newestTime must be greater or equal to oldestTime")[0]
  return GetGuildHistoryEventIndicesForTimeRange(guildId, category, newestTime, oldestTime)
}

GuildHistoryAdapter.GetGuildHistoryCacheMaxDays = function (this, category) {
  const days = GetCVar(
    "GuildHistoryCacheMaxNumberOfDays_" + MAX_NUMBER_OF_DAYS_CVAR_SUFFIX[category]
  )
  return days != null ? (tonumber(days) ?? DEFAULT_MAX_CACHE_DAYS) : DEFAULT_MAX_CACHE_DAYS
}

GuildHistoryAdapter.SetGuildHistoryCacheMaxDays = function (this, category, days) {
  SetCVar(
    "GuildHistoryCacheMaxNumberOfDays_" + MAX_NUMBER_OF_DAYS_CVAR_SUFFIX[category],
    tostring(days)
  )
}

GuildHistoryAdapter.GetGuildHistoryCacheMaxTime = function (this, category) {
  return this.GetGuildHistoryCacheMaxDays(category) * SECONDS_PER_DAY
}

GuildHistoryAdapter.GetGuildHistoryServerMaxDays = function (this, category) {
  return MAX_SERVER_DAYS_FOR_CATEGORY[category] ?? DEFAULT_MAX_CACHE_DAYS
}

GuildHistoryAdapter.GetGuildHistoryServerMaxTime = function (this, category) {
  return this.GetGuildHistoryServerMaxDays(category) * SECONDS_PER_DAY
}

GuildHistoryAdapter.IsAutoDeleteLeftGuildsEnabled = function (this) {
  return GetCVar("GuildHistoryCacheAutoDeleteLeftGuilds") === "1"
}

GuildHistoryAdapter.SetAutoDeleteLeftGuildsEnabled = function (this, enabled) {
  SetCVar("GuildHistoryCacheAutoDeleteLeftGuilds", enabled ? "1" : "0")
}

GuildHistoryAdapter.IsGuildHistoryLoggingEnabled = function (this) {
  return GetCVar("EnableGuildHistoryLogging") === "1"
}

GuildHistoryAdapter.SetGuildHistoryLoggingEnabled = function (this, enabled) {
  SetCVar("EnableGuildHistoryLogging", enabled ? "1" : "0")
}

GuildHistoryAdapter.IsMarkGapsFeatureEnabled = function (this) {
  return this.settings.markGapsInHistory
}

GuildHistoryAdapter.SetMarkGapsFeatureEnabled = function (this, enabled) {
  this.settings.markGapsInHistory = enabled
}
