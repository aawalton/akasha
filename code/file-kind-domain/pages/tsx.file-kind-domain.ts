import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const tsx = {
  id: "01a0d58a-70ad-7df4-b3bc-12db582490c5",
  type: "page-type/file-kind-domain",
  slug: "tsx",
  definition: "a file of TypeScript source with markup",
  namePatterns: ["*.tsx"],
} as const satisfies FileKindDomain
