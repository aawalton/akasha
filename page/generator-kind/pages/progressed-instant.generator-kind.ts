import type { GeneratorKind } from "akasha/page/generator-kind/generator-kind.page-type.types.ts"

export const progressedInstant = {
  id: "01a14fcf-6bd9-7e6e-add9-6c563764968e",
  type: "page-type/generator-kind",
  slug: "progressed-instant",
  definition: "the instant a page's own progress last changed, worked out as each change lands",
  afterChecks: false,
  watches: "own-progress",
  createdAt: "2026-10-18T16:19:16.055Z",
  updatedAt: "2026-10-18T16:19:16.055Z",
} as const satisfies GeneratorKind
