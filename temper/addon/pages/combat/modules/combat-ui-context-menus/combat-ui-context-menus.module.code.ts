import "akasha/temper/addon/pages/combat/modules/combat-ui-settings-menu/combat-ui-settings-menu.module.code.ts"

import {
  donateGold,
  gotoDiscord,
  gotoEsoui,
  gotoEsouiDonation,
  gotoGithub,
  sendIngameMail,
} from "akasha/temper/addon/pages/combat/modules/combat-menu-feedback/combat-menu-feedback.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import type { BuffRowControl } from "akasha/temper/addon/pages/combat/modules/combat-ui-buff-panel/combat-ui-buff-panel.module.code.ts"
import {
  POSTTOCHAT_MODE_SELECTED_UNIT,
  POSTTOCHAT_MODE_SELECTED_UNITNAME,
  POSTTOCHAT_MODE_SELECTION,
  POSTTOCHAT_MODE_SELECTION_HEALING,
  postBuffUptime as postBuffUptimeToChat,
  postToChat,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-chat-report/combat-ui-chat-report.module.code.ts"
import type { SelectionRowControl } from "akasha/temper/addon/pages/combat/modules/combat-ui-selection/combat-ui-selection.module.code.ts"
import {
  getCurrentFight,
  getFightData,
  getSelections,
  UNCOLLAPSED_BUFFS,
  type UpdatableControl,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-state/combat-ui-state.module.code.ts"
import { updateReport } from "akasha/temper/addon/pages/combat/modules/combat-ui-window/combat-ui-window.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-public-api-declarations/combat-public-api-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-public-api/combat-public-api.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-string-ids-menus/combat-string-ids-menus.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-ui-state-declarations/combat-ui-state-declarations.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-custom-menu-global/temper-custom-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

let FAVS: Record<string, boolean | undefined> = {}
let buffname: string | undefined
let unitType: string | undefined

function addFavouriteBuff(this: void): undefined {
  if (buffname != null) {
    FAVS[buffname] = true
  }
  updateReport()
  return undefined
}

function removeFavouriteBuff(this: void): undefined {
  if (buffname != null) {
    FAVS[buffname] = undefined
  }
  updateReport()
  return undefined
}

function postBuffUptime(this: void): undefined {
  if (buffname != null) {
    postBuffUptimeToChat(getCurrentFight(), buffname)
  }
  return undefined
}

function postSelectionBuffUptime(this: void): undefined {
  if (buffname != null) {
    postBuffUptimeToChat(getCurrentFight(), buffname, unitType)
  }
  return undefined
}

function toggleCollapseBuff(this: void): undefined {
  if (buffname != null) {
    if (UNCOLLAPSED_BUFFS[buffname] === true) {
      UNCOLLAPSED_BUFFS[buffname] = undefined
    } else {
      UNCOLLAPSED_BUFFS[buffname] = true
    }
  }

  const buffList =
    TemperCombat_Report.GetNamedChild("_RightPanel")?.GetNamedChild<UpdatableControl>("BuffList")
  buffList?.Update?.(buffList)
  return undefined
}

function buffContextMenu(this: void, bufflistitem: BuffRowControl, upInside: boolean): undefined {
  if (!upInside) {
    return undefined
  }

  const dataId = bufflistitem.dataId
  if (typeof dataId !== "string") {
    return undefined
  }
  buffname = dataId
  const db = getDb()
  FAVS = db.FightReport.FavouriteBuffs

  let func: (this: void) => undefined
  let text: string

  if (FAVS[buffname] === undefined) {
    func = addFavouriteBuff
    text = GetString(SI_TEMPER_COMBAT_FAVOURITE_ADD)
  } else {
    func = removeFavouriteBuff
    text = GetString(SI_TEMPER_COMBAT_FAVOURITE_REMOVE)
  }

  ClearMenu()
  AddCustomMenuItem(text, func)

  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTBUFF), postBuffUptime)

  const category = db.FightReport.category

  if (
    (category === "damageOut" || category === "damageIn") &&
    db.FightReport.rightpanel === "buffsout"
  ) {
    unitType = "boss"
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTBUFF_BOSS), postSelectionBuffUptime)
  } else if (
    (category === "healingOut" || category === "healingIn") &&
    db.FightReport.rightpanel === "buffsout"
  ) {
    unitType = "group"
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTBUFF_GROUP), postSelectionBuffUptime)
  }

  if (bufflistitem.hasDetails === true) {
    const stringId =
      UNCOLLAPSED_BUFFS[buffname] === true ? SI_TEMPER_COMBAT_COLLAPSE : SI_TEMPER_COMBAT_UNCOLLAPSE

    AddCustomMenuItem(GetString(stringId), toggleCollapseBuff)
  }

  ShowMenu(bufflistitem)
  return undefined
}

let unitContextMenuUnitId: number | undefined

function postUnitDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTED_UNIT, getCurrentFight(), unitContextMenuUnitId)
  return undefined
}

function postUnitNameDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTED_UNITNAME, getCurrentFight(), unitContextMenuUnitId)
  return undefined
}

function postSelectionDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTION, getCurrentFight())
  return undefined
}

function postSelectionHPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTION_HEALING, getCurrentFight())
  return undefined
}

function unitContextMenu(this: void, unitItem: SelectionRowControl, upInside: boolean): undefined {
  const db = getDb()
  const category = db.FightReport.category

  if (!(upInside || category === "damageOut" || category === "healingOut")) {
    return undefined
  }

  const dataId = unitItem.dataId

  ClearMenu()

  if (category === "damageOut") {
    unitContextMenuUnitId = typeof dataId === "number" ? dataId : undefined

    const unit =
      unitContextMenuUnitId != null ? getFightData()?.units[unitContextMenuUnitId] : undefined
    if (unit == null) {
      return undefined
    }
    const unitName: string = unit.name

    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTUNITDPS), postUnitDPS)
    AddCustomMenuItem(
      zo_strformat(GetString(SI_TEMPER_COMBAT_POSTUNITNAMEDPS), unitName, 2),
      postUnitNameDPS
    )

    if (getSelections().unit[category] != null) {
      AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTSELECTIONDPS), postSelectionDPS)
    }
  } else if (category === "healingOut" && getSelections().unit[category] != null) {
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTSELECTIONHPS), postSelectionHPS)
  }

  ShowMenu(unitItem)
  return undefined
}

const SOLINUR_GUILD_ID = 64745

function showGuildInfo(this: void): undefined {
  GUILD_BROWSER_GUILD_INFO_KEYBOARD.SetGuildToShow(SOLINUR_GUILD_ID)
  MAIN_MENU_KEYBOARD.ShowSceneGroup("guildsSceneGroup", "linkGuildInfoKeyboard")
  GUILD_BROWSER_GUILD_INFO_KEYBOARD.closeCallback = TemperCombat_Report.Toggle
  return undefined
}

function notificationRead(this: void): undefined {
  const db = getDb()
  db.NotificationRead = db.currentNotificationVersion
  updateReport(getCurrentFight())
  return undefined
}

function disableNotifications(this: void): undefined {
  const db = getDb()
  db.NotificationRead = db.currentNotificationVersion
  db.NotificationAllowed = false
  updateReport(getCurrentFight())
  return undefined
}

function notificationContextMenu(this: void, button: Control, upInside: boolean): undefined {
  if (!upInside) {
    return undefined
  }

  ClearMenu()

  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_NOTIFICATION_GUILD), showGuildInfo)
  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_NOTIFICATION_ACCEPT), notificationRead)
  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_NOTIFICATION_DISCARD), disableNotifications)

  ShowMenu(button)
  AnchorMenu(button)
  return undefined
}

function donateDialog(this: void): Control | undefined {
  return TemperCombat_Report.GetNamedChild("_DonateDialog")
}

function closeDonateDialog(this: void): undefined {
  donateDialog()?.SetHidden(true)
  return undefined
}

function donateCrowns(this: void): undefined {
  const dialog = donateDialog()
  if (dialog === undefined) {
    return undefined
  }
  const editbox = dialog.GetNamedChild("AccountInfo")?.GetNamedChild<EditControl>("EditBox")

  dialog.SetHidden(false)

  dialog.GetNamedChild("Button")?.SetHandler("OnClicked", closeDonateDialog, "TemperCombat")
  editbox?.SetText("@Solinur")
  editbox?.TakeFocus()
  editbox?.SelectAll()
  return undefined
}

function feedbackContextMenu(this: void, button: Control, upInside: boolean): undefined {
  if (!upInside) {
    return undefined
  }

  ClearMenu()

  const isEUServer = GetWorldName() === "EU Megaserver"
  const euOnly = (label: string): string =>
    isEUServer ? label : ZO_CachedStrFormat(SI_TEMPER_COMBAT_FEEDBACK_EUONLY_FORMAT, label)

  const feedbackSubItems: TemperCustomMenuEntry[] = [
    {
      label: euOnly(GetString(SI_TEMPER_COMBAT_FEEDBACK_MAIL)),
      callback: sendIngameMail,
      disabled: !isEUServer,
    },
    { label: GetString(SI_TEMPER_COMBAT_FEEDBACK_ESOUI), callback: gotoEsoui },
    { label: GetString(SI_TEMPER_COMBAT_FEEDBACK_GITHUB), callback: gotoGithub },
    { label: GetString(SI_TEMPER_COMBAT_FEEDBACK_DISCORD), callback: gotoDiscord },
  ]

  const donationSubItems: TemperCustomMenuEntry[] = [
    {
      label: euOnly(GetString(SI_TEMPER_COMBAT_DONATE_GOLD)),
      callback: donateGold,
      disabled: !isEUServer,
    },
    {
      label: euOnly(GetString(SI_TEMPER_COMBAT_DONATE_CROWNS)),
      callback: donateCrowns,
      disabled: !isEUServer,
    },
    { label: GetString(SI_TEMPER_COMBAT_DONATE_ESOUI), callback: gotoEsouiDonation },
  ]

  const itemYPad = 2
  AddCustomSubMenuItem(
    GetString(SI_TEMPER_COMBAT_FEEDBACK_SEND),
    feedbackSubItems,
    undefined,
    undefined,
    undefined,
    itemYPad
  )
  AddCustomSubMenuItem(
    GetString(SI_TEMPER_COMBAT_DONATE),
    donationSubItems,
    undefined,
    undefined,
    undefined,
    itemYPad
  )

  ShowMenu(button)
  AnchorMenu(button)
  return undefined
}

TemperCombat.BuffContextMenu = buffContextMenu
TemperCombat.UnitContextMenu = unitContextMenu
TemperCombat.NotificationContextMenu = notificationContextMenu
TemperCombat.FeedbackContextMenu = feedbackContextMenu
