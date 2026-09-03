import type { Command } from "@akasha/command-system/command"

export const exercisePolicyShow = {
  id: "01a0685d-b7ab-7877-9f26-9430d8df8575",
  pageTypeSlug: "command",
  slug: "exercise-policy-show",
  definition: "the command naming the selection policy's goal weights and its selector tunables",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--json", takes: "give the policy as JSON rather than as tab-separated rows" }],
  helpNotes: [
    "every number answered stands on the selection-policy page; none is supplied from code.",
    "the four goal weights are longevity, energy, functionality and aesthetics.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every number answered is read from the selection-policy page.",
    },
    {
      invariantKind: "departure",
      statement: "No policy page standing is a refusal rather than an answer of defaults.",
    },
    {
      invariantKind: "departure",
      statement: "A number the page is missing is a refusal rather than a zero.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the policy.",
    },
  ],
} as const satisfies Command
