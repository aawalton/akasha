import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const ts = {
  id: "01a0d58a-70ad-79e7-abbf-82c855129bf0",
  type: "page-type/file-kind-domain",
  slug: "ts",
  definition: "a file of TypeScript source",
  namePatterns: ["*.ts"],
} as const satisfies FileKindDomain
