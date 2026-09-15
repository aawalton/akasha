import { blue } from "akasha/design/interface/color/pages/blue.color.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { orange } from "akasha/design/interface/color/pages/orange.color.ts"
import { purple } from "akasha/design/interface/color/pages/purple.color.ts"
import { red } from "akasha/design/interface/color/pages/red.color.ts"
import { yellow } from "akasha/design/interface/color/pages/yellow.color.ts"
import {
  type Rgb,
  srgbOf,
} from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"

export const GREEN: Rgb = srgbOf(green.hex)
export const BLUE: Rgb = srgbOf(blue.hex)
export const PURPLE: Rgb = srgbOf(purple.hex)
export const YELLOW: Rgb = srgbOf(yellow.hex)
export const ORANGE: Rgb = srgbOf(orange.hex)
export const RED: Rgb = srgbOf(red.hex)
