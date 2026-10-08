import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const json = {
  id: "01a0d58a-70ad-7a4f-b155-e602bb089ece",
  type: "page-type/file-kind-domain",
  slug: "json",
  definition: "a file holding one JSON value",
  namePatterns: ["*.json", "*.code-workspace"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
