import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const image = {
  id: "01a0d58a-70ad-7bbc-84d9-161e8b519c5f",
  type: "page-type/file-kind-domain",
  slug: "image",
  definition: "a file holding a picture",
  namePatterns: ["*.png", "*.jpg", "*.jpeg", "*.ico", "*.dds"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "This kind tells no icon or texture from a photograph.",
    },
  ],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
