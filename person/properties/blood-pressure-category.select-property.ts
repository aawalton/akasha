import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const bloodPressureCategory = {
  id: "01a183b9-5d7e-704c-a71a-97e031954b40",
  type: "page-type/select-property",
  slug: "blood-pressure-category",
  propertySlug: "blood-pressure-category",
  definition: "the American Heart Association category of a person's last measured blood pressure",
  values: ["normal", "elevated", "stage-1-hypertension", "stage-2-hypertension"],
  types: "ts",
  createdAt: "2026-10-28T18:15:25.820Z",
  updatedAt: "2026-10-28T18:15:25.820Z",
} as const satisfies SelectProperty
