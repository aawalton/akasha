import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const yml = {
  id: "01a0d58a-70ae-7658-9b3d-4ddbd0953090",
  type: "page-type/file-kind-domain",
  slug: "yml",
  definition: "a file of YAML data under the shorter ending",
  namePatterns: ["*.yml"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Yml and yaml are one language under two endings.",
    },
  ],
  createdAt: "2026-09-24T22:30:14.958Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
