import type { FileProperty } from "@akasha/pages-system/file-property"

export type Pgn = "pgn"

export const pgn = {
  id: "01a06582-bd62-7619-99fc-212900aaf0a8",
  pageTypeSlug: "file-property",
  slug: "pgn",
  propertySlug: "pgn",
  definition: "a game's moves in portable game notation",
} as const satisfies FileProperty
