import { checkIfEditBoxContextMenusNeedAnUpdate } from "akasha/temper/addon/pages/hud/temper-interface/modules/fco-mail-context-menu/fco-mail-context-menu.module.code.ts"
import {
  getMailSettings,
  LSM_CONTEXT_MENU_SETTINGS_DEFAULT_OPTIONS,
  MAIL_CONTEXT_MENU_BUTTONS,
  type MailFieldType,
} from "akasha/temper/addon/pages/hud/temper-interface/modules/fco-mail-data/fco-mail-data.module.code.ts"
import {
  checkAndEnabledEventHandlersIfNeeded,
  loadMailBuddyData,
} from "akasha/temper/addon/pages/hud/temper-interface/modules/fco-mail-events/fco-mail-events.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/interface-addon-neighbours/interface-addon-neighbours.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"

export function checkboxEntry(
  this: void,
  label: string,
  read: (this: void) => boolean,
  write: (this: void, stateVal: boolean) => void
): Record<string, unknown> {
  return {
    label,
    callback: (_comboBox: unknown, _itemName: unknown, _item: unknown, stateVal: boolean) => {
      write(stateVal)
    },
    checked: () => read(),
    entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
  }
}

export function getMailSettingsContextMenu(this: void): undefined {
  ClearCustomScrollableMenu()
  const settings = getMailSettings()
  if (settings.mailContextMenus !== true) {
    return
  }

  AddCustomScrollableMenuEntry(
    "Settings",
    () => {},
    TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER,
    undefined,
    {
      doNotFilter: true,
    }
  )

  const overrideSubmenu = [
    checkboxEntry(
      "Overwrite 'to' field, if not empty",
      () => settings.overwriteMailFields.recipients === true,
      (s) => {
        getMailSettings().overwriteMailFields.recipients = s
      }
    ),
    checkboxEntry(
      "Overwrite 'subject' field, if not empty",
      () => settings.overwriteMailFields.subjects === true,
      (s) => {
        getMailSettings().overwriteMailFields.subjects = s
      }
    ),
    checkboxEntry(
      "Overwrite 'text' field, if not empty",
      () => settings.overwriteMailFields.texts === true,
      (s) => {
        getMailSettings().overwriteMailFields.texts = s
      }
    ),
  ]
  AddCustomScrollableSubMenuEntry("Override fields", overrideSubmenu)

  const saveSubmenu = [
    checkboxEntry(
      "Save last 'to' field, as mail sends/fails/closes",
      () => settings.saveMailFields.recipients === true,
      (s) => {
        getMailSettings().saveMailFields.recipients = s
        checkAndEnabledEventHandlersIfNeeded(true)
      }
    ),
    checkboxEntry(
      "Save last 'subject' field, as mail sends/fails/closes",
      () => settings.saveMailFields.subjects === true,
      (s) => {
        getMailSettings().saveMailFields.subjects = s
        checkAndEnabledEventHandlersIfNeeded(true)
      }
    ),
    checkboxEntry(
      "Save last 'text' field, as mail sends/fails/closes",
      () => settings.saveMailFields.texts === true,
      (s) => {
        getMailSettings().saveMailFields.texts = s
        checkAndEnabledEventHandlersIfNeeded(true)
      }
    ),
  ]
  AddCustomScrollableSubMenuEntry("Save settings", saveSubmenu)

  const autoLoadSubmenu = [
    checkboxEntry(
      "Enabled: Auto load last 'to' field",
      () => settings.autoLoadMailFields.recipients === true,
      (s) => {
        getMailSettings().autoLoadMailFields.recipients = s
      }
    ),
    checkboxEntry(
      "Enabled: Auto load last 'subject' field",
      () => settings.autoLoadMailFields.subjects === true,
      (s) => {
        getMailSettings().autoLoadMailFields.subjects = s
      }
    ),
    checkboxEntry(
      "Enabled: Auto load last 'text' field",
      () => settings.autoLoadMailFields.texts === true,
      (s) => {
        getMailSettings().autoLoadMailFields.texts = s
      }
    ),
  ]
  AddCustomScrollableSubMenuEntry("Auto load settings", autoLoadSubmenu)

  const autoLoadAtSubmenu = buildAutoLoadAtSubmenu(settings)
  AddCustomScrollableSubMenuEntry("Auto load as...", autoLoadAtSubmenu)

  const otherSettingsSubmenu = buildOtherSettingsSubmenu(settings)
  AddCustomScrollableSubMenuEntry("Other settings", otherSettingsSubmenu)

  if (MailBuddy !== undefined && MailBuddy_SavedVars !== undefined) {
    const mailBuddySubmenu = [
      {
        label: "Import 'MailBuddy' recipients as favorites",
        callback: () => {
          loadMailBuddyData("recipients", true)
        },
      },
      {
        label: "Import 'MailBuddy' subjects as favorites",
        callback: () => {
          loadMailBuddyData("subjects", true)
        },
      },
    ]
    AddCustomScrollableMenuDivider()
    AddCustomScrollableSubMenuEntry("'MailBuddy' data import", mailBuddySubmenu)
  }

  ShowCustomScrollableMenu(
    MAIL_CONTEXT_MENU_BUTTONS.settings,
    LSM_CONTEXT_MENU_SETTINGS_DEFAULT_OPTIONS
  )
}

export function buildAutoLoadAtSubmenu(
  this: void,
  settings: ReturnType<typeof getMailSettings>
): unknown[] {
  const at = settings.autoLoadMailFieldsAt
  const fields: Array<{ key: MailFieldType; label: string }> = [
    { key: "recipients", label: "to" },
    { key: "subjects", label: "subject" },
    { key: "texts", label: "text" },
  ]
  const submenu: unknown[] = []
  for (const [, f] of ipairs(fields)) {
    submenu[submenu.length] = {
      label: `Auto load last '${f.label}', as mail opens`,
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().autoLoadMailFieldsAt.mailOpen[f.key] = s
      },
      checked: () => at.mailOpen[f.key] === true,
      disabled: () => getMailSettings().autoLoadMailFields[f.key] !== true,
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
    }
    submenu[submenu.length] = {
      label: `Auto load last '${f.label}', after mail was send (next mail)`,
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().autoLoadMailFieldsAt.mailWasSend[f.key] = s
      },
      checked: () => at.mailWasSend[f.key] === true,
      disabled: () => getMailSettings().autoLoadMailFields[f.key] !== true,
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
    }
  }
  return submenu
}

export function buildOtherSettingsSubmenu(
  this: void,
  settings: ReturnType<typeof getMailSettings>
): unknown[] {
  const isAnyFavoriteEnabled = (): boolean => {
    for (const [, isEnabled] of pairs(getMailSettings().mailFavorites)) {
      if (isEnabled === true) {
        return true
      }
    }
    return false
  }
  return [
    { entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER, label: "Menus" },
    {
      label: "Open submenus to the left",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().mailContextMenuSubmenusForceOpenToTheLeft = s
      },
      checked: () => settings.mailContextMenuSubmenusForceOpenToTheLeft === true,
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
    },
    { entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER, label: "Favorites" },
    checkboxEntry(
      "Enabled: Favorites 'to' field",
      () => settings.mailFavorites.recipients === true,
      (s) => {
        getMailSettings().mailFavorites.recipients = s
      }
    ),
    checkboxEntry(
      "Enabled: Favorites 'subject' field",
      () => settings.mailFavorites.subjects === true,
      (s) => {
        getMailSettings().mailFavorites.subjects = s
      }
    ),
    checkboxEntry(
      "Enabled: Favorites 'text' field",
      () => settings.mailFavorites.texts === true,
      (s) => {
        getMailSettings().mailFavorites.texts = s
      }
    ),
    { entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER },
    {
      label: "Split favorites by alphabet (create submenus)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().splitMailFavoritesIntoAlphabet = s
      },
      checked: () => settings.splitMailFavoritesIntoAlphabet === true,
      disabled: () => !isAnyFavoriteEnabled(),
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
    },
    {
      label: "Show favorites context menu at editbox (recipient/subject/text)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().mailFavoritesContextMenusAtEditFields = s
        checkIfEditBoxContextMenusNeedAnUpdate()
      },
      checked: () => settings.mailFavoritesContextMenusAtEditFields === true,
      disabled: () => !isAnyFavoriteEnabled(),
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
    },
    { entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER, label: "Last used" },
    {
      label: "Show last used context menu at editbox (recipient/subject/text)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().mailLastUsedContextMenusAtEditFields = s
        checkIfEditBoxContextMenusNeedAnUpdate()
      },
      checked: () => settings.mailLastUsedContextMenusAtEditFields === true,
      disabled: () => !isAnyFavoriteEnabled(),
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
    },
    { entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER, label: "Profiles" },
    {
      label: "Use mail profiles context menus at editbox (recipient)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().enableMailProfiles = s
        checkIfEditBoxContextMenusNeedAnUpdate()
      },
      checked: () => settings.enableMailProfiles === true,
      disabled: () => false,
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
    },
  ]
}
