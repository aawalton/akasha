import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const bootstrapLayer = {
  id: "01a0675b-16d6-7813-8ade-362de2107d1b",
  type: "page-type/domain",
  slug: "bootstrap-layer",
  definition: "the ordered stages bringing up an empty cluster",
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
} as const satisfies Domain
