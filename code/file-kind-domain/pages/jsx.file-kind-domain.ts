import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const jsx = {
  id: "01a0d58a-70ad-78b2-a946-2e5f00dff4c5",
  type: "page-type/file-kind-domain",
  slug: "jsx",
  definition: "a file of JavaScript code with JSX",
  namePatterns: ["*.jsx"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-10-30T15:57:13.471Z",
} as const satisfies FileKindDomain
