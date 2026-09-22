import { asGlobalTable } from "akasha/temper/addon/pages/capture-sales/modules/histoire-casts/histoire-casts.module.code.ts"
import { LIB_IDENTIFIER } from "akasha/temper/addon/pages/capture-sales/modules/histoire-constants/histoire-constants.module.code.ts"
import {
  internal,
  lib,
} from "akasha/temper/addon/pages/capture-sales/modules/histoire-state/histoire-state.module.code.ts"
import type { HistoryInternal } from "akasha/temper/addon/pages/capture-sales/modules/histoire-types/histoire-types.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/capture-sales/modules/sales-addon-name/sales-addon-name.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-guild-history/eso-guild-history.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-link-handler/eso-link-handler.type-declaration.d.ts"

const g = asGlobalTable(globalThis)

interface GuildHistoryAdapterRef {
  New: (
    this: GuildHistoryAdapterRef,
    cache: unknown,
    settings: unknown
  ) => GuildHistoryAdapterInstanceRef
}
function asGuildHistoryAdapterRef(value: unknown): GuildHistoryAdapterRef {
  return value as GuildHistoryAdapterRef
}
interface GuildHistoryAdapterInstanceRef {
  InitializeDeferred: (
    this: GuildHistoryAdapterInstanceRef,
    history: unknown,
    cache: unknown
  ) => void
  GetSelectedCategoryCache: (
    this: GuildHistoryAdapterInstanceRef
  ) => SelectedCategoryCacheRef | undefined
}
function asGuildHistoryAdapterInstanceRef(value: unknown): GuildHistoryAdapterInstanceRef {
  return value as GuildHistoryAdapterInstanceRef
}

interface GuildHistoryCacheRef {
  New: (
    this: GuildHistoryCacheRef,
    adapter: unknown,
    manager: unknown
  ) => GuildHistoryCacheInstanceRef
}
function asGuildHistoryCacheRef(value: unknown): GuildHistoryCacheRef {
  return value as GuildHistoryCacheRef
}
interface GuildHistoryCacheInstanceRef {
  StartRequests: (this: GuildHistoryCacheInstanceRef) => void
}
function asGuildHistoryCacheInstanceRef(value: unknown): GuildHistoryCacheInstanceRef {
  return value as GuildHistoryCacheInstanceRef
}

interface GuildHistoryStatusTooltipRef {
  New: (this: GuildHistoryStatusTooltipRef) => unknown
}
function asGuildHistoryStatusTooltipRef(value: unknown): GuildHistoryStatusTooltipRef {
  return value as GuildHistoryStatusTooltipRef
}

interface GuildHistoryStatusLinkedIconRef {
  New: (
    this: GuildHistoryStatusLinkedIconRef,
    history: unknown,
    adapter: unknown,
    tooltip: unknown
  ) => unknown
}
function asGuildHistoryStatusLinkedIconRef(value: unknown): GuildHistoryStatusLinkedIconRef {
  return value as GuildHistoryStatusLinkedIconRef
}

interface GuildHistoryStatusWindowRef {
  New: (
    this: GuildHistoryStatusWindowRef,
    adapter: unknown,
    tooltip: unknown,
    statusWindowSettings: unknown
  ) => GuildHistoryStatusWindowInstanceRef
}
function asGuildHistoryStatusWindowRef(value: unknown): GuildHistoryStatusWindowRef {
  return value as GuildHistoryStatusWindowRef
}
interface GuildHistoryStatusWindowInstanceRef {
  IsShowing: (this: GuildHistoryStatusWindowInstanceRef) => boolean
}
function asGuildHistoryStatusWindowInstanceRef(
  value: unknown
): GuildHistoryStatusWindowInstanceRef {
  return value as GuildHistoryStatusWindowInstanceRef
}

interface SelectedCategoryCacheRef {
  GetGuildId: (this: SelectedCategoryCacheRef) => number
}

internal.InitializeCaches = function (this: HistoryInternal): undefined {
  const logger = this.logger
  logger.Verbose("Initializing Caches")
  const guildHistoryAdapter = asGuildHistoryAdapterRef(internal.class.GuildHistoryAdapter)
  const guildHistoryCache = asGuildHistoryCacheRef(internal.class.GuildHistoryCache)
  this.historyAdapter = guildHistoryAdapter.New(
    g.LibHistoire_GuildHistoryCache,
    g.LibHistoire_Settings
  )
  const adapter = asGuildHistoryAdapterInstanceRef(this.historyAdapter)
  this.historyCache = guildHistoryCache.New(this.historyAdapter, GUILD_HISTORY_MANAGER)
  if (IsKeyboardUISupported()) {
    SecurePostHook(
      ZO_GuildHistory_Keyboard,
      "OnDeferredInitialize",
      (history: unknown): undefined => {
        if (this.statusWindow != null) {
          return
        }
        logger.Verbose("Initializing user interface")
        adapter.InitializeDeferred(history, this.historyCache)
        const guildHistoryStatusTooltip = asGuildHistoryStatusTooltipRef(
          internal.class.GuildHistoryStatusTooltip
        )
        const guildHistoryStatusLinkedIcon = asGuildHistoryStatusLinkedIconRef(
          internal.class.GuildHistoryStatusLinkedIcon
        )
        const guildHistoryStatusWindow = asGuildHistoryStatusWindowRef(
          internal.class.GuildHistoryStatusWindow
        )
        this.statusTooltip = guildHistoryStatusTooltip.New()
        this.linkedIcon = guildHistoryStatusLinkedIcon.New(
          history,
          this.historyAdapter,
          this.statusTooltip
        )
        const settings = g.LibHistoire_Settings
        this.statusWindow = guildHistoryStatusWindow.New(
          this.historyAdapter,
          this.statusTooltip,
          settings != null ? settings.statusWindow : undefined
        )
        logger.Verbose("User interface initialized")
      }
    )
  }

  internal.InitializeQuickNavigation()
  logger.Verbose("Caches initialized")
}

internal.Initialize = function (this: HistoryInternal): undefined {
  const logger = this.logger
  logger.Info("Begin pre-initialization")
  let namespace: string
  namespace = internal.RegisterForEvent(
    EVENT_ADD_ON_LOADED,
    (_event: number, name: string): undefined => {
      if (name !== ADDON_NAME) {
        return
      }
      internal.UnregisterForEvent(namespace, EVENT_ADD_ON_LOADED)
      logger.Info("Begin initialization")
      this.InitializeSaveData()
      this.InitializeCaches()
      this.InitializeDialogs()
      this.InitializeSettingsMenu()
      this.initialized = true
      logger.Info("Initialization complete")
      this.FireCallbacks(this.callback.INITIALIZED, lib)
      logger.Debug("INITIALIZED callback fired")
    }
  )

  let eventHandle: string
  eventHandle = internal.RegisterForEvent(EVENT_PLAYER_ACTIVATED, (): undefined => {
    internal.UnregisterForEvent(eventHandle, EVENT_PLAYER_ACTIVATED)
    zo_callLater((): undefined => {
      logger.Info("Begin deferred initialization")
      const cache = asGuildHistoryCacheInstanceRef(this.historyCache)
      cache.StartRequests()
      logger.Info("Deferred initialization complete")
    }, 5000)
  })
  logger.Info("Pre-initialization complete")
}

internal.CreateAsyncTask = function (this: HistoryInternal): unknown {
  const taskId = this.nextTaskId != null ? this.nextTaskId : 1
  this.nextTaskId = taskId + 1
  const [lib] = assert(g.LibAsync, "LibAsync wasn't found")
  const task = lib.Create(LIB_IDENTIFIER + tostring(taskId))
  return task
}

internal.IsGuildStatusVisible = function (this: HistoryInternal, guildId: number): boolean {
  const adapter =
    this.historyAdapter != null ? asGuildHistoryAdapterInstanceRef(this.historyAdapter) : undefined
  const statusWindow =
    this.statusWindow != null ? asGuildHistoryStatusWindowInstanceRef(this.statusWindow) : undefined
  if (adapter == null || statusWindow == null || !statusWindow.IsShowing()) {
    return false
  }

  const cache = adapter.GetSelectedCategoryCache()
  if (cache == null) {
    return false
  }

  return cache.GetGuildId() === guildId
}

const ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_PC = 1757925000
const ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_CONSOLE = 1758011400
const ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME: Record<string, number> = {
  "NA Megaserver": ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_PC,
  "EU Megaserver": ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_PC,
  XB1live: ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_CONSOLE,
  PS4live: ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_CONSOLE,
  "XB1live-eu": ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_CONSOLE,
  "PS4live-eu": ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME_CONSOLE,
}

internal.IsGuildHistorySystemDisabled = function (this: HistoryInternal): boolean {
  const world = GetWorldName()
  const reenableTime = ESTIMATED_GUILD_HISTORY_RE_ENABLE_TIME[world]
  if (reenableTime == null) {
    return false
  }
  return GetTimeStamp() < reenableTime
}
