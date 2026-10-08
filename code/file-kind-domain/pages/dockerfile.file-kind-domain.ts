import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const dockerfile = {
  id: "01a0d58a-70ad-7a5f-977e-0f2b8eacfccf",
  type: "page-type/file-kind-domain",
  slug: "dockerfile",
  definition: "a file of container recipe steps",
  namePatterns: ["Dockerfile", "Dockerfile.*", "Containerfile", "Containerfile.*"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
