import type { GeneratorKind } from "../generator-kind.page-type.types.ts"

export const uuidV7 = {
  id: "01a04f17-5b79-72fc-9efd-63b5f8057882",
  pageTypeSlug: "generator-kind",
  type: "generator-kind",
  slug: "uuid-v7",
  definition: "a uuid version 7, minted at the moment the page is created",
  afterChecks: false,
} as const satisfies GeneratorKind
