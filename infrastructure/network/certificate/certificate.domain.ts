import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const certificate = {
  id: "01a0658b-0f02-7cc7-a170-0193d5a4bc1d",
  type: "page-type/domain",
  slug: "certificate",
  definition: "a signed statement that a name belongs to whoever answers on it",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "certificate" },
    { partOfSpeech: "part-of-speech/noun", spelling: "certificates" },
  ],
  parts: ["page-type/certificate-authority"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A certificate for a public name is issued by an outside authority.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A certificate used inside the cluster is signed by our own authority.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Our own authority's key is not in the repository.",
    },
  ],
} as const satisfies Domain
