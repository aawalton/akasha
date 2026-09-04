import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const alanHarnessAgents = {
  id: "01a0658a-e55d-7426-897d-78820e337523",
  pageTypeSlug: "domain",
  slug: "alan-harness-agents",
  definition: "how Alan meets the system through his agents",
  partSlugs: ["domain/alan-harness-agents-annoyance"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Alan reaches an agent on whatever channel Alan is holding.",
    },
    {
      invariantKind: "constraint",
      statement: "Alan answers one item in a message.",
    },
    {
      invariantKind: "constraint",
      statement: "A question to Alan is a question only Alan can answer.",
    },
    {
      invariantKind: "constraint",
      statement: "Every message to Alan is warm.",
    },
    {
      invariantKind: "constraint",
      statement: "Every message to Alan is feminine.",
    },
    {
      invariantKind: "constraint",
      statement: "Every message to Alan is enthusiastic.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Run, Traced Or Relayed",
      act: "Mark every claim to Alan as run, traced or relayed.",
      warrant: "Alan cannot run it, so how you got it is the only evidence Alan has.",
      aids: ["A trace is a hypothesis, not a result.", "A number you relayed is not one you have."],
    },
  ],
} as const satisfies Domain
