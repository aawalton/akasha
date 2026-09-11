import { dirname, relative } from "node:path"
import { comfyUpBody } from "akasha/inference/generations/comfy-up-body/comfy-up-body.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const RECIPE = "container-recipe"

const FILE = "recipe"

const OWN = "zimage-up"

const BUILT = "zimage-image"

const ZIMAGE = { name: "zimage", port: 8678, smoke: "zimage-smoke" }

function packageOf(given: string | Reading): string {
  return dirname(dirname(fileOf(given, valuedAt(given, SCRIPT, OWN), SCRIPT, SHELL)))
}

export function recipeAt(given: string | Reading): string {
  return relative(packageOf(given), fileOf(given, valuedAt(given, RECIPE, BUILT), RECIPE, FILE))
}

export function bodyIn(given: string | Reading): string {
  return comfyUpBody(recipeAt(given), ZIMAGE)
}
