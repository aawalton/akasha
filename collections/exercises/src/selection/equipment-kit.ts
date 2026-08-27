import { slugifyOptionId } from "../free-exercise-db/map"

const BODYWEIGHT_SLUG = "body-only"

const KIT_CATEGORY_BY_EQUIPMENT_SLUG: Readonly<Record<string, string>> = {
  dumbbell: "dumbbells",
  kettlebells: "kettlebells",
  bands: "band",
}

function equipmentSlug(equipment: string | null): string | null {
  return equipment === null ? null : slugifyOptionId(equipment)
}

export function requiresNoImplement(equipment: string | null): boolean {
  const slug = equipmentSlug(equipment)
  return slug === null || slug === BODYWEIGHT_SLUG
}

export function kitCategoryFor(equipment: string | null): string | null {
  const slug = equipmentSlug(equipment)
  if (slug === null || slug === BODYWEIGHT_SLUG) return null
  return KIT_CATEGORY_BY_EQUIPMENT_SLUG[slug] ?? null
}

export function isInKit(
  equipment: string | null,
  availableCategories: ReadonlySet<string>
): boolean {
  if (requiresNoImplement(equipment)) return true
  const category = kitCategoryFor(equipment)
  return category !== null && availableCategories.has(category)
}
