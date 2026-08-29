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
      statement: "A refusal is one JSON object on standard output, and the exit code is 2.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is written to standard error too, where a reader will see it.",
    },
    {
      invariantKind: "departure",
      statement: "Standing aside says nothing and exits 0.",
    },
    {
      invariantKind: "departure",
      statement: "A payload that will not read is said so and exits 5, having judged nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hook's repository root is four folders above the hook's own file, and that depth is written here rather than worked out, so a hook standing elsewhere would read the wrong root.",
    },
    {
      invariantKind: "absence",
      statement: "A hook reads no field of the payload but the tool input it is handed.",
    },
    {
      invariantKind: "gap",
      statement: "Two hooks answer the harness alike without saying how twice.",
    },
  ],
} as const satisfies Module
