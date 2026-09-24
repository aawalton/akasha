import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const theaGeneratorPages = {
  id: "01a0d4cb-31a7-7467-9609-a3ad699afcb9",
  type: "page-type/initiative",
  slug: "thea-generator-pages",
  domain: "domain/check",
  persona: "persona/thea",
} as const satisfies Initiative
