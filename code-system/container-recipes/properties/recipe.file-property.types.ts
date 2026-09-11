import type { recipe } from "akasha/code-system/container-recipes/properties/recipe.file-property.ts"

export type Recipe = (typeof recipe.extensions)[number]
