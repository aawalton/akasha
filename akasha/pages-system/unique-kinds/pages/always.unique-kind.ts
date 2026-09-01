import type { UniqueKind } from "../unique-kind.page-type.ts"

export const always = {
  id: "01a04edd-897d-7b88-90d8-c86522baad1d",
  pageTypeSlug: "unique-kind",
  slug: "always",
  definition: "the value is unique across every page",
} as const satisfies UniqueKind
