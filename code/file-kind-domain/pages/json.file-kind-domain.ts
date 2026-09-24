import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const json = {
  id: "01a0d58a-70ad-7a4f-b155-e602bb089ece",
  type: "page-type/file-kind-domain",
  slug: "json",
  definition: "a file holding one JSON value",
  namePatterns: ["*.json", "*.code-workspace"],
} as const satisfies FileKindDomain
