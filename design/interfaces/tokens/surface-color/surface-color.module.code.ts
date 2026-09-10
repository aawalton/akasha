import { ash } from "../../colors/pages/ash.color.ts"
import { charcoal } from "../../colors/pages/charcoal.color.ts"
import { graphite } from "../../colors/pages/graphite.color.ts"
import { slate } from "../../colors/pages/slate.color.ts"
import { soot } from "../../colors/pages/soot.color.ts"

export type Rgb = readonly [number, number, number]

const BYTE = 255

export function srgbOf(hex: string): Rgb {
  const channel = (at: number): number =>
    Number.parseInt(hex.slice(1 + at * 2, 3 + at * 2), 16) / BYTE
  return [channel(0), channel(1), channel(2)]
}

export const SURFACE_0: Rgb = srgbOf(soot.hex)
export const SURFACE_1: Rgb = srgbOf(charcoal.hex)
export const SURFACE_2: Rgb = srgbOf(graphite.hex)
export const SURFACE_3: Rgb = srgbOf(slate.hex)
export const SURFACE_4: Rgb = srgbOf(ash.hex)
