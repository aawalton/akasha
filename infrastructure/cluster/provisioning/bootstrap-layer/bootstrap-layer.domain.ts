import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const bootstrapLayer = {
  id: "01a0675b-16d6-7813-8ade-362de2107d1b",
  type: "page-type/domain",
  slug: "bootstrap-layer",
  definition: "the steps a new cluster is made in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The toolchain layer reuses exactly two of `prep.workflow`'s steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The private CI image `ci-images` builds does not exist before L3.",
    },
  ],
  createdAt: "2026-09-03T13:00:18.006Z",
  updatedAt: "2026-09-25T16:28:44.000Z",
} as const satisfies Domain
