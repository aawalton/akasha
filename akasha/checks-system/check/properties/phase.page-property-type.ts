import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Phase = "patch" | "worktree" | "deploy"

export const phase = {
  id: "01a04bc4-7e86-7d0e-8aef-7d312c93ffc7",
  pageTypeSlug: "page-property-type",
  slug: "phase",
  definition: "a moment at which a set of changes is judged",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
  design: [
    "Audit is no phase, because it judges every page rather than a set of changes.",
  ],
} as const satisfies PagePropertyType
