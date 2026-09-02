import type {
  CacheGuildDataRef,
  GuildHistoryCacheGuildClass,
  GuildHistoryCacheGuildInstance,
} from "../histoire-cache-guild/histoire-cache-guild.module.code.ts"
import type { GuildHistoryCacheCategoryInstance } from "../histoire-category-class-shape/histoire-category-class-shape.module.code.ts"
import type {
  RequestManagerRef as CategoryRequestManagerRef,
  HistoryAdapterRef,
} from "../histoire-category-types/histoire-category-types.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

export interface CacheManagerRef {
  GetGuildData: (this: CacheManagerRef, guildId: number) => CacheGuildDataRef
  RegisterCallback: (
    this: CacheManagerRef,
    name: string,
    callback: (this: void, categoryData: ManagerCategoryData, flags?: unknown) => void
  ) => void
}

export interface ManagerCategoryData {
  GetGuildData: (this: ManagerCategoryData) => { GetId: (this: unknown) => number }
  GetEventCategory: (this: ManagerCategoryData) => number
}

export interface RequestManagerRef extends CategoryRequestManagerRef {
  RequestSendNext: (this: RequestManagerRef) => void
  Shutdown: (this: RequestManagerRef) => void
  GetDebugInfo: (this: RequestManagerRef) => unknown
}

export interface RequestManagerClassRef {
  New: (this: RequestManagerClassRef) => RequestManagerRef
}

export interface CategoryCacheRef {
  OnCategoryUpdated: (this: CategoryCacheRef, flags?: unknown) => void
}

export interface CacheAdapterRef extends HistoryAdapterRef {
  IsAutoDeleteLeftGuildsEnabled: (this: CacheAdapterRef) => boolean
  DeleteInactiveCacheSaveData: (this: CacheAdapterRef) => void
}

export interface GuildHistoryCacheInstance {
  requestManager: RequestManagerRef
  cache: LuaTable<number, GuildHistoryCacheGuildInstance>

  Initialize: (
    this: GuildHistoryCacheInstance,
    adapter: CacheAdapterRef,
    manager: CacheManagerRef
  ) => void
  ForEachActiveGuild: (
    this: GuildHistoryCacheInstance,
    func: (this: void, guildCache: GuildHistoryCacheGuildInstance) => boolean | undefined
  ) => void
  StartRequests: (this: GuildHistoryCacheInstance) => void
  VerifyRequests: (this: GuildHistoryCacheInstance) => void
  DeleteRequests: (this: GuildHistoryCacheInstance) => void
  HasLinkedAllCaches: (this: GuildHistoryCacheInstance) => boolean
  HasLinkedAllCachesRecently: (this: GuildHistoryCacheInstance) => boolean
  IsProcessing: (this: GuildHistoryCacheInstance) => boolean
  GetGuildCache: (
    this: GuildHistoryCacheInstance,
    guildId: number
  ) => GuildHistoryCacheGuildInstance | undefined
  GetCategoryCache: (
    this: GuildHistoryCacheInstance,
    guildId: number,
    category: number
  ) => GuildHistoryCacheCategoryInstance | undefined
  Shutdown: (this: GuildHistoryCacheInstance) => void
  GetDebugInfo: (this: GuildHistoryCacheInstance) => LuaTable<string, unknown>
}

export interface GuildHistoryCacheClass extends GuildHistoryCacheInstance {
  New: (
    this: GuildHistoryCacheClass,
    adapter: CacheAdapterRef,
    manager: CacheManagerRef
  ) => GuildHistoryCacheInstance
}

const GuildHistoryCache = ZO_InitializingObject.Subclass<GuildHistoryCacheClass>()
internal.class.GuildHistoryCache = GuildHistoryCache

export { GuildHistoryCache }

function asRequestManagerClassRef(value: unknown): RequestManagerClassRef {
  return value as RequestManagerClassRef
}
function asGuildHistoryCacheGuildClass(value: unknown): GuildHistoryCacheGuildClass {
  return value as GuildHistoryCacheGuildClass
}
function asCategoryCacheRef(value: unknown): CategoryCacheRef {
  return value as CategoryCacheRef
}

GuildHistoryCache.Initialize = function (this, adapter, manager) {
  this.requestManager = asRequestManagerClassRef(
    internal.class.GuildHistoryServerRequestManager
  ).New()
  this.cache = new LuaTable<number, GuildHistoryCacheGuildInstance>()

  const guildHistoryCacheGuild = asGuildHistoryCacheGuildClass(
    internal.class.GuildHistoryCacheGuild
  )

  const createGuildCache = (guildId: number): undefined => {
    const guildData = manager.GetGuildData(guildId)
    this.cache.set(guildId, guildHistoryCacheGuild.New(adapter, this.requestManager, guildData))
  }

  for (let i = 1; i <= GetNumGuilds(); i = i + 1) {
    const guildId = GetGuildId(i)
    createGuildCache(guildId)
  }

  if (adapter.IsAutoDeleteLeftGuildsEnabled()) {
    adapter.DeleteInactiveCacheSaveData()
  }

  internal.RegisterForEvent(
    EVENT_GUILD_SELF_JOINED_GUILD,
    (_eventCode: number, guildId: number) => {
      createGuildCache(guildId)
    }
  )

  manager.RegisterCallback("CategoryUpdated", (categoryData, flags) => {
    const guildId = categoryData.GetGuildData().GetId()
    const category = categoryData.GetEventCategory()
    const categoryCache = asCategoryCacheRef(this.GetCategoryCache(guildId, category))
    categoryCache.OnCategoryUpdated(flags)
    this.requestManager.RequestSendNext()
  })
}

GuildHistoryCache.ForEachActiveGuild = function (this, func) {
  for (let i = 1; i <= GetNumGuilds(); i = i + 1) {
    const guildId = GetGuildId(i)
    const guildCache = this.GetGuildCache(guildId)
    if (guildCache != null && func(guildCache) === true) {
      return
    }
  }
}

GuildHistoryCache.StartRequests = function (this) {
  this.ForEachActiveGuild((guildCache) => {
    guildCache.StartRequests()
    return undefined
  })
}

GuildHistoryCache.VerifyRequests = function (this) {
  logger.Debug("VerifyRequests")
  this.ForEachActiveGuild((guildCache) => {
    guildCache.VerifyRequests()
    return undefined
  })
  logger.Debug("VerifyRequests done")
  this.requestManager.RequestSendNext()
}

GuildHistoryCache.DeleteRequests = function (this) {
  this.ForEachActiveGuild((guildCache) => {
    guildCache.DeleteRequests()
    return undefined
  })
}

GuildHistoryCache.HasLinkedAllCaches = function (this) {
  let allLinked = true
  this.ForEachActiveGuild((guildCache) => {
    if (!guildCache.HasLinked()) {
      allLinked = false
      return true
    }
    return undefined
  })
  return allLinked
}

GuildHistoryCache.HasLinkedAllCachesRecently = function (this) {
  let allLinked = true
  this.ForEachActiveGuild((guildCache) => {
    if (!guildCache.HasLinkedRecently()) {
      allLinked = false
      return true
    }
    return undefined
  })
  return allLinked
}

GuildHistoryCache.IsProcessing = function (this) {
  let isProcessing = false
  this.ForEachActiveGuild((guildCache) => {
    if (guildCache.IsProcessing()) {
      isProcessing = true
      return true
    }
    return undefined
  })
  return isProcessing
}

GuildHistoryCache.GetGuildCache = function (this, guildId) {
  return this.cache.get(guildId)
}

GuildHistoryCache.GetCategoryCache = function (this, guildId, category) {
  const guildCache = this.GetGuildCache(guildId)
  if (guildCache == null) {
    return undefined
  }
  const categoryCache = guildCache.GetCategoryCache(category)
  return categoryCache
}

GuildHistoryCache.Shutdown = function (this) {
  this.requestManager.Shutdown()
}

GuildHistoryCache.GetDebugInfo = function (this) {
  const debugInfo = new LuaTable<string, unknown>()
  debugInfo.set("hasLinkedAllCaches", this.HasLinkedAllCaches())
  debugInfo.set("hasLinkedAllCachesRecently", this.HasLinkedAllCachesRecently())
  debugInfo.set("isProcessing", this.IsProcessing())
  debugInfo.set("guildCount", GetNumGuilds())
  debugInfo.set("guildCacheCount", NonContiguousCount(this.cache))

  const activeGuilds = new LuaTable<number, unknown>()
  let activeGuildCount = 0
  this.ForEachActiveGuild((guildCache) => {
    activeGuildCount = activeGuildCount + 1
    activeGuilds.set(activeGuildCount, guildCache.GetDebugInfo())
    return undefined
  })
  debugInfo.set("activeGuilds", activeGuilds)

  debugInfo.set("requestManager", this.requestManager.GetDebugInfo())

  return debugInfo
}
