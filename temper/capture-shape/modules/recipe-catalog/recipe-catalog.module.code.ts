export interface RecipeCatalogRecipe {
  name: string
}

export interface RecipeCatalogList {
  name: string
  recipes: Record<number, RecipeCatalogRecipe>
}
