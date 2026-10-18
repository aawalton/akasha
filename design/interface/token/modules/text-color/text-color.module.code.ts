import { chalk } from "akasha/design/interface/color/pages/chalk.color.ts"
import {
  type Rgb,
  srgbOf,
} from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"

export const TEXT_PRIMARY: Rgb = srgbOf(chalk.hex)
