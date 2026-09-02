import {
  checkIfEditBoxContextMenusNeedAnUpdate,
  updateMailContextMenuButtonContextMenus,
} from "../fco-mail-context-menu/fco-mail-context-menu.module.code.ts"
import {
  allowedMailContextMenuOwners,
  getMailSettings,
  LSM_CONTEXT_MENU_SETTINGS_DEFAULT_OPTIONS,
  MAIL_CONTEXT_MENU_BUTTONS,
  type MailFieldType,
} from "../fco-mail-data/fco-mail-data.module.code.ts"
import {
  afterMailWasSend,
  checkAndEnabledEventHandlersIfNeeded,
  checkAndSaveMailValuesOfEnabledFields,
  loadMailBuddyData,
} from "../fco-mail-events/fco-mail-events.module.code.ts"
import { getMailReceivedMassChangeContextMenu } from "../fco-mail-mass-delete/fco-mail-mass-delete.module.code.ts"
import { updateLowercaseTextTables } from "../fco-mail-store/fco-mail-store.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"
import { addButton } from "../fco-utils/fco-utils.module.code.ts"

const addonVars = STATE.addonVars

let MAIL_CONTEXT_MENUT_BUTTONS_ADDED = false
let IS_ON_MAIL_SEND_SUCCESS_HOOKED = false
let IS_ON_MAIL_SEND_SUCCESS_POST_HOOKED = false

function checkboxEntry(
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
    entryType: LSM_ENTRY_TYPE_CHECKBOX,
  }
}

function getMailSettingsContextMenu(this: void): undefined {
  ClearCustomScrollableMenu()
  const settings = getMailSettings()
  if (settings.mailContextMenus !== true) {
    return
  }

  AddCustomScrollableMenuEntry("Settings", () => {}, LSM_ENTRY_TYPE_HEADER, undefined, {
    doNotFilter: true,
  })

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

function buildAutoLoadAtSubmenu(
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
      entryType: LSM_ENTRY_TYPE_CHECKBOX,
    }
    submenu[submenu.length] = {
      label: `Auto load last '${f.label}', after mail was send (next mail)`,
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().autoLoadMailFieldsAt.mailWasSend[f.key] = s
      },
      checked: () => at.mailWasSend[f.key] === true,
      disabled: () => getMailSettings().autoLoadMailFields[f.key] !== true,
      entryType: LSM_ENTRY_TYPE_CHECKBOX,
    }
  }
  return submenu
}

function buildOtherSettingsSubmenu(
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
    { entryType: LSM_ENTRY_TYPE_HEADER, label: "Menus" },
    {
      label: "Open submenus to the left",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().mailContextMenuSubmenusForceOpenToTheLeft = s
      },
      checked: () => settings.mailContextMenuSubmenusForceOpenToTheLeft === true,
      entryType: LSM_ENTRY_TYPE_CHECKBOX,
    },
    { entryType: LSM_ENTRY_TYPE_HEADER, label: "Favorites" },
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
    { entryType: LSM_ENTRY_TYPE_DIVIDER },
    {
      label: "Split favorites by alphabet (create submenus)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().splitMailFavoritesIntoAlphabet = s
      },
      checked: () => settings.splitMailFavoritesIntoAlphabet === true,
      disabled: () => !isAnyFavoriteEnabled(),
      entryType: LSM_ENTRY_TYPE_CHECKBOX,
    },
    {
      label: "Show favorites context menu at editbox (recipient/subject/text)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().mailFavoritesContextMenusAtEditFields = s
        checkIfEditBoxContextMenusNeedAnUpdate()
      },
      checked: () => settings.mailFavoritesContextMenusAtEditFields === true,
      disabled: () => !isAnyFavoriteEnabled(),
      entryType: LSM_ENTRY_TYPE_CHECKBOX,
    },
    { entryType: LSM_ENTRY_TYPE_HEADER, label: "Last used" },
    {
      label: "Show last used context menu at editbox (recipient/subject/text)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().mailLastUsedContextMenusAtEditFields = s
        checkIfEditBoxContextMenusNeedAnUpdate()
      },
      checked: () => settings.mailLastUsedContextMenusAtEditFields === true,
      disabled: () => !isAnyFavoriteEnabled(),
      entryType: LSM_ENTRY_TYPE_CHECKBOX,
    },
    { entryType: LSM_ENTRY_TYPE_HEADER, label: "Profiles" },
    {
      label: "Use mail profiles context menus at editbox (recipient)",
      callback: (_c: unknown, _n: unknown, _i: unknown, s: boolean) => {
        getMailSettings().enableMailProfiles = s
        checkIfEditBoxContextMenusNeedAnUpdate()
      },
      checked: () => settings.enableMailProfiles === true,
      disabled: () => false,
      entryType: LSM_ENTRY_TYPE_CHECKBOX,
    },
  ]
}

interface MailMenuButton extends Control {
  type?: string
  _type?: string
}

const CHAT_OPTIONS_ICONS = {
  normal: "/esoui/art/chatwindow/chat_options_up.dds",
  pressed: "/esoui/art/chatwindow/chat_options_down.dds",
  highlight: "/esoui/art/chatwindow/chat_options_over.dds",
  disabled: "/esoui/art/chatwindow/chat_options_disabled.dds",
}

const DROPBOX_ARROW_ICONS = {
  normal: "/esoui/art/buttons/dropbox_arrow_normal.dds",
  pressed: "/esoui/art/buttons/dropbox_arrow_mousedown.dds",
  highlight: "/esoui/art/buttons/dropbox_arrow_mouseover.dds",
  disabled: "/esoui/art/buttons/dropbox_arrow_disabled.dds",
}

function addMailContextmenuButtons(this: void): undefined {
  const mailInbox = ZO_MailInbox
  const mailSend = ZO_MailSend
  const mailSendTo = mailSend.GetNamedChild("ToLabel")
  const mailSendSubject = mailSend.GetNamedChild("SubjectLabel")
  const mailSendBody = mailSend.GetNamedChild("Body")

  const massBtn: MailMenuButton | undefined = addButton(TOPLEFT, mailInbox, TOPLEFT, -35, -10, {
    buttonName: "FCOCS_MailRecivedMassChangeContextMenu",
    parentControl: mailInbox,
    tooltip: `${addonVars.addonNameMenuDisplay} Mail received mass-change`,
    callback: () => {
      getMailReceivedMassChangeContextMenu()
    },
    width: 32,
    height: 32,
    ...CHAT_OPTIONS_ICONS,
  })
  if (massBtn !== undefined) {
    massBtn.type = "Inbox_MassChange"
    MAIL_CONTEXT_MENU_BUTTONS.Inbox_MassChange = massBtn
  }

  const settingsBtn: MailMenuButton | undefined = addButton(TOPLEFT, mailSend, TOPLEFT, -35, -10, {
    buttonName: "FCOCS_MailSendSettingsContextMenu",
    parentControl: mailSend,
    tooltip: `${addonVars.addonNameMenuDisplay} Mail settings`,
    callback: () => {
      getMailSettingsContextMenu()
    },
    width: 32,
    height: 32,
    ...CHAT_OPTIONS_ICONS,
  })
  if (settingsBtn !== undefined) {
    settingsBtn.type = "settings"
    MAIL_CONTEXT_MENU_BUTTONS.settings = settingsBtn
  }

  addFieldTriangleButton(
    "recipients",
    mailSendTo,
    RIGHT,
    mailSendTo,
    LEFT,
    -10,
    0,
    "FCOCS_MailRecipientsContextMenu",
    "Mail recipients"
  )
  addFieldTriangleButton(
    "subjects",
    mailSendSubject,
    RIGHT,
    mailSendSubject,
    LEFT,
    -10,
    0,
    "FCOCS_MailSubjectsContextMenu",
    "Mail subjects"
  )
  addFieldTriangleButton(
    "texts",
    mailSendBody,
    TOPRIGHT,
    mailSendBody,
    TOPLEFT,
    -10,
    0,
    "FCOCS_MailTextsContextMenu",
    "Mail texts"
  )

  MAIL_CONTEXT_MENUT_BUTTONS_ADDED = true

  updateMailContextMenuButtonContextMenus()
}

function addFieldTriangleButton(
  this: void,
  fieldType: MailFieldType,
  parentControl: Control | undefined,
  anchorPoint: number,
  relativeTo: Control | undefined,
  relativePoint: number,
  offsetX: number,
  offsetY: number,
  buttonName: string,
  tooltip: string
): undefined {
  if (parentControl === undefined) {
    return
  }
  const buttonRaw = addButton(anchorPoint, relativeTo, relativePoint, offsetX, offsetY, {
    buttonName,
    parentControl,
    tooltip,
    callback: () => {
      updateMailContextMenuButtonContextMenus(fieldType)
    },
    width: 20,
    height: 20,
    ...DROPBOX_ARROW_ICONS,
  })
  const button: MailMenuButton | undefined = buttonRaw
  if (button !== undefined) {
    button._type = fieldType
    MAIL_CONTEXT_MENU_BUTTONS[fieldType] = button
    allowedMailContextMenuOwners.set(button, true)
  }
}

export function mailContextMenuSetup(this: void): undefined {
  const settings = getMailSettings()

  const useMailContextMenus = settings.mailContextMenus
  if (useMailContextMenus === true) {
    if (!MAIL_CONTEXT_MENUT_BUTTONS_ADDED) {
      addMailContextmenuButtons()
    }
    updateHiddenStateOfContextMenuButtons(false)
    checkAndEnabledEventHandlersIfNeeded(true)
  } else {
    if (MAIL_CONTEXT_MENUT_BUTTONS_ADDED === true) {
      updateHiddenStateOfContextMenuButtons(true)
    }
    checkAndEnabledEventHandlersIfNeeded(false)
  }

  if (!IS_ON_MAIL_SEND_SUCCESS_HOOKED) {
    ZO_PreHook(MAIL_SEND, "OnMailSendSuccess", () => {
      if (getMailSettings().mailContextMenus !== true) {
        return false
      }
      checkAndSaveMailValuesOfEnabledFields(true)
      return false
    })
    IS_ON_MAIL_SEND_SUCCESS_HOOKED = true
  }

  if (!IS_ON_MAIL_SEND_SUCCESS_POST_HOOKED) {
    SecurePostHook(MAIL_SEND, "OnMailSendSuccess", () => {
      if (getMailSettings().mailContextMenus !== true) {
        return
      }
      afterMailWasSend(false, true)
    })
    IS_ON_MAIL_SEND_SUCCESS_POST_HOOKED = true
  }

  checkIfEditBoxContextMenusNeedAnUpdate()

  updateLowercaseTextTables()
}

function updateHiddenStateOfContextMenuButtons(this: void, doHide: boolean): undefined {
  for (const [, v] of pairs(MAIL_CONTEXT_MENU_BUTTONS)) {
    if (v !== undefined) {
      v.SetHidden(doHide)
    }
  }
}
