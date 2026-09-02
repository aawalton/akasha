import "../map-ping-declarations/map-ping-declarations.module.code.ts"
import { asCompatLib, asGlobalObjectTable } from "../map-ping-casts/map-ping-casts.module.code.ts"
import { requireHandler } from "../map-ping-initialization/map-ping-initialization.module.code.ts"
import { lib } from "../map-ping-lib/map-ping-lib.module.code.ts"
import type { CompatLib } from "../map-ping-types/map-ping-types.module.code.ts"

export function initCompatibility(this: void): undefined {
  const compat: CompatLib = asCompatLib({})

  asGlobalObjectTable(_G).LibMapPing = compat

  if (compat.Unload !== undefined) {
    compat.Unload()
  }

  const mapPingState = lib.MapPingState
  compat.MAP_PING_NOT_SET = mapPingState.NOT_SET
  compat.MAP_PING_NOT_SET_PENDING = mapPingState.NOT_SET_PENDING
  compat.MAP_PING_SET_PENDING = mapPingState.SET_PENDING
  compat.MAP_PING_SET = mapPingState.SET

  compat.SetMapPing = function (this, pingType, mapType, x, y) {
    return requireHandler().PingMap(pingType, mapType, x, y)
  }

  compat.RemoveMapPing = function (this, pingType): undefined {
    lib.RemoveMapPing(pingType)
  }

  compat.GetMapPing = function (this, pingType, pingTag) {
    return lib.GetRawMapPing(pingType, pingTag)
  }

  compat.GetMapPingState = function (this, pingType, pingTag): number {
    return lib.GetMapPingState(pingType, pingTag)
  }

  compat.HasMapPing = function (this, pingType, pingTag): boolean {
    return lib.HasMapPing(pingType, pingTag)
  }

  compat.RefreshMapPin = function (this, pingType, pingTag): boolean {
    return lib.RefreshMapPin(pingType, pingTag)
  }

  compat.IsPositionOnMap = function (this, x, y): boolean {
    return lib.IsPositionOnMap(x, y)
  }

  compat.MutePing = function (this, pingType, pingTag): undefined {
    lib.MutePing(pingType, pingTag)
  }

  compat.UnmutePing = function (this, pingType, pingTag): undefined {
    lib.UnmutePing(pingType, pingTag)
  }

  compat.IsPingMuted = function (this, pingType, pingTag): undefined {
    return lib.IsPingMuted(pingType, pingTag)
  }

  compat.SuppressPing = function (this, pingType, pingTag): undefined {
    lib.SuppressPing(pingType, pingTag)
  }

  compat.UnsuppressPing = function (this, pingType, pingTag): undefined {
    lib.UnsuppressPing(pingType, pingTag)
  }

  compat.IsPingSuppressed = function (this, pingType, pingTag): boolean {
    return lib.IsPingSuppressed(pingType, pingTag)
  }

  compat.RegisterCallback = function (this, eventName, callback): undefined {
    lib.RegisterCallback(eventName, callback)
  }

  compat.UnregisterCallback = function (this, eventName, callback): undefined {
    lib.UnregisterCallback(eventName, callback)
  }
}
