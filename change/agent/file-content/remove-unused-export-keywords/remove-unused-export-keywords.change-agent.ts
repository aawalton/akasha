import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removeUnusedExportKeywords = {
  id: "01a095d5-f114-71cc-888d-338de89fc74b",
  type: "page-type/change-agent",
  slug: "remove-unused-export-keywords",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the `export` dropped from every value only the file declaring it names",
  code: "ts",
  test: "ts",
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which values those are is read from the check refusing an unused export.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value nothing names at all keeps its `export`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value only a test names keeps its `export`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole tree is searched rather than a path handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rung dropping the keyword is reached once for each file rather than once for each name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run drops the keyword in at most the count of files handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path handed in to leave alone keeps every keyword that path has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed a folder walks only the paths under that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are walked in the order their paths sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route module keeps the `export` on every name React Router reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file spelling no `export` is left unread.",
    },
  ],
} as const satisfies ChangeAgent
