export interface FurnitureCatalogSubCategory {
  name: string
}

export interface FurnitureCatalogCategory {
  name: string
  subcategories: Record<number, FurnitureCatalogSubCategory>
}

export interface FurnitureCatalogData {
  categories: Record<number, FurnitureCatalogCategory>
}
