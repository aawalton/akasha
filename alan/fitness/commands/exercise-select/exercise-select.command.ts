import type { Command } from "@akasha/command-system/command"

export const exerciseSelect = {
  id: "01a0685d-b7ab-7467-8919-789bf8518905",
  pageTypeSlug: "command",
  slug: "exercise-select",
  definition:
    "the command planning one ordered session for a focus and saying why each pick stands",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--focus <focus>",
      takes: "the focus planned against, today's scheduled focus where none is said",
    },
    {
      said: "--json",
      takes: "give the plan and its envelope as JSON rather than as tab-separated rows",
    },
  ],
  helpNotes: [
    "the plan is worked out from the day's focus, the week's pattern coverage, the policy, the in-kit pool and each movement's history.",
    "every pick is answered with its per-goal scores, the features read, the rules fired, its anchor state and what it beat.",
    "a slot nothing filled is answered with why nothing filled it.",
    "a day with no focus scheduled is an empty plan rather than a refusal.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The same day and the same inputs yield the same plan.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no focus scheduled is an empty plan rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Every pick is answered with the scores, features and rules behind it.",
    },
    {
      invariantKind: "departure",
      statement: "A pick is answered with the candidates it beat and why each lost.",
    },
    {
      invariantKind: "departure",
      statement: "A slot nothing filled is answered with why nothing filled it.",
    },
    {
      invariantKind: "departure",
      statement: "A rep range of nothing to nothing is time-based work.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a session, a set or a plan.",
    },
  ],
} as const satisfies Command
