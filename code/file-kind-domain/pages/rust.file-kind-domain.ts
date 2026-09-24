import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const rust = {
  id: "01a0d58a-70ad-7442-a413-d2a3b63c6f08",
  type: "page-type/file-kind-domain",
  slug: "rust",
  definition: "a file of Rust source",
  namePatterns: ["*.rs"],
} as const satisfies FileKindDomain
