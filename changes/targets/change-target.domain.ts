import type { Domain } from "../../domains/domain.page-type.ts"

export const changeTarget = {
  id: "01a0814e-c10e-7ebb-9a24-ec1c319fb801",
  pageTypeSlug: "domain",
  slug: "change-target",
  definition: "the thing a change acts on",
  pluralSlug: "change-targets",
  parts: ["page-type/change-target-type", "page-type/change-target-subtype"],
} as const satisfies Domain
