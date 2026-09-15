import { chalk } from "akasha/design/interfaces/color/pages/chalk.color.ts"
import { silver } from "akasha/design/interfaces/color/pages/silver.color.ts"
import { stone } from "akasha/design/interfaces/color/pages/stone.color.ts"
import {
  type Rgb,
  srgbOf,
} from "akasha/design/interfaces/design-interface-token/modules/color-shape/color-shape.module.code.ts"

export const TEXT_PRIMARY: Rgb = srgbOf(chalk.hex)
export const TEXT_SECONDARY: Rgb = srgbOf(silver.hex)
export const TEXT_TERTIARY: Rgb = srgbOf(stone.hex)
