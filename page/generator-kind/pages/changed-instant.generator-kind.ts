import type { GeneratorKind } from "akasha/page/generator-kind/generator-kind.page-type.types.ts"

export const changedInstant = {
  id: "01a11c00-d20c-7569-a0f7-4e23dd41c324",
  type: "page-type/generator-kind",
  slug: "changed-instant",
  definition: "the instant a page's committed values last changed, worked out as each change lands",
  afterChecks: false,
  everyChange: true,
} as const satisfies GeneratorKind
