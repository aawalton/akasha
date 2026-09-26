import { ADDON_VERSION } from "akasha/temper/addon/pages/combat/modules/combat-constants/combat-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-string-ids-menus/combat-string-ids-menus.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-custom-menu-global/temper-custom-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-mail/eso-mail.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

let sendGold: number | undefined

function prefillMail(this: void): undefined {
  const isDonation = sendGold !== undefined && sendGold > 0
  const headerString = GetString(
    isDonation ? SI_TEMPER_COMBAT_DONATE_GOLD_HEADER : SI_TEMPER_COMBAT_FEEDBACK_MAIL_HEADER
  )

  ZO_MailSendToField.SetText("@Solinur")
  ZO_MailSendSubjectField.SetText(string.format(headerString, ADDON_VERSION))
  ZO_MailSendBodyField.TakeFocus()

  if (sendGold !== undefined && sendGold > 0) {
    QueueMoneyAttachment(sendGold)
    ZO_MailSendSendCurrency.OnBeginInput()
  } else {
    ZO_MailSendBodyField.TakeFocus()
  }
  return undefined
}

function sendIngameMail(this: void): undefined {
  sendGold = 0
  SCENE_MANAGER.Show("mailSend")
  zo_callLater(prefillMail, 250)
  return undefined
}

function gotoEsoui(this: void): undefined {
  RequestOpenUnsafeURL(GetString(SI_TEMPER_COMBAT_FEEDBACK_ESOUIURL))
  return undefined
}

function gotoGithub(this: void): undefined {
  RequestOpenUnsafeURL(GetString(SI_TEMPER_COMBAT_FEEDBACK_GITHUBURL))
  return undefined
}

function gotoDiscord(this: void): undefined {
  RequestOpenUnsafeURL(GetString(SI_TEMPER_COMBAT_FEEDBACK_DISCORDURL))
  return undefined
}

function donateGold(this: void): undefined {
  sendGold = 5000
  SCENE_MANAGER.Show("mailSend")
  zo_callLater(prefillMail, 200)
  return undefined
}

function gotoEsouiDonation(this: void): undefined {
  RequestOpenUnsafeURL(GetString(SI_TEMPER_COMBAT_DONATE_ESOUIURL))
  return undefined
}

export function feedbackContextMenu(this: void): undefined {
  ClearMenu()

  const isEUServer = GetWorldName() === "EU Megaserver"

  if (isEUServer) {
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_FEEDBACK_MAIL), sendIngameMail)
  }

  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_FEEDBACK_ESOUI), gotoEsoui)
  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_FEEDBACK_GITHUB), gotoGithub)
  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_FEEDBACK_DISCORD), gotoDiscord)

  ShowMenu()
  return undefined
}

export function donationContextMenu(this: void): undefined {
  ClearMenu()

  const isEUServer = GetWorldName() === "EU Megaserver"

  if (isEUServer) {
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_DONATE_GOLD), donateGold)
  }

  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_DONATE_ESOUI), gotoEsouiDonation)

  ShowMenu()
  return undefined
}
