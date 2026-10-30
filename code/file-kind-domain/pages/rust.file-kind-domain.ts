import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const rust = {
  id: "01a0d58a-70ad-7442-a413-d2a3b63c6f08",
  type: "page-type/file-kind-domain",
  slug: "rust",
  definition: "a file of Rust code",
  namePatterns: ["*.rs"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-10-30T15:36:36.750Z",
} as const satisfies FileKindDomain
