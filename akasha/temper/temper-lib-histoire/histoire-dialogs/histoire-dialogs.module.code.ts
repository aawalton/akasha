import { asGlobalTable } from "../histoire-casts/histoire-casts.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"
import type { LibHistoireInternal } from "../histoire-types/histoire-types.module.code.ts"

const g = asGlobalTable(globalThis)

const DIALOG_ID = "LibHistoire"

function asNumber(value: unknown): number {
  return value as number
}

interface HistoryCacheRef {
  IsProcessing: (this: HistoryCacheRef) => boolean
  HasLinkedAllCachesRecently: (this: HistoryCacheRef) => boolean
  Shutdown: (this: HistoryCacheRef) => void
}
function asHistoryCacheRef(value: unknown): HistoryCacheRef {
  return value as HistoryCacheRef
}

type EsoDialogsTable = Record<string, LibHistoireWarningDialog>
function asEsoDialogsTable(value: unknown): EsoDialogsTable {
  return value as EsoDialogsTable
}

type DialogCallback = (this: void, ...rest: unknown[]) => unknown
function asDialogCallback(value: unknown): DialogCallback {
  return value as DialogCallback
}

const esoDialogs = asEsoDialogsTable(ESO_Dialogs)

function getWarningDialog(this: void): LibHistoireWarningDialog {
  const existing = esoDialogs[DIALOG_ID]
  if (existing != null) {
    return existing
  }
  const dialog: LibHistoireWarningDialog = {
    canQueue: true,
    gamepadInfo: {
      dialogType: asNumber(GAMEPAD_DIALOGS.CENTERED),
    },
    setup: (d: LibHistoireWarningDialog): undefined => {
      if (d.setupFunc != null) {
        d.setupFunc()
      }
    },
    title: {
      text: "",
    },
    mainText: {
      text: "",
    },
    buttons: {
      1: {
        text: "",
        callback: (): undefined => {},
      },
      2: {
        text: "",
      },
    },
  }
  esoDialogs[DIALOG_ID] = dialog
  return dialog
}

function showWarningDialog(this: void): undefined {
  if (IsInGamepadPreferredMode()) {
    ZO_Dialogs_ShowGamepadDialog(DIALOG_ID)
  } else {
    ZO_Dialogs_ShowDialog(DIALOG_ID)
  }
}

function showShutdownWarningDialog(
  this: void,
  message: string,
  buttonText: string | number,
  callback: ((this: void, ...args: unknown[]) => unknown) | undefined
): undefined {
  const dialog = getWarningDialog()
  dialog.title.text = "Warning"
  dialog.mainText.text = message

  const primaryButton = dialog.buttons[1]
  primaryButton.text = "Open History"
  primaryButton.callback = (): undefined => {
    MAIN_MENU_KEYBOARD.ShowScene("guildHistory")
  }

  const secondaryButton = dialog.buttons[2]
  secondaryButton.text = buttonText
  secondaryButton.callback = callback

  ZO_Dialogs_ReleaseDialogOnButtonPress("GAMEPAD_LOG_OUT")
  showWarningDialog()
}

function showResetManagedRangeDialog(this: void, ...args: unknown[]): undefined {
  const callback = asDialogCallback(args[1])
  const dialog = getWarningDialog()
  dialog.title.text = "Warning"
  dialog.mainText.text =
    "Resetting the managed range will make LibHistoire forget from which point to start requesting events and what data has already been sent to addons.\n\n" +
    "This action is usually not necessary, but can be used to skip over a large gap of missing data after a prolonged absence.\n\n" +
    "Use it with caution, as it means addons may miss out on events to process, which can cause holes in your data!"

  const primaryButton = dialog.buttons[1]
  primaryButton.text = SI_DIALOG_CONFIRM
  primaryButton.callback = callback

  const secondaryButton = dialog.buttons[2]
  secondaryButton.text = SI_DIALOG_CANCEL
  secondaryButton.callback = undefined

  showWarningDialog()
}

function showClearCacheDialog(this: void, ...args: unknown[]): undefined {
  const callback = asDialogCallback(args[1])
  const dialog = getWarningDialog()
  dialog.title.text = "Warning"
  dialog.mainText.text =
    "Clearing the cache will delete locally stored events and force the game to fetch them again from the server.\n\n" +
    "This action is not recommended as it will have a negative effect on the server and you will potentially delete data that cannot be requested again.\n\n" +
    "It will implicitly also reset the managed range and thus will cause addons to potentially miss out on events, which can cause holes in your data!\n\n" +
    "You should only use this as an absolute last resort when nothing else has worked!\n\n" +
    "The UI will be reloaded when you confirm this action."

  const primaryButton = dialog.buttons[1]
  primaryButton.text = SI_DIALOG_CONFIRM
  primaryButton.callback = callback

  const secondaryButton = dialog.buttons[2]
  secondaryButton.text = SI_DIALOG_CANCEL
  secondaryButton.callback = undefined

  showWarningDialog()
}

function showShutdownWarningIfNeeded(
  this: void,
  cache: HistoryCacheRef,
  buttonText: string | number,
  originalCallback: ((this: void, ...args: unknown[]) => unknown) | undefined,
  ...args: unknown[]
): unknown {
  if (cache.IsProcessing()) {
    showShutdownWarningDialog(
      "LibHistoire is currently processing events! If you exit now, you may corrupt your save data.\n\n" +
        "You are advised to check the status window and wait until all events have been processed before reloading the UI.",
      buttonText,
      originalCallback
    )
    return undefined
  }
  if (!internal.IsGuildHistorySystemDisabled() && !cache.HasLinkedAllCachesRecently()) {
    showShutdownWarningDialog(
      "LibHistoire has not been able to link the managed history range of one or more categories to present history for over a week.\n\n" +
        "You are advised to check the status window and try to manually request missing data to avoid interruptions in the data flow for dependent addons.",
      buttonText,
      originalCallback
    )
    return undefined
  }
  if (originalCallback == null) {
    return undefined
  }
  return originalCallback(...args)
}

function setupDialogHook(this: void, cache: HistoryCacheRef, name: string): undefined {
  const dialog = esoDialogs[name]
  if (dialog == null) {
    return
  }
  const primaryButton = dialog.buttons[1]
  const originalCallback = primaryButton.callback
  primaryButton.callback = (...args: unknown[]): unknown => {
    return showShutdownWarningIfNeeded(cache, primaryButton.text, originalCallback, ...args)
  }
}

type SlashCommandTable = Record<string, (this: void, ...args: unknown[]) => unknown>
function asSlashCommandTable(value: unknown): SlashCommandTable {
  return value as SlashCommandTable
}

type ReloadUIFn = (this: void, ...args: unknown[]) => unknown
function asReloadUIFn(value: unknown): ReloadUIFn {
  return value as ReloadUIFn
}

function setupSlashCommandHook(
  this: void,
  cache: HistoryCacheRef,
  name: string,
  buttonText: string | number
): undefined {
  const slashCommands = asSlashCommandTable(SLASH_COMMANDS)
  const originalSlashCommand = slashCommands[name]
  slashCommands[name] = (...args: unknown[]): unknown => {
    return showShutdownWarningIfNeeded(cache, buttonText, originalSlashCommand, ...args)
  }
}

internal.InitializeDialogs = function (this: LibHistoireInternal): undefined {
  const cache = asHistoryCacheRef(this.historyCache)
  if (IsKeyboardUISupported()) {
    setupDialogHook(cache, "LOG_OUT")
    setupDialogHook(cache, "QUIT")
  }
  setupDialogHook(cache, "GAMEPAD_LOG_OUT")
  setupSlashCommandHook(
    cache,
    GetString(SI_SLASH_LOGOUT),
    GetString(SI_LOG_OUT_GAME_CONFIRM_KEYBIND)
  )
  setupSlashCommandHook(cache, GetString(SI_SLASH_CAMP), GetString(SI_LOG_OUT_GAME_CONFIRM_KEYBIND))
  setupSlashCommandHook(cache, GetString(SI_SLASH_QUIT), GetString(SI_QUIT_GAME_CONFIRM_KEYBIND))

  const originalReloadUI = asReloadUIFn(ReloadUI)
  g.ReloadUI = (...args: unknown[]): unknown => {
    if (cache.IsProcessing()) {
      const params = args
      showShutdownWarningDialog(
        "LibHistoire is currently processing events! If you reload the UI now, you may corrupt your save data.\n\n" +
          "You are advised to check the status window and wait until all events have been processed before reloading the UI.",
        "Reload UI",
        (): unknown => {
          cache.Shutdown()
          return originalReloadUI(...params)
        }
      )
      return undefined
    }
    cache.Shutdown()
    return originalReloadUI(...args)
  }

  internal.ShowClearCacheDialog = showClearCacheDialog
  internal.ShowResetManagedRangeDialog = showResetManagedRangeDialog
}
