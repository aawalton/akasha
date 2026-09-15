import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renamePages = {
  id: "01a08337-0d7c-7cd3-bad9-c30420f68ccf",
  type: "page-type/change-agent",
  slug: "rename-pages",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "many pages renamed and carried to where their slugs say, in one call",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rename is left to the mechanical change renaming many pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line of the argument names a page and the slug that page becomes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is not a path and a slug parted by a space is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line with nothing on it is read over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is refused here and the refusal names the change renaming one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
