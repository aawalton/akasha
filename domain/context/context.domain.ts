import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const context = {
  id: "01a04f50-2a7e-7000-a43d-22ce4657c379",
  type: "page-type/domain",
  slug: "context",
  definition: "what a change requires its writer to have read",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "context" },
    { partOfSpeech: "part-of-speech/noun", spelling: "contexts" },
  ],
  parts: [
    "domain/required-reading",
    "module/agent-stated",
    "module/warrant-saying",
    "module/warranting",
    "page-type/context-warrant",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A warrant applies to the seat changing a file rather than to a seat reading that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Warrants reach no further than the akasha folder.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every warrant a change owes is stated by a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The warrants a change owes are worked out from the warrant pages.",
    },
  ],
} as const satisfies Domain
