import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const pgn = {
  id: "01a06582-bd62-7619-99fc-212900aaf0a8",
  type: "page-type/file-property",
  slug: "pgn",
  propertySlug: "pgn",
  definition: "a file with every move of a game",
  extensions: ["pgn"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T15:04:51.571Z",
} as const satisfies FileProperty
