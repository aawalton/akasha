import type { Command } from "@akasha/command-system/command"

export const inferenceActive = {
  id: "01a0685e-fd50-7513-8357-2d89b53ef8b1",
  pageTypeSlug: "command",
  slug: "inference-active",
  definition: "the command naming the pool services the traffic cop is holding resident",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "what is resident is read off the cop rather than off what was declared.",
    "nothing resident is an empty answer rather than a refusal.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is resident is read off the cop.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing resident is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes what is resident.",
    },
  ],
} as const satisfies Command
