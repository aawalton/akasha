import { safePrint } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-print/quiet-print.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

interface GuildRosterData {
  index: number
}
interface GuildRosterManagerSelf {
  guildName: string
  RefreshData: (this: GuildRosterManagerSelf) => void
  FindDataByDisplayName: (
    this: GuildRosterManagerSelf,
    displayName: string
  ) => GuildRosterData | undefined
}

export function guildRosterAlertsHook(this: void): undefined {
  const savedVars = getSavedVariables()

  function getGuildIndex(this: void, guildId: number): number {
    for (let index = 1; index <= GetNumGuilds(); index++) {
      if (GetGuildId(index) === guildId) {
        return index
      }
    }
    return 0
  }

  function onGuildMemberAddedHook(
    this: void,
    self: GuildRosterManagerSelf,
    guildId: number,
    displayName: string
  ): boolean | undefined {
    if (savedVars.guildAlerts === 1) {
      const index = getGuildIndex(guildId)
      if (savedVars.guildAlertsGuilds[index] === true) {
        self.RefreshData()
        if (DoesPlayerHaveGuildPermission(guildId, GUILD_PERMISSION_INVITE)) {
          const data = self.FindDataByDisplayName(displayName)
          if (data !== undefined) {
            const [, rawCharacterName] = GetGuildMemberCharacterInfo(guildId, data.index)
            safePrint(zo_strformat(SI_GUILD_ROSTER_ADDED, rawCharacterName, self.guildName))
          }
        }
        return true
      }
    } else if (savedVars.guildAlerts === 2) {
      const index = getGuildIndex(guildId)
      if (savedVars.guildAlertsGuilds[index] === true) {
        self.RefreshData()
        return true
      }
    }
    return undefined
  }
  ZO_PreHook(ZO_GuildRosterManager ?? GUILD_ROSTER, "OnGuildMemberAdded", onGuildMemberAddedHook)

  function onGuildMemberRemovedHook(
    this: void,
    self: GuildRosterManagerSelf,
    guildId: number,
    rawCharacterName: string
  ): boolean | undefined {
    if (savedVars.guildAlerts === 1) {
      const index = getGuildIndex(guildId)
      if (savedVars.guildAlertsGuilds[index] === true) {
        if (DoesPlayerHaveGuildPermission(guildId, GUILD_PERMISSION_INVITE)) {
          safePrint(zo_strformat(SI_GUILD_ROSTER_REMOVED, rawCharacterName, self.guildName))
        }
        self.RefreshData()
        return true
      }
    } else if (savedVars.guildAlerts === 2) {
      const index = getGuildIndex(guildId)
      if (savedVars.guildAlertsGuilds[index] === true) {
        self.RefreshData()
        return true
      }
    }
    return undefined
  }
  ZO_PreHook(
    ZO_GuildRosterManager ?? GUILD_ROSTER,
    "OnGuildMemberRemoved",
    onGuildMemberRemovedHook
  )
}
