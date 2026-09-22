import { safePrint } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-print/quiet-print.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import {
  RAID_COMPLETE,
  RAID_OTHERS,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-strings/quiet-strings.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

interface LeaderboardProviderSelf {
  list: Record<number, unknown>
  Decline: (this: LeaderboardProviderSelf, data: { notificationId: number }) => void
  CreateMessage: (
    this: LeaderboardProviderSelf,
    contentName: string,
    score: number,
    numKnownMembers: number,
    hasFriend: boolean,
    hasGuildMember: boolean
  ) => string
}

export function hookRaidNotifications(this: void): undefined {
  const savedVars = getSavedVariables()

  function buildNotificationListHook(this: void, self: LeaderboardProviderSelf): undefined {
    ZO_ClearNumericallyIndexedTable(self.list)
    if (GetSetting_Bool(SETTING_TYPE_UI, UI_SETTING_SHOW_LEADERBOARD_NOTIFICATIONS)) {
      const buildMessageAndRemoveNotification = function (
        this: void,
        contacts: string[],
        message: string,
        notificationId: number
      ): undefined {
        let membersListShorten = ""
        const nbContacts = contacts.length
        if (nbContacts > 4) {
          const shortOthers = zo_strformat(
            RAID_OTHERS,
            ZO_SELECTED_TEXT.Colorize(tostring(nbContacts - 2))
          )
          membersListShorten = zo_strformat(
            " (<<1>>, <<2>> <<3>>)",
            ZO_SELECTED_TEXT.Colorize(contacts[0] ?? ""),
            ZO_SELECTED_TEXT.Colorize(contacts[1] ?? ""),
            shortOthers
          )
        } else {
          let myContacts = ""
          for (const contactName of contacts) {
            myContacts = myContacts + ZO_SELECTED_TEXT.Colorize(contactName) + ", "
          }
          membersListShorten = zo_strformat(" (<<1>>)", string.sub(myContacts, 1, -3))
        }
        const [finalMessage] = string.gsub(
          message,
          RAID_COMPLETE,
          zo_strformat("<<1>><<2>> ", membersListShorten, RAID_COMPLETE)
        )
        safePrint(finalMessage)
        RemoveLeaderboardScoreNotification(notificationId)
      }

      if (savedVars.raid === 0 && savedVars.raidToChat) {
        let notificationId = GetNextLeaderboardScoreNotificationId(undefined)
        while (notificationId !== undefined) {
          const [contentType, contentId, , score, , numMembers] =
            GetLeaderboardScoreNotificationInfo(notificationId)
          let numKnownMembers = 0
          let hasFriend = false
          let hasGuildMember = false
          let hasPlayer = false
          const contacts: string[] = []

          for (let memberIndex = 1; memberIndex <= numMembers; memberIndex++) {
            const [displayName, , isFriend, isGuildMember, isPlayer] =
              GetLeaderboardScoreNotificationMemberInfo(notificationId, memberIndex)
            hasFriend = hasFriend || isFriend
            hasGuildMember = hasGuildMember || isGuildMember
            hasPlayer = hasPlayer || isPlayer

            if (hasPlayer) {
              break
            } else if (isFriend || isGuildMember) {
              contacts.push(displayName)
              numKnownMembers = numKnownMembers + 1
            }
          }

          if (hasPlayer) {
            self.Decline({ notificationId: notificationId })
          } else if (hasFriend || hasGuildMember) {
            if (contentType === LEADERBOARD_SCORE_NOTIFICATION_TYPE_RAID) {
              const contentName = GetRaidName(contentId)
              const message = self.CreateMessage(
                contentName,
                score,
                numKnownMembers,
                hasFriend,
                hasGuildMember
              )
              buildMessageAndRemoveNotification(contacts, message, notificationId)
            } else if (savedVars.endless) {
              const contentName = GetString(SI_ENDLESS_DUNGEON_LEADERBOARDS_CATEGORIES_HEADER)
              const message = self.CreateMessage(
                contentName,
                score,
                numKnownMembers,
                hasFriend,
                hasGuildMember
              )
              buildMessageAndRemoveNotification(contacts, message, notificationId)
            } else {
              RemoveLeaderboardScoreNotification(notificationId)
            }
          }
          notificationId = GetNextLeaderboardScoreNotificationId(notificationId)
        }
      } else if (savedVars.raid === 1) {
        let notificationId = GetNextLeaderboardScoreNotificationId(undefined)
        while (notificationId !== undefined) {
          RemoveLeaderboardScoreNotification(notificationId)
          notificationId = GetNextLeaderboardScoreNotificationId(notificationId)
        }
      }
    }
  }
  ZO_PreHook(ZO_LeaderboardScoreProvider, "BuildNotificationList", buildNotificationListHook)
}
