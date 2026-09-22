import { asMiniMapScene } from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import {
  holder,
  type TemperMiniMap,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import { MINIMAP_MAP_MODE } from "akasha/temper/addon/pages/world/navigation/modules/minimap-names/minimap-names.module.code.ts"
import { getScene } from "akasha/temper/addon/pages/world/navigation/modules/minimap-shared/minimap-shared.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/world/navigation/modules/minimap-state/minimap-state.module.code.ts"

export function installVisibility(this: void): undefined {
  const self = holder

  holder.StartFollowPlayer = function (this: TemperMiniMap): undefined {
    STATE.moveToPlayer = ZO_WorldMap_JumpToPlayer
  }

  holder.StopFollowPlayer = function (this: TemperMiniMap): undefined {}

  let isDirty = false
  function refreshVisibility(this: void): boolean {
    isDirty = false
    if (getScene().IsShowing() || !WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      return true
    }
    const settingsScene = self.settingsScene
    if (settingsScene != null && asMiniMapScene(settingsScene).IsShowing()) {
      return self.wasMapAdded ?? false
    }

    if (!self.player.showMap) {
      return false
    }

    const settings = self.account
    if (self.isMounted) {
      return settings.showMounted
    }
    if (asMiniMapScene(SIEGE_BAR_SCENE).IsShowing()) {
      return settings.showSiege
    }
    if (GetCurrentZoneHouseId() !== 0) {
      return settings.showInHousing
    }
    if (asMiniMapScene(LOOT_SCENE).IsShowing()) {
      return settings.showLoot
    }
    if (IsUnitInCombat("player")) {
      return settings.showCombat
    } else {
      return settings.showHUD
    }
  }
  asMiniMapScene(WORLD_MAP_FRAGMENT).SetConditional(refreshVisibility)

  holder.UpdateVisibility = function (this: TemperMiniMap): undefined {
    if (!isDirty) {
      isDirty = true
      asMiniMapScene(WORLD_MAP_FRAGMENT).Refresh()
    }
    if (asMiniMapScene(WORLD_MAP_FRAGMENT).IsShowing()) {
      this.StartFollowPlayer()
    } else {
      this.StopFollowPlayer()
    }
  }
}
