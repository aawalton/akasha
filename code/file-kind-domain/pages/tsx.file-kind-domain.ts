import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const tsx = {
  id: "01a0d58a-70ad-7df4-b3bc-12db582490c5",
  type: "page-type/file-kind-domain",
  slug: "tsx",
  definition: "a file of TypeScript code with JSX",
  namePatterns: ["*.tsx"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-10-30T15:57:24.502Z",
} as const satisfies FileKindDomain
