import type { EquipmentCategory } from "../../equipment-items/properties/equipment-category.select-property.ts"
import type { Equipment } from "../../exercises/properties/equipment.select-property.ts"

const BODYWEIGHT: Equipment = "body-only"

const KIT_CATEGORY_BY_EQUIPMENT: Readonly<Partial<Record<Equipment, EquipmentCategory>>> = {
  dumbbell: "dumbbells",
  kettlebells: "kettlebells",
  bands: "band",
}

export function requiresNoImplement(equipment: Equipment | null): boolean {
  return equipment === null || equipment === BODYWEIGHT
}

export function kitCategoryFor(equipment: Equipment | null): EquipmentCategory | null {
  if (requiresNoImplement(equipment) || equipment === null) return null
  return KIT_CATEGORY_BY_EQUIPMENT[equipment] ?? null
}

export function isInKit(
  equipment: Equipment | null,
  availableCategories: ReadonlySet<EquipmentCategory>
): boolean {
  if (requiresNoImplement(equipment)) return true
  const category = kitCategoryFor(equipment)
  return category !== null && availableCategories.has(category)
}
