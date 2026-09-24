import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const sql = {
  id: "01a0d58a-70ad-7126-b06e-61959bef53d6",
  type: "page-type/file-kind-domain",
  slug: "sql",
  definition: "a file of SQL statements",
  namePatterns: ["*.sql"],
} as const satisfies FileKindDomain
