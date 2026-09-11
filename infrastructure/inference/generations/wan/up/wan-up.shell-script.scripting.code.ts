import { dirname, relative } from "node:path"
import { comfyUpBody } from "akasha/infrastructure/inference/generations/comfy-up-body/comfy-up-body.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "wan-up"

const RECIPE = "container-recipe"

const BUILT = "recipe"

const IMAGE = "wan-image"

const WAN = { name: "wan", port: 8676, smoke: "wan-smoke" }

function packagedIn(given: string | Reading): string {
  return dirname(dirname(fileOf(given, valuedAt(given, SCRIPT, OWN), SCRIPT, SHELL)))
}

export function recipeIn(given: string | Reading): string {
  return relative(packagedIn(given), fileOf(given, valuedAt(given, RECIPE, IMAGE), RECIPE, BUILT))
}

export function bodyIn(given: string | Reading): string {
  return comfyUpBody(recipeIn(given), WAN)
}
