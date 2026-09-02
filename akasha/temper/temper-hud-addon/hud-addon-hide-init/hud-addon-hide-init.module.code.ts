import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/tstl-eso-sandbox"

import { HUD_SCENE_CATALOG } from "@akasha/temper-hud-components/hud-scene-catalog"
import {
  createHideRegistry,
  type HideRegistry,
} from "../hud-addon-hide-registry/hud-addon-hide-registry.module.code.ts"
import {
  migrateComponentVisibility,
  readComponentVisible,
  writeComponentVisible,
} from "../hud-addon-saved-variables/hud-addon-saved-variables.module.code.ts"

const registry: HideRegistry = createHideRegistry()
let initialized: boolean | undefined

const PERFORMANCE_METER_ID = "performance-meter-fragment"
const HIDE_REASON = "TemperHud"

const GLOBALS = _G as Record<string, unknown>

export function defaultComponentVisible(this: void, id: string): boolean {
  return id !== PERFORMANCE_METER_ID
}

export function isComponentVisible(this: void, id: string): boolean {
  return readComponentVisible(id) ?? defaultComponentVisible(id)
}

export function getHideRegistry(this: void): HideRegistry {
  return registry
}

export function setComponentVisiblePersistent(this: void, id: string, visible: boolean): undefined {
  writeComponentVisible(id, visible)
  registry.setHidden(id, !visible)
  registry.applyOne(id)
}

export function initializeComponentHiding(this: void): undefined {
  if (initialized === true) return
  initialized = true

  migrateComponentVisibility(HUD_SCENE_CATALOG.map((record) => record.id))

  for (const record of HUD_SCENE_CATALOG) {
    const esoGlobal = record.esoGlobal
    registry.register({
      id: record.id,
      resolve: () => GLOBALS[esoGlobal],
      reason: HIDE_REASON,
    })
    registry.setHidden(record.id, !isComponentVisible(record.id))
  }
  registry.apply()

  EVENT_MANAGER.RegisterForEvent(
    "TemperHud_ComponentHiding_PlayerActivated",
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      registry.apply()
    }
  )
  SCENE_MANAGER.GetScene("hud").RegisterCallback("StateChange", function (this: void): undefined {
    registry.apply()
  })
}
