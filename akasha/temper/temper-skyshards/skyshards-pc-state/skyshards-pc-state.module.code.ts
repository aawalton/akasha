import type { SkyShardsDefaults } from "../skyshards-constants/skyshards-constants.module.code.ts"

let db: SkyShardsDefaults | undefined
let mainworldColor: ZoColorDef | undefined

export function setDb(this: void, value: SkyShardsDefaults): undefined {
  db = value
}

export function getDb(this: void): SkyShardsDefaults {
  if (db === undefined) {
    throw new Error("TemperSkyShards: saved variables read before OnLoad")
  }
  return db
}

export function setMainworldColor(this: void, value: ZoColorDef): undefined {
  mainworldColor = value
}

export function getMainworldColor(this: void): ZoColorDef {
  if (mainworldColor === undefined) {
    throw new Error("TemperSkyShards: mainworld color read before OnLoad")
  }
  return mainworldColor
}
