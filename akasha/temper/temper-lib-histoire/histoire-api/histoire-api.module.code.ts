import {
  CALLBACK,
  STOP_REASON_ITERATION_COMPLETED,
  STOP_REASON_LAST_CACHED_EVENT_REACHED,
  STOP_REASON_MANAGED_RANGE_LOST,
  STOP_REASON_MANUAL_STOP,
} from "../histoire-constants/histoire-constants.module.code.ts"
import { internal, lib } from "../histoire-state/histoire-state.module.code.ts"
import type { LibHistoireGlobal } from "../histoire-types/histoire-types.module.code.ts"

const logger = internal.logger

interface GuildHistoryLegacyEventListenerRef {
  New: (
    this: GuildHistoryLegacyEventListenerRef,
    guildId: number,
    category: number,
    caches: unknown[]
  ) => unknown
}
function asGuildHistoryLegacyEventListenerRef(value: unknown): GuildHistoryLegacyEventListenerRef {
  return value as GuildHistoryLegacyEventListenerRef
}

interface GuildHistoryEventProcessorRef {
  New: (this: GuildHistoryEventProcessorRef, categoryCache: unknown, addonName: string) => unknown
}
function asGuildHistoryEventProcessorRef(value: unknown): GuildHistoryEventProcessorRef {
  return value as GuildHistoryEventProcessorRef
}

interface HistoryCacheCategoryLookupRef {
  GetCategoryCache: (
    this: HistoryCacheCategoryLookupRef,
    guildId: number,
    category: number
  ) => unknown | undefined
}
function asHistoryCacheCategoryLookupRef(value: unknown): HistoryCacheCategoryLookupRef {
  return value as HistoryCacheCategoryLookupRef
}

lib.IsReady = function (this: LibHistoireGlobal): boolean {
  return internal.initialized === true
}

lib.IsGuildHistorySystemDisabled = function (this: LibHistoireGlobal): boolean {
  return internal.IsGuildHistorySystemDisabled()
}

lib.OnReady = function (
  this: LibHistoireGlobal,
  callback: (lib: LibHistoireGlobal) => void
): undefined {
  if (internal.initialized === true) {
    callback(this)
  } else {
    internal.RegisterCallback(CALLBACK.INITIALIZED, callback)
  }
}

const CALLBACKS: Record<string, string> = {
  INITIALIZED: CALLBACK.INITIALIZED,
  // @deprecated Rescan no longer exists.
  HISTORY_RESCAN_STARTED: CALLBACK.DEPRECATED,
  // @deprecated Rescan no longer exists.
  HISTORY_RESCAN_ENDED: CALLBACK.DEPRECATED,
  // @deprecated Use MANAGED_RANGE_LOST instead.
  LINKED_RANGE_LOST: CALLBACK.MANAGED_RANGE_LOST,
  // @deprecated Use MANAGED_RANGE_FOUND instead.
  LINKED_RANGE_FOUND: CALLBACK.MANAGED_RANGE_FOUND,
  MANAGED_RANGE_LOST: CALLBACK.MANAGED_RANGE_LOST,
  MANAGED_RANGE_FOUND: CALLBACK.MANAGED_RANGE_FOUND,
  CATEGORY_LINKED: CALLBACK.CATEGORY_LINKED,
}

lib.callback = CALLBACKS

lib.RegisterCallback = function (this: LibHistoireGlobal, ...args: unknown[]): undefined {
  internal.RegisterCallback(...args)
}

lib.UnregisterCallback = function (this: LibHistoireGlobal, ...args: unknown[]): undefined {
  internal.UnregisterCallback(...args)
}

lib.CreateGuildHistoryListener = function (
  this: LibHistoireGlobal,
  guildId: number,
  category: number
): unknown {
  let listener: unknown
  logger.Warn("No addon name provided for guild history listener - creating a legacy listener")
  const getCaches = internal.GetCachesForLegacyCategory
  const caches = getCaches != null ? getCaches(guildId, category) : []
  if (caches.length > 0) {
    const guildHistoryLegacyEventListener = asGuildHistoryLegacyEventListenerRef(
      internal.class.GuildHistoryLegacyEventListener
    )
    listener = guildHistoryLegacyEventListener.New(guildId, category, caches)
  } else {
    logger.Warn("No category caches found for guild", guildId, "and legacy category", category)
  }
  return listener
}

lib.CreateGuildHistoryProcessor = function (
  this: LibHistoireGlobal,
  guildId: number,
  category: number,
  addonName: string
): unknown {
  let processor: unknown
  const historyCache = asHistoryCacheCategoryLookupRef(internal.historyCache)
  const categoryCache = historyCache.GetCategoryCache(guildId, category)
  if (categoryCache != null) {
    const guildHistoryEventProcessor = asGuildHistoryEventProcessorRef(
      internal.class.GuildHistoryEventProcessor
    )
    processor = guildHistoryEventProcessor.New(categoryCache, addonName)
  } else {
    logger.Warn("No category cache found for guild", guildId, "and category", category)
  }
  return processor
}

lib.ConvertArtificialLegacyId64ToEventId = function (
  this: LibHistoireGlobal,
  id64: string
): number | undefined {
  const convert = internal.ConvertLegacyId64ToEventId
  if (convert == null) {
    return undefined
  }
  return convert(id64)
}

const STOP_REASON: Record<string, string> = {
  MANUAL_STOP: STOP_REASON_MANUAL_STOP,
  LAST_CACHED_EVENT_REACHED: STOP_REASON_LAST_CACHED_EVENT_REACHED,
  ITERATION_COMPLETED: STOP_REASON_ITERATION_COMPLETED,
  MANAGED_RANGE_LOST: STOP_REASON_MANAGED_RANGE_LOST,
}

lib.StopReason = STOP_REASON
