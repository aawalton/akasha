import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import type { DrawingOrientation } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

type WorldIconSize = (this: void) => number

export interface WorldIconData {
  x: number
  y: number
  z: number
  texture: string
  size: WorldIconSize
}

interface WorldIconGroupIcon {
  x: number
  y: number
  z: number
  texture?: string
  color?: readonly number[]
  text?: string
  faceCamera?: boolean
  orientation?: DrawingOrientation
}

export interface WorldIconGroup {
  size: WorldIconSize
  icons: readonly WorldIconGroupIcon[]
}

export function getFalgravnIconsSize(this: void): number {
  return CRUTCH.savedOptions.kynesaegis.falgravnIconsSize * 0.9
}

export function getLokkIconsSize(this: void): number {
  return CRUTCH.savedOptions.sunspire.lokkIconsSize * 0.9
}

export function getYolIconsSize(this: void): number {
  return CRUTCH.savedOptions.sunspire.yolIconsSize * 0.9
}

export function getAGIconsSize(this: void): number {
  return CRUTCH.savedOptions.hallsoffabrication.agIconsSize * 0.8
}

export function getChimeraIconsSize(this: void): number {
  return CRUTCH.savedOptions.sanitysedge.chimeraIconsSize * 1.8
}

export function getAnsuulIconSize(this: void): number {
  return CRUTCH.savedOptions.sanitysedge.ansuulIconSize * 0.9
}

export function getCavotIconSize(this: void): number {
  return CRUTCH.savedOptions.lucentcitadel.cavotIconSize * 0.9
}

export function getOrphicIconSize(this: void): number {
  return CRUTCH.savedOptions.lucentcitadel.orphicIconSize * 0.8
}

export function getOrphicNumIconSize(this: void): number {
  return CRUTCH.savedOptions.lucentcitadel.orphicIconSize * 0.9
}

export function getTempestIconsSize(this: void): number {
  return CRUTCH.savedOptions.lucentcitadel.tempestIconsSize * 0.9
}

export function getOCIconsSize(this: void): number {
  return CRUTCH.savedOptions.osseincage.twinsIconsSize * 0.9
}

export function fixedHundred(this: void): number {
  return 100
}
