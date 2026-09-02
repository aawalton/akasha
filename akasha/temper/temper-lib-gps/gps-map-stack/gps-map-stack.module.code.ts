import { INTERNAL } from "../gps-lib-state/gps-lib-state.module.code.ts"
import type {
  MapAdapterInstance,
  MapStackClass,
  MapStackInstance,
  TamrielOMeterInstance,
} from "../gps-types/gps-types.module.code.ts"

const MapStack = ZO_Object.Subclass<MapStackClass>()

MapStack.New = function (
  this: MapStackClass,
  meter: TamrielOMeterInstance,
  adapter: MapAdapterInstance
): MapStackInstance {
  const object = ZO_Object.New<MapStackInstance>(this)
  object.Initialize(meter, adapter)
  return object
}

MapStack.Initialize = function (
  this: MapStackInstance,
  meter: TamrielOMeterInstance,
  adapter: MapAdapterInstance
): undefined {
  this.meter = meter
  this.adapter = adapter
  this.stack = []
}

MapStack.Push = function (this: MapStackInstance): undefined {
  const adapter = this.adapter
  const mapId = adapter.GetCurrentMapIdentifier()
  const zoom = adapter.GetCurrentZoom()
  const [offsetX, offsetY] = adapter.GetCurrentOffset()
  INTERNAL.logger.Verbose("Push map on stack")

  this.stack.push([mapId, zoom, offsetX, offsetY])
}

MapStack.Pop = function (this: MapStackInstance): number {
  const data = this.stack.pop()
  if (data === undefined) {
    INTERNAL.logger.Debug("Pop map failed. No data on map stack.")
    return SET_MAP_RESULT_FAILED
  }

  const adapter = this.adapter
  const [mapId, zoom, offsetX, offsetY] = data
  const result = adapter.SetMapToMapIdWithoutMeasuring(mapId)
  INTERNAL.logger.Verbose("Pop map from stack")

  if (result !== SET_MAP_RESULT_FAILED) {
    adapter.SetCurrentZoom(zoom)
    adapter.SetCurrentOffset(offsetX, offsetY)
  }

  return result
}

export { MapStack }
