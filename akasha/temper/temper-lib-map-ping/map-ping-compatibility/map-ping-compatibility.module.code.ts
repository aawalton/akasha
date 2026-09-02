import { asCompatLib, asGlobalObjectTable } from "../map-ping-casts/map-ping-casts.module.code.ts"
import { requireHandler } from "../map-ping-initialization/map-ping-initialization.module.code.ts"
import { LIB } from "../map-ping-lib/map-ping-lib.module.code.ts"
import type { CompatLib } from "../map-ping-types/map-ping-types.module.code.ts"

export function initCompatibility(this: void): undefined {
  const compat: CompatLib = asCompatLib({})

  asGlobalObjectTable(_G).LibMapPing = compat

  if (compat.Unload !== undefined) {
    compat.Unload()
  }

  const mapPingState = LIB.MapPingState
  compat.MAP_PING_NOT_SET = mapPingState.NOT_SET
  compat.MAP_PING_NOT_SET_PENDING = mapPingState.NOT_SET_PENDING
  compat.MAP_PING_SET_PENDING = mapPingState.SET_PENDING
  compat.MAP_PING_SET = mapPingState.SET

  compat.SetMapPing = function (this, pingType, mapType, x, y) {
    return requireHandler().PingMap(pingType, mapType, x, y)
  }

  compat.RemoveMapPing = function (this, pingType): undefined {
    LIB.RemoveMapPing(pingType)
  }

  compat.GetMapPing = function (this, pingType, pingTag) {
    return LIB.GetRawMapPing(pingType, pingTag)
  }

  compat.GetMapPingState = function (this, pingType, pingTag): number {
    return LIB.GetMapPingState(pingType, pingTag)
  }

  compat.HasMapPing = function (this, pingType, pingTag): boolean {
    return LIB.HasMapPing(pingType, pingTag)
  }

  compat.RefreshMapPin = function (this, pingType, pingTag): boolean {
    return LIB.RefreshMapPin(pingType, pingTag)
  }

  compat.IsPositionOnMap = function (this, x, y): boolean {
    return LIB.IsPositionOnMap(x, y)
  }

  compat.MutePing = function (this, pingType, pingTag): undefined {
    LIB.MutePing(pingType, pingTag)
  }

  compat.UnmutePing = function (this, pingType, pingTag): undefined {
    LIB.UnmutePing(pingType, pingTag)
  }

  compat.IsPingMuted = function (this, pingType, pingTag): undefined {
    return LIB.IsPingMuted(pingType, pingTag)
  }

  compat.SuppressPing = function (this, pingType, pingTag): undefined {
    LIB.SuppressPing(pingType, pingTag)
  }

  compat.UnsuppressPing = function (this, pingType, pingTag): undefined {
    LIB.UnsuppressPing(pingType, pingTag)
  }

  compat.IsPingSuppressed = function (this, pingType, pingTag): boolean {
    return LIB.IsPingSuppressed(pingType, pingTag)
  }

  compat.RegisterCallback = function (this, eventName, callback): undefined {
    LIB.RegisterCallback(eventName, callback)
  }

  compat.UnregisterCallback = function (this, eventName, callback): undefined {
    LIB.UnregisterCallback(eventName, callback)
  }
}
