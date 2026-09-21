import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const featureRequest = {
  id: "01a0b79b-96bb-779c-bc1e-65ffdce6bfe0",
  type: "page-type/page-type",
  slug: "feature-request",
  definition: "what a contributor asks Alan to build, said where anyone can read it",
  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A feature request is the public face of a want, beside the finding, gap or intent saying it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan approves each feature request page himself.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
