import { type LamRegistrar, registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { asGlobalTable, asString } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL } from "../knowledge-state/knowledge-state.module.code.ts"
import type { SavedVars } from "../knowledge-types/knowledge-types.module.code.ts"

function asLamRegistrar(value: unknown): LamRegistrar<object, unknown, unknown[]> {
  return value as LamRegistrar<object, unknown, unknown[]>
}

INTERNAL.RegisterSettingsPanel = function (this: void): undefined {
  const libAddonMenu = LCCC.GetLibAddonMenu()

  if (libAddonMenu !== undefined) {
    const panelId = "LCKSettings"

    INTERNAL.shareText = ""

    const panelData = {
      type: "panel",
      name: INTERNAL.name,
      version: LCCC.FormatVersion(LCCC.GetAddOnVersion(INTERNAL.name)),
      author: "@code65536",
      website: "https://www.esoui.com/downloads/info3317.html",
      donation: "https://www.esoui.com/downloads/info3317.html#donate",
      slashCommand: "/lck",
      registerForRefresh: true,
    }

    const controls: unknown[] = [
      {
        type: "description",
        text: SI_LCK_SETTINGS_CHATCOMMAND,
      },
      ...INTERNAL.SettingsBuildMainSection(),
    ]

    if (!ZO_IsConsoleOrGameCoreUI()) {
      LCCC.ConcatTables(controls, [
        {
          type: "header",
          name: SI_LCK_SETTINGS_SHARE_SECTION,
        },
        {
          type: "editbox",
          name: SI_LCK_SETTINGS_SHARE_CAPTION,
          getFunc: function (this: void): string {
            return asShareText(INTERNAL.shareText)
          },
          setFunc: function (this: void, text: string): undefined {
            INTERNAL.shareText = text
          },
          isMultiline: true,
          isExtraWide: true,
          maxChars: 0xffff,
          textType: TEXT_TYPE_ALL,
          reference: "LCK_ExportBox",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_EXPORTC,
          func: INTERNAL.ExportCurrent,
          tooltip: SI_LCK_SETTINGS_SHARE_EXPORTCT,
          width: "half",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_IMPORT,
          func: INTERNAL.Import,
          width: "half",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_EXPORTA,
          func: function (this: void): undefined {
            INTERNAL.ExportMultiple(true)
          },
          tooltip: SI_LCK_SETTINGS_SHARE_EXPORTAT,
          width: "half",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_CLEAR,
          func: function (this: void): undefined {
            INTERNAL.shareText = ""
          },
          width: "half",
        },
        {
          type: "button",
          name: INTERNAL.GetExportSelectedText,
          func: function (this: void): undefined {
            INTERNAL.ExportMultiple(false)
          },
          tooltip: SI_LCK_SETTINGS_SHARE_EXPORTST,
          width: "half",
          disabled: function (this: void): boolean {
            return INTERNAL.CountExportSelection() === 0
          },
          reference: "LCK_ExportSelected",
        },

        {
          type: "header",
          name: SI_LCK_SETTINGS_RESET_SECTION,
        },
        {
          type: "custom",
          width: "half",
        },
        {
          type: "button",
          name: SI_OPTIONS_RESET,
          func: function (this: void): undefined {
            asGlobalTable(globalThis).LibCharacterKnowledgeData = asResetVars({})
            ReloadUI()
          },
          tooltip: SI_LCK_SETTINGS_RESET_WARNING,
          width: "half",
          isDangerous: true,
          warning: SI_LCK_SETTINGS_RESET_WARNING,
        },

        {
          type: "header",
          name: SI_LCK_SETTINGS_NOSAVE_SECTION,
        },
        {
          type: "editbox",
          name: SI_LCK_SETTINGS_NOSAVE_CAPTION,
          getFunc: function (this: void): string {
            const accounts: string[] = []
            if (INTERNAL.vars.noSave !== undefined) {
              for (const [account] of pairs(INTERNAL.vars.noSave)) {
                accounts.push(account)
              }
              table.sort(accounts)
            }
            return table.concat(accounts, ", ")
          },
          setFunc: function (this: void, text: string): undefined {
            const accounts = [...zo_strsplit(", ", zo_strlower(text))]
            if (accounts.length > 0) {
              INTERNAL.vars.noSave = {}
              for (const [, account] of ipairs(accounts)) {
                asNoSaveSet(INTERNAL.vars.noSave)[DecorateDisplayName(asString(account))] = true
              }
            } else {
              INTERNAL.vars.noSave = undefined
            }
          },
          isMultiline: true,
          isExtraWide: true,
          maxChars: 0xfff,
          textType: TEXT_TYPE_ALL,
        },
      ])
    }

    INTERNAL.settingsPanel = registerPanel(
      asLamRegistrar(libAddonMenu),
      panelId,
      panelData,
      controls
    )
  }
}

type ShareText = string
function asShareText(value: string | undefined): ShareText {
  return value as ShareText
}

type NoSaveSet = Record<string, boolean>
function asNoSaveSet(value: NoSaveSet | undefined): NoSaveSet {
  return value as NoSaveSet
}

type ResetVars = SavedVars
function asResetVars(value: object): ResetVars {
  return value as ResetVars
}
