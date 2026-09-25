interface CollectiblesCatalogEntry {
  name: string
  categoryType: number
}

interface CollectiblesCatalogSubCategory {
  name: string
  collectibles: Record<number, CollectiblesCatalogEntry>
}

interface CollectiblesCatalogCategory {
  name: string
  generalSubCategory?: CollectiblesCatalogSubCategory
  subCategories: Record<number, CollectiblesCatalogSubCategory>
}

export interface CollectiblesCatalogData {
  categories: Record<number, CollectiblesCatalogCategory>
}
