import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addPropertyToPages = {
  id: "01a0c66d-7159-7964-a282-f5ca4da85933",
  type: "page-type/change-agent",
  slug: "add-property-to-pages",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value put under one key on each page a line names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is a path, a tab, then the value that page takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line holding no tab is refused rather than read as a path alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty line is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming no page is refused rather than answered as no edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
