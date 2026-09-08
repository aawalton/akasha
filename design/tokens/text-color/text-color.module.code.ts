import { chalk } from "../../colors/pages/chalk.color.ts"
import { silver } from "../../colors/pages/silver.color.ts"
import { stone } from "../../colors/pages/stone.color.ts"
import { type Rgb, srgbOf } from "../surface-color/surface-color.module.code.ts"

export const TEXT_PRIMARY: Rgb = srgbOf(chalk.hex)
export const TEXT_SECONDARY: Rgb = srgbOf(silver.hex)
export const TEXT_TERTIARY: Rgb = srgbOf(stone.hex)
