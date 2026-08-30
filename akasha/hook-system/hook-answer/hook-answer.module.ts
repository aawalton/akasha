import type { Module } from "../../code-system/module/module.page-type.ts"

export const hookAnswer = {
  id: "01a04e16-d380-7001-96b2-4990b06a9094",
  pageTypeSlug: "module",
  slug: "hook-answer",
  definition: "what a hook reads from the harness and says back to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The call a hook judges is read from the payload on standard input.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is one JSON object on standard output.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal exits 2.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is written to standard error too.",
    },
    {
      invariantKind: "departure",
      statement: "Standing aside says nothing and exits 0.",
    },
    {
      invariantKind: "departure",
      statement: "A payload that will not read is said so and exits 5.",
    },
    {
      invariantKind: "departure",
      statement: "A hook's repository root is four folders above the hook's own file.",
    },
    {
      invariantKind: "departure",
      statement: "That depth is written here rather than worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the hook that refused before it says why.",
    },
    {
      invariantKind: "departure",
      statement: "A call handed back with its input changed is one JSON object on standard output.",
    },
    {
      invariantKind: "departure",
      statement: "A call handed back with its input changed exits 0.",
    },
    {
      invariantKind: "departure",
      statement: "A hook changing a call's input is handed the payload whole.",
    },
    {
      invariantKind: "absence",
      statement:
        "A hook that judges a call reads no field of the payload but the tool input it is handed.",
    },
    {
      invariantKind: "departure",
      statement: "A hook that reads its call from the payload is run from here.",
    },
    {
      invariantKind: "departure",
      statement: "Any hook answering it differently is a hook that has left.",
    },
    {
      invariantKind: "departure",
      statement: "What a hook refuses is handed in as data.",
    },
    {
      invariantKind: "departure",
      statement: "The runner knows only the shape of a judgement rather than what any hook judges.",
    },
  ],
} as const satisfies Module
