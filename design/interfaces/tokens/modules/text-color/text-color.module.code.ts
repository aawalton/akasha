import { chalk } from "akasha/design/interfaces/colors/pages/chalk.color.ts"
import { silver } from "akasha/design/interfaces/colors/pages/silver.color.ts"
import { stone } from "akasha/design/interfaces/colors/pages/stone.color.ts"
import {
  type Rgb,
  srgbOf,
} from "akasha/design/interfaces/tokens/modules/color-shape/color-shape.module.code.ts"

export const TEXT_PRIMARY: Rgb = srgbOf(chalk.hex)
export const TEXT_SECONDARY: Rgb = srgbOf(silver.hex)
export const TEXT_TERTIARY: Rgb = srgbOf(stone.hex)
