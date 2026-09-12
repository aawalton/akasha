import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const temperCatalog = {
  id: "01a07c17-ef81-788b-a0e0-e9297936cd3e",
  type: "namespace",
  slug: "temper-catalog",
  definition: "the catalog Temper reads the game's things out of",
  parts: [
    "command/temper-catalog-invalidate",
    "command/temper-catalog-list",
    "command/temper-catalog-status",
  ],
  name: "catalog",
} as const satisfies Namespace
