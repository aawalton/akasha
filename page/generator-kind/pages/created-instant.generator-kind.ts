import type { GeneratorKind } from "akasha/page/generator-kind/generator-kind.page-type.types.ts"

export const createdInstant = {
  id: "01a11c00-d20c-7101-8b99-c1eb2b033671",
  type: "page-type/generator-kind",
  slug: "created-instant",
  definition: "the instant a page is created, worked out as the page lands",
  afterChecks: false,
} as const satisfies GeneratorKind
