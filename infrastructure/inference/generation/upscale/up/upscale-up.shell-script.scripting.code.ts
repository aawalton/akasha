import { dirname, relative } from "node:path"
import { comfyUpBody } from "akasha/infrastructure/inference/generation/modules/comfy-up-body/comfy-up-body.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const RECIPE = "container-recipe"

const RECIPE_PROPERTY = "recipe"

const OWN = "upscale-up"

const BUILT = "upscale-image"

const UPSCALE = { name: "upscale", port: 8677, smoke: null }

function shellOf(given: string | Reading): string {
  return fileOf(given, valuedAt(given, SCRIPT, OWN), SCRIPT, SHELL)
}

export function recipeAt(given: string | Reading): string {
  const page = valuedAt(given, RECIPE, BUILT)
  return relative(dirname(dirname(shellOf(given))), fileOf(given, page, RECIPE, RECIPE_PROPERTY))
}

export function bodyIn(given: string | Reading): string {
  return comfyUpBody(recipeAt(given), UPSCALE)
}
