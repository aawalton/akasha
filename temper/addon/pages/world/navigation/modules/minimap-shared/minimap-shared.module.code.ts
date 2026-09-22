import {
  asAnyAsyncTask,
  asAnyTable,
  asMapScene,
  asRecord,
  asString,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import { holder } from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import { MINIMAP_MAP_MODE } from "akasha/temper/addon/pages/world/navigation/modules/minimap-names/minimap-names.module.code.ts"
import type {
  AnyAsyncTask,
  LooseTable,
  MapScene,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-view-types/minimap-view-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/interface-addon-neighbours/interface-addon-neighbours.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-async/lib-async.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-debug-logger/lib-debug-logger.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-pins/eso-world-map-pins.type-declaration.d.ts"

MAP_MODE_VOTANS_MINIMAP = MINIMAP_MAP_MODE

export function noOp(this: void, ..._args: unknown[]): undefined {}

export function getScene(this: void): MapScene {
  return asMapScene(IsInGamepadPreferredMode() ? GAMEPAD_WORLD_MAP_SCENE : WORLD_MAP_SCENE)
}

function fakeIsInGamepadPreferredMode(this: void): boolean {
  return false
}

export function noGamepad(
  this: void,
  func: (this: void, ...args: unknown[]) => unknown,
  ...args: unknown[]
): undefined {
  const g = asRecord(globalThis)
  const orgIsInGamepadPreferredMode = g.IsInGamepadPreferredMode
  g.IsInGamepadPreferredMode = fakeIsInGamepadPreferredMode
  func(...args)
  g.IsInGamepadPreferredMode = orgIsInGamepadPreferredMode
}

const dbgLog = LibDebugLogger ? LibDebugLogger.Create(holder.name) : undefined
export function dbg(this: void, ...args: unknown[]): undefined {
  if (dbgLog) {
    dbgLog.Debug(...args)
  } else {
    df(asString(args[0]), ...args.slice(1))
  }
}

function pinTaskOnError(this: void, err: unknown): undefined {
  const msg = asString(err)
  const [pinHit] = string.find(msg, "Map/MapPin", 1, true)
  const [nilHit] = string.find(msg, "attempt to index a nil value", 1, true)
  if (pinHit != null && nilHit != null) {
    return
  }
  df("TemperVotansMiniMap pin task error: %s", msg)
}

export function createAsyncTask(this: void, name: string): AnyAsyncTask {
  const task = asAnyAsyncTask(LibAsync.Create(name))
  task.OnError(pinTaskOnError)
  return task
}

export function pins(this: void): LooseTable {
  return asAnyTable(holder.pinManager)
}
export function panZoom(this: void): LooseTable {
  return asAnyTable(holder.panZoom)
}

holder.pinManager = asAnyTable(ZO_WorldMap_GetPinManager())
holder.panZoom = asAnyTable(ZO_WorldMap_GetPanAndZoom())
