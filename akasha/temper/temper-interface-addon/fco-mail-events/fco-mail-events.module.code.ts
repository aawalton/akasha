import { checkIfEditBoxContextMenusNeedAnUpdate } from "../fco-mail-context-menu/fco-mail-context-menu.module.code.ts"
import {
  getMailSettings,
  isMailFieldType,
  MAIL_SEND_EDIT_FIELDS,
  type MailFieldType,
  UNIQUE_SAVE_MAIL_VALUES_UPDATER_NAME,
} from "../fco-mail-data/fco-mail-data.module.code.ts"
import {
  addToFavorites,
  loadLastUsedValue,
  saveAsLastUsedList,
  saveLastUsedValue,
  saveMailValue,
  updateLowercaseTextTables,
} from "../fco-mail-store/fco-mail-store.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"
import { throttledUpdate } from "../fco-utils/fco-utils.module.code.ts"

const addonName = STATE.addonVars.addonName
const addonPrefix = `[${addonName}]`

export function afterMailWasSend(this: void, doSaveLast: boolean, doLoadLast: boolean): undefined {
  if (!doSaveLast && !doLoadLast) {
    return
  }
  const settings = getMailSettings()
  const autoLoadMailFields = settings.autoLoadMailFields
  const autoLoadMailWasSendSettings = settings.autoLoadMailFieldsAt.mailWasSend
  for (const [fieldType, isEnabled] of pairs(autoLoadMailFields)) {
    if (isEnabled === true && isMailFieldType(fieldType)) {
      if (doSaveLast === true) {
        saveLastUsedValue(fieldType)
      } else if (doLoadLast === true) {
        if (autoLoadMailWasSendSettings[fieldType] === true) {
          loadLastUsedValue(fieldType)
        }
      }
    }
  }
}

export function checkAndSaveMailValuesOfEnabledFields(
  this: void,
  wasSuccess?: boolean,
  sendMailResult?: number
): undefined {
  const success = wasSuccess ?? false
  const settings = getMailSettings()

  if (success === true) {
    afterMailWasSend(true, false)

    for (const [fieldType] of pairs(MAIL_SEND_EDIT_FIELDS)) {
      if (isMailFieldType(fieldType)) {
        saveAsLastUsedList(fieldType, undefined)
      }
    }
  }

  const saveMailFields = settings.saveMailFields
  for (const [fieldType, isEnabled] of pairs(saveMailFields)) {
    if (isEnabled === true) {
      if (
        sendMailResult !== undefined &&
        fieldType === "recipient" &&
        sendMailResult === MAIL_SEND_RESULT_FAIL_INVALID_NAME
      ) {
      } else if (isMailFieldType(fieldType)) {
        saveMailValue(fieldType, false, true)
      }
    }
  }
}

export function checkAndLoadMailValuesOfEnabledFields(this: void): undefined {
  const settings = getMailSettings()
  const autoLoadMailFields = settings.autoLoadMailFields
  const openMailFields = settings.autoLoadMailFieldsAt.mailOpen
  for (const [fieldType, isEnabled] of pairs(openMailFields)) {
    if (
      isEnabled === true &&
      isMailFieldType(fieldType) &&
      autoLoadMailFields[fieldType] === true
    ) {
      loadLastUsedValue(fieldType)
    }
  }
}

function onEventMailSendFailed(this: void, _eventId: number, sendMailResult: number): undefined {
  throttledUpdate(UNIQUE_SAVE_MAIL_VALUES_UPDATER_NAME, 50, () =>
    checkAndSaveMailValuesOfEnabledFields(false, sendMailResult)
  )
}

function onEventMailCloseMailbox(this: void, _eventId: number): undefined {
  throttledUpdate(UNIQUE_SAVE_MAIL_VALUES_UPDATER_NAME, 50, () =>
    checkAndSaveMailValuesOfEnabledFields(false)
  )
}

function onEventMailOpenMailbox(this: void, _eventId: number): undefined {
  checkIfEditBoxContextMenusNeedAnUpdate()
  updateLowercaseTextTables()
  throttledUpdate(UNIQUE_SAVE_MAIL_VALUES_UPDATER_NAME, 50, () =>
    checkAndLoadMailValuesOfEnabledFields()
  )
}

function eventCallBackFuncHandler(this: void, eventId: number, arg1: number): undefined {
  if (eventId === EVENT_MAIL_SEND_FAILED) {
    onEventMailSendFailed(eventId, arg1)
  } else if (eventId === EVENT_MAIL_CLOSE_MAILBOX) {
    onEventMailCloseMailbox(eventId)
  } else if (eventId === EVENT_MAIL_OPEN_MAILBOX) {
    onEventMailOpenMailbox(eventId)
  }
}

function setMailEventHandlers(this: void, eventType: number, doEnable?: boolean): boolean {
  const enable = doEnable ?? false
  if (
    eventType === EVENT_MAIL_SEND_SUCCESS ||
    eventType === EVENT_MAIL_SEND_FAILED ||
    eventType === EVENT_MAIL_CLOSE_MAILBOX
  ) {
    EVENT_MANAGER.UnregisterForEvent(`${addonName}-MAIL_SEND-${tostring(eventType)}`, eventType)
    if (enable === true) {
      const saveMailFields = getMailSettings().saveMailFields
      for (const [, v] of pairs(saveMailFields)) {
        if (v === true) {
          EVENT_MANAGER.RegisterForEvent<[number]>(
            `${addonName}-MAIL_SEND-${tostring(eventType)}`,
            eventType,
            (eventId, arg1) => eventCallBackFuncHandler(eventId, arg1)
          )
          return true
        }
      }
    } else {
      return true
    }
  } else if (eventType === EVENT_MAIL_OPEN_MAILBOX) {
    EVENT_MANAGER.UnregisterForEvent(`${addonName}-MAIL_OPEN-${tostring(eventType)}`, eventType)
    if (enable === true) {
      const autoLoadOnOpenMailFields = getMailSettings().autoLoadMailFieldsAt.mailOpen
      for (const [, v] of pairs(autoLoadOnOpenMailFields)) {
        if (v === true) {
          EVENT_MANAGER.RegisterForEvent<[number]>(
            `${addonName}-MAIL_OPEN-${tostring(eventType)}`,
            eventType,
            (eventId, arg1) => eventCallBackFuncHandler(eventId, arg1)
          )
          return true
        }
      }
    } else {
      return true
    }
  }
  return false
}

export function checkAndEnabledEventHandlersIfNeeded(this: void, doEnable?: boolean): undefined {
  const enable = doEnable ?? false
  setMailEventHandlers(EVENT_MAIL_SEND_FAILED, enable)
  setMailEventHandlers(EVENT_MAIL_CLOSE_MAILBOX, enable)
  setMailEventHandlers(EVENT_MAIL_OPEN_MAILBOX, enable)
}

export function loadMailBuddyData(
  this: void,
  fieldType: MailFieldType,
  asFavorite?: boolean
): undefined {
  void asFavorite
  if (MailBuddy === undefined || MailBuddy_SavedVars === undefined) {
    return
  }
  const fieldTypeStr: string = fieldType
  if (fieldType === undefined || fieldTypeStr === "") {
    return
  }

  const mbSettings = MailBuddy.settingsVars.settings
  if (mbSettings === undefined) {
    return
  }

  if (fieldType === "recipients") {
    const mbRecipients = mbSettings.SetRecipient
    if (mbRecipients === undefined || mbRecipients.length <= 0) {
      return
    }
    for (const [, recipient] of ipairs(mbRecipients)) {
      if (type(recipient) === "string" && recipient !== "") {
        if (addToFavorites(fieldType, recipient) === true) {
          d(`${addonPrefix}'MailBuddy' recipient added: ${tostring(recipient)}`)
        }
      }
    }
  } else if (fieldType === "subjects") {
    const mbFixedSubjects = ["RTS", "RETURN", "BOUNCE"]
    for (const [, subject] of ipairs(mbFixedSubjects)) {
      if (type(subject) === "string" && subject !== "") {
        if (addToFavorites(fieldType, subject) === true) {
          d(`${addonPrefix}'MailBuddy' fixed subject added: ${tostring(subject)}`)
        }
      }
    }
    const mbSubjects = mbSettings.SetSubject
    if (mbSubjects === undefined || mbSubjects.length <= 0) {
      return
    }
    for (const [, subject] of ipairs(mbSubjects)) {
      if (type(subject) === "string" && subject !== "") {
        if (addToFavorites(fieldType, subject) === true) {
          d(`${addonPrefix}'MailBuddy' subject added: ${tostring(subject)}`)
        }
      }
    }
  } else if (fieldType === "texts") {
  }
}
