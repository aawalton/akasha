import type { Module } from "@akasha/code-system/module"

export const answerKeeping = {
  id: "01a05cb3-7cca-755d-8ec0-66cd112b7c85",
  pageTypeSlug: "module",
  slug: "answer-keeping",
  definition:
    "an answer written under the git directory and found again by the key it was filed under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is a kind and a name and a mark and a subject.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that cannot be read or parsed is answered as no answer.",
    },
    {
      invariantKind: "departure",
      statement: "Forgetting a kind keeps only the names the forgetting is told are live.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what an answer means.",
    },
  ],
} as const satisfies Module
