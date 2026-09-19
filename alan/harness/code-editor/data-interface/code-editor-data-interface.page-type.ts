import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const codeEditorDataInterface = {
  id: "01a07235-8d02-729e-880d-47af61f83714",
  type: "page-type/page-type",
  slug: "code-editor-data-interface",
  definition: "what one part of the editor draws, held where that part reads it",
  extends: ["page-type/domain"],
  parts: [
    "code-editor-data-interface/agent-tree",
    "code-editor-data-interface/command-tree",
    "code-editor-data-interface/domain-tree",
    "code-editor-data-interface/finding-tree",
    "code-editor-data-interface/page-tree",
    "code-editor-data-interface/service-tree",
    "code-editor-data-interface/status-bar",
    "code-editor-data-interface/terminal-tabs",
    "code-editor-data-interface/work-tree",
    "file-property/state",
    "module/command-tree-assemble",
    "module/data-watching",
    "module/finding-tree-assemble",
    "module/group-stoplights",
    "module/page-tree-assemble",
    "module/service-tree-assemble",
    "module/state-cooldown",
    "module/state-drawing",
    "module/state-reading",
    "module/state-writing",
    "module/status-bar-composing",
    "module/tree-drawing",
    "number-property/cooldown-milliseconds",
    "service-workstation/code-editor-data-watcher",
    "type-declaration/tree-row",
  ],
  properties: [
    { pageProperty: "number-property/cooldown-milliseconds", required: true, many: false },
    { pageProperty: "file-property/ambient-types", required: true, many: false, default: "ts" },
    {
      pageProperty: "file-property/state",
      required: false,
      many: false,
      uncommitted: true,
      default: "json",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing carries the file of every picture made from committed pages alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a picture is drawn while the change is prepared rather than under the hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One service writes every other file here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor reads these files and writes no file here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part of the editor reads the one file named for the data that part draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change lands at once where the file that change changes has been quiet for its cooldown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change arriving inside that cooldown is collected and lands when the cooldown ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change returning the file to the line already there lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cooldown is counted for one file rather than across files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "When the file last changed is the time the file was last written.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
