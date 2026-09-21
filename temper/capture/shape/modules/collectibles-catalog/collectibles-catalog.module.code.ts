export interface CollectiblesCatalogEntry {
  name: string
  categoryType: number
}

export interface CollectiblesCatalogSubCategory {
  name: string
  collectibles: Record<number, CollectiblesCatalogEntry>
}

export interface CollectiblesCatalogCategory {
  name: string
  generalSubCategory?: CollectiblesCatalogSubCategory
  subCategories: Record<number, CollectiblesCatalogSubCategory>
}

export interface CollectiblesCatalogData {
  categories: Record<number, CollectiblesCatalogCategory>
}
