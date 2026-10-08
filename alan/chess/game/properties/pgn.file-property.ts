import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const pgn = {
  id: "01a06582-bd62-7619-99fc-212900aaf0a8",
  type: "page-type/file-property",
  slug: "pgn",
  propertySlug: "pgn",
  definition: "a game's moves in portable game notation",
  extensions: ["pgn"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
