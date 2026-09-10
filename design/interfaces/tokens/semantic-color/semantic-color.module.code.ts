import { blue } from "../../colors/pages/blue.color.ts"
import { green } from "../../colors/pages/green.color.ts"
import { orange } from "../../colors/pages/orange.color.ts"
import { purple } from "../../colors/pages/purple.color.ts"
import { red } from "../../colors/pages/red.color.ts"
import { yellow } from "../../colors/pages/yellow.color.ts"
import { type Rgb, srgbOf } from "../surface-color/surface-color.module.code.ts"

export const GREEN: Rgb = srgbOf(green.hex)
export const BLUE: Rgb = srgbOf(blue.hex)
export const PURPLE: Rgb = srgbOf(purple.hex)
export const YELLOW: Rgb = srgbOf(yellow.hex)
export const ORANGE: Rgb = srgbOf(orange.hex)
export const RED: Rgb = srgbOf(red.hex)
