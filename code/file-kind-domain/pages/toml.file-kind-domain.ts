import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const toml = {
  id: "01a0d58a-70ad-71a6-99fe-31bd85762389",
  type: "page-type/file-kind-domain",
  slug: "toml",
  definition: "a file of TOML settings",
  namePatterns: ["*.toml"],
} as const satisfies FileKindDomain
