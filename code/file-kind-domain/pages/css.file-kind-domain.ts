import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const css = {
  id: "01a0d58a-70ad-77d3-9df4-9c9ad65d8308",
  type: "page-type/file-kind-domain",
  slug: "css",
  definition: "a file of stylesheet rules",
  namePatterns: ["*.css"],
} as const satisfies FileKindDomain
