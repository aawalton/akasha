import type { TemperSourceCategory } from "../temper-source-category.page-type.ts"

export const foodDrink = {
  id: "01a05fc5-169d-7646-adad-e039aecd52e8",
  pageTypeSlug: "temper-source-category",
  slug: "food-drink",
  title: "Food / Drink",
  displayOrder: 7,
  categoryId: "food-or-drink",
} as const satisfies TemperSourceCategory
