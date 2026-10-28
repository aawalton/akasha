import type { bloodPressureCategory } from "akasha/person/properties/blood-pressure-category.select-property.ts"

export type BloodPressureCategory = (typeof bloodPressureCategory.values)[number]
