import {
  checkIfEditBoxContextMenusNeedAnUpdate,
  updateMailContextMenuButtonContextMenus,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-context-menu/tweak-mail-context-menu.module.code.ts"
import {
  allowedMailContextMenuOwners,
  getMailSettings,
  MAIL_CONTEXT_MENU_BUTTONS,
  type MailFieldType,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-data/tweak-mail-data.module.code.ts"
import {
  afterMailWasSend,
  checkAndEnabledEventHandlersIfNeeded,
  checkAndSaveMailValuesOfEnabledFields,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-events/tweak-mail-events.module.code.ts"
import { getMailReceivedMassChangeContextMenu } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-mass-delete/tweak-mail-mass-delete.module.code.ts"
import { getMailSettingsContextMenu } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-settings-menu/tweak-mail-settings-menu.module.code.ts"
import { updateLowercaseTextTables } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-mail-store/tweak-mail-store.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-state/tweak-state.module.code.ts"
import { addButton } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-utils/tweak-utils.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-inventory-containers/eso-inventory-containers.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const addonVars = STATE.addonVars

let MAIL_CONTEXT_MENUT_BUTTONS_ADDED = false
let IS_ON_MAIL_SEND_SUCCESS_HOOKED = false
let IS_ON_MAIL_SEND_SUCCESS_POST_HOOKED = false

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
