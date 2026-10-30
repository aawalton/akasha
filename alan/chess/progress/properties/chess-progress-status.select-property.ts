import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessProgressStatus = {
  id: "01a06582-bd62-79d5-a108-e94ea6a69b8e",
  type: "page-type/select-property",
  slug: "chess-progress-status",
  propertySlug: "status",
  definition: "how well Alan knows a part of his chess",
  values: ["unknown", "shaky", "developing", "solid"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T16:22:40.689Z",
} as const satisfies SelectProperty
