import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addPagePropertyTypes = {
  id: "01a08d57-ed0e-73b3-b5e9-98cf066c3cc7",
  type: "page-type/change-agent",
  slug: "add-page-property-types",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page property of a page type turned over to the code writing its type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type the properties are is the one argument.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no page type is refused by the name of that argument.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal over a page names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change acts on a page type, as this one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
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
