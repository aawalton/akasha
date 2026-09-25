import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const namedFor = {
  id: "01a05c53-bc6a-7abd-bdd4-f484ded3d33b",
  type: "page-type/domain",
  slug: "named-for",
  definition: "how code makes a page's file name from text",
  parts: ["module/page-stem"],
} as const satisfies Domain
