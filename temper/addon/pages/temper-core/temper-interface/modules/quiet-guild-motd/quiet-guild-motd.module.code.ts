import { safePrint } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-print/quiet-print.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

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
