import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperCatalog = {
  id: "01a07c17-ef81-788b-a0e0-e9297936cd3e",
  type: "page-type/namespace",
  slug: "temper-catalog",
  definition: "the catalog holding the game's things for Temper",
  parts: [
    "command/temper-catalog-import-lore-books",
    "command/temper-catalog-invalidate",
    "command/temper-catalog-list",
    "command/temper-catalog-status",
  ],
  name: "catalog",
  createdAt: "2026-09-07T13:38:58.561Z",
  updatedAt: "2026-09-25T12:56:10.000Z",
} as const satisfies Namespace
