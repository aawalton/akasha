import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noRunOutsideTheRunner = {
  id: "01a05d68-4f2f-7e94-bbdd-0f8139dadfb7",
  pageTypeSlug: "syntax-rule",
  slug: "no-run-outside-the-runner",
  definition: "the rule refusing a process run to its end anywhere but the runner",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is found in the parse and never in the text.",
    },
    {
      invariantKind: "departure",
      statement: "A name is refused only where the name was taken from node's child process.",
    },
    {
      invariantKind: "departure",
      statement: "`Bun.spawnSync` is refused wherever `Bun.spawnSync` is reached.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name reached through a namespace taken from node's child process is refused too.",
    },
    {
      invariantKind: "departure",
      statement: "A process started to be awaited or held is not what this rule refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A file in the runner's own folder is judged not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A method of that name reached on anything else is not a call to node's child process.",
    },
    {
      invariantKind: "absence",
      statement: "No run outside the runner is kept as permitted.",
    },
    {
      invariantKind: "gap",
      statement: "A process started asynchronously and read to its end is not seen.",
    },
  ],
} as const satisfies SyntaxRule
