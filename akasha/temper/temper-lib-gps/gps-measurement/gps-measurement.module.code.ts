import { INTERNAL } from "../gps-lib-state/gps-lib-state.module.code.ts"
import type { MeasurementClass, MeasurementInstance } from "../gps-types/gps-types.module.code.ts"

const Measurement = ZO_Object.Subclass<MeasurementClass>()

Measurement.New = function (this: MeasurementClass): MeasurementInstance {
  const object = ZO_Object.New<MeasurementInstance>(this)
  object.Initialize()
  return object
}

Measurement.Initialize = function (this: MeasurementInstance): undefined {
  this.id = 0
  this.mapIndex = 0
  this.zoneId = 0

  this.scaleX = 1
  this.scaleY = 1
  this.offsetX = 0
  this.offsetY = 0
}

Measurement.GetId = function (this: MeasurementInstance): number {
  return this.id
}

Measurement.SetId = function (this: MeasurementInstance, id: number): undefined {
  this.id = id
}

Measurement.SetMapIndex = function (this: MeasurementInstance, mapIndex: number): undefined {
  this.mapIndex = mapIndex
}

Measurement.GetMapIndex = function (this: MeasurementInstance): number {
  return this.mapIndex
}

Measurement.SetZoneId = function (this: MeasurementInstance, zoneId: number): undefined {
  this.zoneId = zoneId
}

Measurement.GetZoneId = function (this: MeasurementInstance): number {
  return this.zoneId
}

Measurement.SetScale = function (
  this: MeasurementInstance,
  scaleX: number,
  scaleY: number
): undefined {
  this.scaleX = scaleX
  this.scaleY = scaleY
}

Measurement.GetScale = function (this: MeasurementInstance): LuaMultiReturn<[number, number]> {
  return $multi(this.scaleX, this.scaleY)
}

Measurement.SetOffset = function (
  this: MeasurementInstance,
  offsetX: number,
  offsetY: number
): undefined {
  this.offsetX = offsetX
  this.offsetY = offsetY
}

Measurement.GetOffset = function (this: MeasurementInstance): LuaMultiReturn<[number, number]> {
  return $multi(this.offsetX, this.offsetY)
}

Measurement.IsValid = function (this: MeasurementInstance): boolean {
  return this.mapIndex > 0
}

Measurement.ToGlobal = function (
  this: MeasurementInstance,
  x: number,
  y: number
): LuaMultiReturn<[number, number]> {
  x = x * this.scaleX + this.offsetX
  y = y * this.scaleY + this.offsetY
  return $multi(x, y)
}

Measurement.ToWorld = function (
  this: MeasurementInstance,
  x: number,
  y: number
): LuaMultiReturn<[number, number, number]> {
  const adapter = INTERNAL.mapAdapter
  const meter = INTERNAL.meter
  if (adapter === undefined || meter === undefined) {
    error("LibGPS not initialized")
  }
  const [zoneId, pwx, pwh, pwy] = adapter.GetPlayerWorldPosition()
  const [playerX, playerY] = adapter.GetNormalizedPositionFromWorld(zoneId, pwx, pwh, pwy)
  const [worldSizeX, worldSizeY] = meter.GetCurrentWorldSize().GetSize()
  const scaleX = worldSizeX * this.scaleX
  const scaleY = worldSizeY * this.scaleY
  const worldX = (x - playerX) * scaleX + pwx
  const worldY = (y - playerY) * scaleY + pwy
  return $multi(math.floor(worldX + 0.5), pwh, math.floor(worldY + 0.5))
}

Measurement.ToLocal = function (
  this: MeasurementInstance,
  x: number,
  y: number
): LuaMultiReturn<[number, number]> {
  x = (x - this.offsetX) / this.scaleX
  y = (y - this.offsetY) / this.scaleY
  return $multi(x, y)
}

Measurement.GetCenter = function (this: MeasurementInstance): LuaMultiReturn<[number, number]> {
  const x = this.offsetX + this.scaleX / 2
  const y = this.offsetY + this.scaleY / 2
  return $multi(x, y)
}

Measurement.Contains = function (this: MeasurementInstance, x: number, y: number): boolean {
  return !(
    x <= this.offsetX ||
    x >= this.offsetX + this.scaleX ||
    y <= this.offsetY ||
    y >= this.offsetY + this.scaleY
  )
}

Measurement.GetName = function (this: MeasurementInstance): string {
  return GetMapNameById(this.GetId())
}

Measurement.GetParentZoneId = function (this: MeasurementInstance): number {
  return GetParentZoneId(this.GetZoneId())
}

const SEPARATOR = ":"
const SERIALIZE_VERSION = "1"
const VERSION_INDEX = 0
const MAP_INDEX_INDEX = 1
const ZONE_ID_INDEX = 2
const SCALE_X_INDEX = 3
const SCALE_Y_INDEX = 4
const OFFSET_X_INDEX = 5
const OFFSET_Y_INDEX = 6
const SERIALIZE_BUFFER: (string | number)[] = []

Measurement.Serialize = function (this: MeasurementInstance): string {
  SERIALIZE_BUFFER[VERSION_INDEX] = SERIALIZE_VERSION
  SERIALIZE_BUFFER[MAP_INDEX_INDEX] = this.mapIndex
  SERIALIZE_BUFFER[ZONE_ID_INDEX] = this.zoneId
  SERIALIZE_BUFFER[SCALE_X_INDEX] = this.scaleX
  SERIALIZE_BUFFER[SCALE_Y_INDEX] = this.scaleY
  SERIALIZE_BUFFER[OFFSET_X_INDEX] = this.offsetX
  SERIALIZE_BUFFER[OFFSET_Y_INDEX] = this.offsetY
  return table.concat(SERIALIZE_BUFFER, SEPARATOR)
}

Measurement.Deserialize = function (
  this: MeasurementInstance,
  id: number,
  data: string
): undefined {
  const splitData = [...zo_strsplit(SEPARATOR, data)]
  if (splitData[VERSION_INDEX] === SERIALIZE_VERSION) {
    this.id = id
    this.mapIndex = tonumber(splitData[MAP_INDEX_INDEX]) ?? 0
    this.zoneId = tonumber(splitData[ZONE_ID_INDEX]) ?? 0
    this.scaleX = tonumber(splitData[SCALE_X_INDEX]) ?? 0
    this.scaleY = tonumber(splitData[SCALE_Y_INDEX]) ?? 0
    this.offsetX = tonumber(splitData[OFFSET_X_INDEX]) ?? 0
    this.offsetY = tonumber(splitData[OFFSET_Y_INDEX]) ?? 0
  } else {
    INTERNAL.logger.Warn("Tried to deserialize from unknown version", data)
  }
}

export { Measurement }
