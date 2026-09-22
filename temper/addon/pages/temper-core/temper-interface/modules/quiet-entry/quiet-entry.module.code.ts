import {
  alertTextThrottling,
  bossAlertTextsHook,
  craftingResultAlertsHook,
  hookPlaySound,
  repairAlertsHook,
  screenshotAlertHook,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-alerts/quiet-alerts.module.code.ts"
import {
  dontShowLoreDiscoveries,
  dontShowSkillProgression,
  enlightenedAlertHook,
  hookAvAMessages,
  hookGroupZoneMessages,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-announcements/quiet-announcements.module.code.ts"
import {
  disableChatMinimize,
  dontRotateGameCamera,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-camera/quiet-camera.module.code.ts"
import { hookCraftBagNotifications } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-craft-bag/quiet-craft-bag.module.code.ts"
import {
  deleteEmptyMailHook,
  hookBindAlerts,
  hookDisbandDialog,
  hookFenceDialog,
  hookImproveDialog,
  hookLargeGroupDialog,
  hookMarketAnnouncement,
  noPortToLeader,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-dialogs/quiet-dialogs.module.code.ts"
import { hookGuildNewApplicationsNotifications } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-guild-applications/quiet-guild-applications.module.code.ts"
import {
  hookGuildInvitesNotifications,
  hookPlayerToPlayerGuildInvite,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-guild-invites/quiet-guild-invites.module.code.ts"
import { hookMotDNotifications } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-guild-motd/quiet-guild-motd.module.code.ts"
import { guildRosterAlertsHook } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-guild-roster/quiet-guild-roster.module.code.ts"
import { handleLuaErrorEvent } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-lua-errors/quiet-lua-errors.module.code.ts"
import { removePinsFromMaps } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-map-pins/quiet-map-pins.module.code.ts"
import { hookRaidNotifications } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-raid-leaderboard/quiet-raid-leaderboard.module.code.ts"
import {
  disableChatAutoComplete,
  dontInterruptHarvesting,
  dontReadBooks,
  hookFriendsMessages,
  hookReportItemFromInventory,
  hookReticleTake,
  noGuildLeave,
  noGuildLeavePreHook,
  noUniversalStones,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-world/quiet-world.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-camera-keybind/quiet-camera-keybind.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { buildSettingsMenu } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-menu/quiet-settings-menu.module.code.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

export function initNoThankYou(this: void): undefined {
  initializeSavedVariables()

  hookAvAMessages()
  hookGroupZoneMessages()
  hookFriendsMessages()
  bossAlertTextsHook()
  screenshotAlertHook()
  enlightenedAlertHook()
  guildRosterAlertsHook()
  craftingResultAlertsHook()
  repairAlertsHook()
  alertTextThrottling()
  deleteEmptyMailHook()
  hookRaidNotifications()
  hookMotDNotifications()
  hookCraftBagNotifications()
  hookReticleTake()
  hookGuildInvitesNotifications()
  handleLuaErrorEvent()
  dontInterruptHarvesting()
  dontRotateGameCamera()
  hookFenceDialog()
  hookPlaySound()
  hookDisbandDialog()
  hookLargeGroupDialog()
  hookImproveDialog()
  hookMarketAnnouncement()
  hookPlayerToPlayerGuildInvite()
  dontReadBooks()
  dontShowLoreDiscoveries()
  dontShowSkillProgression()
  noUniversalStones()
  noGuildLeave()
  noGuildLeavePreHook()
  hookReportItemFromInventory()
  removePinsFromMaps()
  disableChatAutoComplete()
  disableChatMinimize()
  hookBindAlerts()
  noPortToLeader()
  hookGuildNewApplicationsNotifications()

  buildSettingsMenu()

  NOTIFICATIONS?.RefreshNotificationList()
}
