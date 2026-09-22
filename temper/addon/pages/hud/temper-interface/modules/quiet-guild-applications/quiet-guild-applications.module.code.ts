import type { ListProviderSelf } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-list-provider/quiet-list-provider.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

export function hookGuildNewApplicationsNotifications(this: void): undefined {
  const savedVars = getSavedVariables()
  function buildNotificationListHook(this: void, self: ListProviderSelf): boolean | undefined {
    if (savedVars.guildApps) {
      ZO_ClearNumericallyIndexedTable(self.list)
      return true
    }
    return undefined
  }
  ZO_PreHook(ZO_GuildNewApplicationsProvider, "BuildNotificationList", buildNotificationListHook)
}
