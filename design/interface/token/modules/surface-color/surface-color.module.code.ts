import { ash } from "akasha/design/interface/color/pages/ash.color.ts"
import { charcoal } from "akasha/design/interface/color/pages/charcoal.color.ts"
import { graphite } from "akasha/design/interface/color/pages/graphite.color.ts"
import { slate } from "akasha/design/interface/color/pages/slate.color.ts"
import { soot } from "akasha/design/interface/color/pages/soot.color.ts"
import {
  type Rgb,
  srgbOf,
} from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"

export const SURFACE_0: Rgb = srgbOf(soot.hex)
export const SURFACE_1: Rgb = srgbOf(charcoal.hex)
export const SURFACE_2: Rgb = srgbOf(graphite.hex)
export const SURFACE_3: Rgb = srgbOf(slate.hex)
export const SURFACE_4: Rgb = srgbOf(ash.hex)
