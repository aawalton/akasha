import type { SelectProperty } from "@akasha/pages-system/select-property"

export const chessProgressStatus = {
  id: "01a06582-bd62-79d5-a108-e94ea6a69b8e",
  pageTypeSlug: "select-property",
  slug: "chess-progress-status",
  propertySlug: "status",
  definition: "how settled a part of Alan's chess is",
  values: ["unknown", "shaky", "developing", "solid"],
} as const satisfies SelectProperty

export type ChessProgressStatus = (typeof chessProgressStatus.values)[number]
