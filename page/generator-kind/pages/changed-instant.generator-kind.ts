import type { GeneratorKind } from "akasha/page/generator-kind/generator-kind.page-type.types.ts"

export const changedInstant = {
  id: "01a11c00-d20c-7569-a0f7-4e23dd41c324",
  type: "page-type/generator-kind",
  slug: "changed-instant",
  definition: "the instant a page's committed values last changed, worked out as each change lands",
  afterChecks: false,
  everyChange: true,
  createdAt: "2026-10-08T14:52:58.252Z",
  updatedAt: "2026-10-08T14:53:49.000Z",
} as const satisfies GeneratorKind
