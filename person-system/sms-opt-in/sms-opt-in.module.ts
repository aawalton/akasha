import type { Module } from "@akasha/code-system/module"

export const smsOptIn = {
  id: "01a05b54-a903-7d92-ba67-13983ceac2c4",
  pageTypeSlug: "module",
  slug: "sms-opt-in",
  definition: "the form a person opts in to text messages through",
  code: "tsx",
  test: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A person opts in only by checking the box themselves.",
    },
    {
      invariantKind: "departure",
      statement: "The wording shown is the one the consent module states.",
    },
    {
      invariantKind: "departure",
      statement: "A field no person is shown catches a caller filling every field.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal the route states is shown as the refusal was given.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the consent down.",
    },
  ],
} as const satisfies Module
