import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const csv = {
  id: "01a0d58a-70ad-7a71-967d-e6b51d642b5c",
  type: "page-type/file-kind-domain",
  slug: "csv",
  definition: "a file of comma-separated values",
  namePatterns: ["*.csv"],
} as const satisfies FileKindDomain
