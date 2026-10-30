import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const ts = {
  id: "01a0d58a-70ad-79e7-abbf-82c855129bf0",
  type: "page-type/file-kind-domain",
  slug: "ts",
  definition: "a file of TypeScript code",
  namePatterns: ["*.ts"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-10-30T15:33:58.032Z",
} as const satisfies FileKindDomain
