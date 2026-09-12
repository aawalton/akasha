import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removeUnusedExportKeywords = {
  id: "01a095d5-f114-71cc-888d-338de89fc74b",
  type: "change-agent",
  slug: "remove-unused-export-keywords",
  changeMode: "change-mode-remove",
  definition: "the `export` dropped from every value only the file declaring it names",
  code: "ts",
  test: "ts",
  changeKind: "change-checked",
  maxCpuSeconds: 900,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which values those are is read from the check refusing an unused export.",
    },
    {
      invariantKind: "departure",
      statement: "A value nothing names at all keeps its `export`.",
    },
    {
      invariantKind: "departure",
      statement: "The whole tree is walked rather than a path handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rung dropping the keyword is reached once for each file rather than once for each name.",
    },
    {
      invariantKind: "departure",
      statement: "A run drops the keyword in at most the count of files handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A path handed in to leave alone keeps every keyword that path has.",
    },
    {
      invariantKind: "departure",
      statement: "The files are walked in the order their paths sort.",
    },
    { invariantKind: "departure", statement: "A route's code keeps every `export` that code has." },
  ],
} as const satisfies ChangeAgent
