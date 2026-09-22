import { getSavedVariables } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import "akasha/temper/addon/type/temper-notification-global/temper-notification-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-3/eso-api-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

interface GuildInviteProviderSelf {
  list: Record<number, unknown>
  CreateMessage: (
    this: GuildInviteProviderSelf,
    guildAlliance: number,
    guildName: string,
    formattedInviterName: string
  ) => string
}

export function hookGuildInvitesNotifications(this: void): undefined {
  const savedVars = getSavedVariables()
  function buildNotificationListHook(this: void, self: GuildInviteProviderSelf): boolean {
    ZO_ClearNumericallyIndexedTable(self.list)
    if (
      savedVars.guildInvites === 0 ||
      (savedVars.guildInvites === 2 && GetNumGuilds() < MAX_GUILDS)
    ) {
      for (let i = 1; i <= GetNumGuildInvites(); i++) {
        const [guildId, guildName, guildAlliance, inviterDisplayName, note] = GetGuildInviteInfo(i)
        const secsSinceRequest = 0
        const formattedInviterName = ZO_FormatUserFacingDisplayName(inviterDisplayName)
        const message = self.CreateMessage(guildAlliance, guildName, formattedInviterName)
        self.list[i] = {
          dataType: NOTIFICATIONS_REQUEST_DATA,
          guildId: guildId,
          guildAlliance: guildAlliance,
          guildName: guildName,
          displayName: inviterDisplayName,
          notificationType: NOTIFICATION_TYPE_GUILD,
          secsSinceRequest: ZO_NormalizeSecondsSince(secsSinceRequest),
          note: note,
          message: message,
          shortDisplayText: formattedInviterName,
          controlsOwnSounds: true,
        }
      }
    }
    return true
  }
  ZO_PreHook(ZO_GuildInviteProvider, "BuildNotificationList", buildNotificationListHook)
}

export function hookPlayerToPlayerGuildInvite(this: void): undefined {
  const savedVars = getSavedVariables()
  const interactTypeGuildInvite = 7

  PLAYER_TO_PLAYER.control.UnregisterForEvent(EVENT_GUILD_INVITE_ADDED)
  PLAYER_TO_PLAYER.control.RegisterForEvent(
    EVENT_GUILD_INVITE_ADDED,
    function (
      this: void,
      _eventCode: number,
      guildId: number,
      guildName: string,
      guildAlliance: number,
      inviterName: string
    ): undefined {
      if (
        savedVars.guildInvites === 0 ||
        (savedVars.guildInvites === 2 && GetNumGuilds() < MAX_GUILDS)
      ) {
        let allianceIconSize = 24
        if (IsInGamepadPreferredMode()) {
          allianceIconSize = 36
        }

        const formattedInviterName = ZO_FormatUserFacingDisplayName(inviterName)
        const guildNameAlliance = zo_iconTextFormat(
          GetAllianceBannerIcon(guildAlliance),
          allianceIconSize,
          allianceIconSize,
          ZO_SELECTED_TEXT.Colorize(guildName)
        )
        const data = PLAYER_TO_PLAYER.AddPromptToIncomingQueue(
          interactTypeGuildInvite,
          undefined,
          formattedInviterName,
          zo_strformat(
            SI_PLAYER_TO_PLAYER_INCOMING_GUILD_REQUEST,
            ZO_SELECTED_TEXT.Colorize(formattedInviterName),
            guildNameAlliance
          ),
          function (this: void): undefined {
            AcceptGuildInvite(guildId)
          },
          function (this: void): undefined {
            RejectGuildInvite(guildId)
          },
          function (this: void): undefined {
            PLAYER_TO_PLAYER.RemoveFromIncomingQueue(interactTypeGuildInvite, formattedInviterName)
          }
        )
        data.guildId = guildId
      }
    }
  )
}
