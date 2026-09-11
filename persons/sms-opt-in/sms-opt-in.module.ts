import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const smsOptIn = {
  id: "01a05b54-a903-7d92-ba67-13983ceac2c4",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "The wording shown is the wording the consent module states.",
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
    {
      invariantKind: "departure",
      statement:
        "The wording and the links beside the box read as one sentence rather than as a row.",
    },
    {
      invariantKind: "departure",
      statement: "Each link beside the box reaches a whole document rather than a section here.",
    },
  ],
} as const satisfies Module
