import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const toml = {
  id: "01a0d58a-70ad-71a6-99fe-31bd85762389",
  type: "page-type/file-kind-domain",
  slug: "toml",
  definition: "a file of TOML settings",
  namePatterns: ["*.toml"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
