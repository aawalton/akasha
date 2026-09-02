import { safePrint } from "../quiet-print/quiet-print.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"

interface MotDProviderSelf {
  sv?: Record<string, string | undefined>
  list: Record<number, unknown>
}

export function hookMotDNotifications(this: void): undefined {
  const savedVars = getSavedVariables()
  function buildNotificationListHook(this: void, self: MotDProviderSelf): boolean | undefined {
    if (self.sv !== undefined) {
      if (savedVars.motd === 1) {
        ZO_ClearNumericallyIndexedTable(self.list)
        for (let i = 1; i <= GetNumGuilds(); i++) {
          const guildId = GetGuildId(i)
          const guildName = GetGuildName(guildId)
          const savedMotD = self.sv[guildName]
          const currentMotD = GetGuildMotD(guildId)
          if (savedMotD !== currentMotD) {
            const guildAlliance = GetGuildAlliance(guildId)
            const allianceIcon = zo_iconFormat(GetAllianceBannerIcon(guildAlliance), 24, 24)
            const message = zo_strformat(
              "<<X:1>> |cFFFFFF<<2>>|r\n<<3>>",
              allianceIcon,
              guildName,
              currentMotD
            )
            safePrint(message)
          }
          self.sv[guildName] = currentMotD
        }
        return true
      } else if (savedVars.motd === 2) {
        ZO_ClearNumericallyIndexedTable(self.list)
        for (let i = 1; i <= GetNumGuilds(); i++) {
          const guildId = GetGuildId(i)
          const guildName = GetGuildName(guildId)
          self.sv[guildName] = GetGuildMotD(guildId)
        }
        return true
      }
    }
    return undefined
  }
  ZO_PreHook(ZO_GuildMotDProvider, "BuildNotificationList", buildNotificationListHook)
}
