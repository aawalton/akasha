import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const env = {
  id: "01a0d58a-70ad-79cd-9149-87aad2328fc5",
  type: "page-type/file-kind-domain",
  slug: "env",
  definition: "a file of environment settings",
  namePatterns: [".env", ".env.*"],
} as const satisfies FileKindDomain
