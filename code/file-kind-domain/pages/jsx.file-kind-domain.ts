import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const jsx = {
  id: "01a0d58a-70ad-78b2-a946-2e5f00dff4c5",
  type: "page-type/file-kind-domain",
  slug: "jsx",
  definition: "a file of JavaScript source with markup",
  namePatterns: ["*.jsx"],
} as const satisfies FileKindDomain
