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
    {
      invariantKind: "departure",
      statement: "A kept answer is given back only while every input to that answer is unchanged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key is taken from what the inputs hold rather than from when the inputs changed.",
    },
    {
      invariantKind: "departure",
      statement: "The code working an answer out is one of that answer's inputs.",
    },
    {
      invariantKind: "departure",
      statement: "Forgetting a kept answer changes only how long that answer takes.",
    },
  ],
} as const satisfies Module
