import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { asGlobalTable } from "../histoire-casts/histoire-casts.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"
import type { LibHistoireInternal } from "../histoire-types/histoire-types.module.code.ts"

const g = asGlobalTable(globalThis)
const logger = internal.logger

interface SettingsAdapterRef {
  IsGuildHistoryLoggingEnabled: (this: SettingsAdapterRef) => boolean
  SetGuildHistoryLoggingEnabled: (this: SettingsAdapterRef, value: boolean) => void
  IsMarkGapsFeatureEnabled: (this: SettingsAdapterRef) => boolean
  SetMarkGapsFeatureEnabled: (this: SettingsAdapterRef, value: boolean) => void
  GetGuildHistoryServerMaxDays: (this: SettingsAdapterRef, eventCategory: number) => number
  GetGuildHistoryCacheMaxDays: (this: SettingsAdapterRef, eventCategory: number) => number
  SetGuildHistoryCacheMaxDays: (
    this: SettingsAdapterRef,
    eventCategory: number,
    value: number
  ) => void
  IsAutoDeleteLeftGuildsEnabled: (this: SettingsAdapterRef) => boolean
  SetAutoDeleteLeftGuildsEnabled: (this: SettingsAdapterRef, value: boolean) => void
}
function asSettingsAdapterRef(value: unknown): SettingsAdapterRef {
  return value as SettingsAdapterRef
}

function asNumber(value: unknown): number {
  return value as number
}

internal.InitializeSaveData = function (this: LibHistoireInternal): undefined {
  this.logger.Verbose("Initializing save data")

  const settings: Record<string, unknown> = g.LibHistoire_Settings ?? {
    version: 2,
    statusWindow: {
      enabled: true,
      locked: true,
    },
    markGapsInHistory: true,
  }

  if (asNumber(settings.version) < 2) {
    settings.version = 2
    settings.markGapsInHistory = true
  }

  g.LibHistoire_Settings = settings
  const cache: Record<string, unknown> = g.LibHistoire_GuildHistoryCache ?? {}
  g.LibHistoire_GuildHistoryCache = cache
  const account = GetDisplayName()
  cache[account] = cache[account] ?? {}

  this.logger.Verbose("Save data initialized")
}

internal.InitializeSettingsMenu = function (this: LibHistoireInternal): undefined {
  const lam = LibAddonMenu2
  const adapter = asSettingsAdapterRef(this.historyAdapter)

  const panelData: LamPanelData = {
    type: "panel",
    name: "LibHistoire",
    author: "sirinsidiator",
    version: "2.7.1.1103",
    website: "https://www.esoui.com/downloads/info2817-LibHistoire-GuildHistory.html",
    feedback: "https://www.esoui.com/downloads/info2817-LibHistoire-GuildHistory.html#comments",
    donation: "https://www.esoui.com/downloads/info2817-LibHistoire-GuildHistory.html#donate",
    registerForRefresh: true,
    registerForDefaults: true,
  }
  const optionsData: LamControlData[] = []

  optionsData[optionsData.length] = {
    type: "header",
    name: "General",
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: "Enable guild history logging",
    tooltip:
      "When enabled, the game will log additional information about the guild history cache to the Logs directory in the user folder.",
    warning: "Changes to this setting are only applied when the game is restarted.",
    getFunc: (): boolean => {
      return adapter.IsGuildHistoryLoggingEnabled()
    },
    setFunc: (value: boolean): undefined => {
      adapter.SetGuildHistoryLoggingEnabled(value)
    },
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: "Mark gaps in history list",
    tooltip:
      "When enabled, LibHistoire will inject additional rows into the ingame guild history to mark gaps in the history.",
    requiresReload: true,
    getFunc: (): boolean => {
      return adapter.IsMarkGapsFeatureEnabled()
    },
    setFunc: (value: boolean): undefined => {
      adapter.SetMarkGapsFeatureEnabled(value)
    },
  }

  optionsData[optionsData.length] = {
    type: "header",
    name: "Cache Retention Time",
  }

  optionsData[optionsData.length] = {
    type: "description",
    text:
      "These settings control how long the game keeps guild history data cached. " +
      "The game will automatically delete data that is older than the specified number of days on each login. " +
      "The maximum number of days you can set is not limited, but longer retention times will negatively affect loading times.",
  }

  for (
    let eventCategory = GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN;
    eventCategory <= GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END;
    eventCategory = eventCategory + 1
  ) {
    const serverMaxDays = adapter.GetGuildHistoryServerMaxDays(eventCategory)
    optionsData[optionsData.length] = {
      type: "slider",
      name: GetString("SI_GUILDHISTORYEVENTCATEGORY", eventCategory),
      min: serverMaxDays,
      max: 365,
      clampInput: false,
      getFunc: (): number => {
        return adapter.GetGuildHistoryCacheMaxDays(eventCategory)
      },
      setFunc: (value: number): undefined => {
        let clampedValue = value
        if (clampedValue < serverMaxDays) {
          clampedValue = serverMaxDays
        }
        adapter.SetGuildHistoryCacheMaxDays(eventCategory, clampedValue)
      },
      default: serverMaxDays,
    }
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: "Keep cache data after leaving a guild",
    tooltip:
      "When enabled, the game won't automatically delete the cached data when leaving a guild. " +
      "This is only useful if you plan to rejoin the guild later, " +
      "as the information cannot be accessed while you are not a member of that guild.",
    getFunc: (): boolean => {
      return !adapter.IsAutoDeleteLeftGuildsEnabled()
    },
    setFunc: (value: boolean): undefined => {
      adapter.SetAutoDeleteLeftGuildsEnabled(!value)
    },
  }

  optionsData[optionsData.length] = {
    type: "button",
    name: "Clear all history caches",
    tooltip: "Pressing this button will delete all stored guild history data and reload the UI.",
    warning:
      "This is usually not needed and as such not recommended, unless you know what you are doing and already tried everything else.",
    isDangerous: true,
    func: (): undefined => {
      logger.Warn("Clearing all caches")
      for (let i = 1; i <= GetNumGuilds(); i = i + 1) {
        const guildId = GetGuildId(i)
        const result = ClearGuildHistoryCache(guildId)
        logger.Info("Cache clear result for guild", guildId, result)
      }
      ReloadUI()
    },
  }

  optionsData[optionsData.length] = {
    type: "editbox",
    reference: "LibHistoireCachePathEditbox",
    name: "Cache Path",
    tooltip: "This is the folder where the cache files are stored.",
    isExtraWide: true,
    getFunc: (): string => {
      if (IsMacUI()) {
        return "~/Documents/Elder Scrolls Online/live/GuildHistory"
      }
      return "%UserProfile%\\Documents\\Elder Scrolls Online\\live\\GuildHistory"
    },
    setFunc: (_value: string): undefined => {},
  }
  const panel = registerPanel(lam, "LibHistoireOptions", panelData, optionsData)

  CALLBACK_MANAGER.RegisterCallback(
    "LAM-PanelControlsCreated",
    (openedPanel: unknown): undefined => {
      if (panel !== openedPanel) {
        return
      }
      const editbox = LibHistoireCachePathEditbox.editbox
      editbox.SetEditEnabled(false)
      editbox.SetSelectAllOnFocus(true)
      editbox.SetCursorPosition(0)
    }
  )

  internal.OpenSettingsPanel = (): undefined => {
    lam.OpenToPanel(panel)
  }
}
