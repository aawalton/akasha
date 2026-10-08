import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const env = {
  id: "01a0d58a-70ad-79cd-9149-87aad2328fc5",
  type: "page-type/file-kind-domain",
  slug: "env",
  definition: "a file of environment settings",
  namePatterns: [".env", ".env.*"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
