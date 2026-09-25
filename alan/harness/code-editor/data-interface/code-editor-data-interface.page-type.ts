import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const codeEditorDataInterface = {
  id: "01a07235-8d02-729e-880d-47af61f83714",
  type: "page-type/page-type",
  slug: "code-editor-data-interface",
  definition: "what a part of the editor draws, held where that part reads it",
  extends: ["page-type/domain"],
  parts: [
    "code-editor-data-interface/agent-tree",
    "code-editor-data-interface/command-tree",
    "code-editor-data-interface/domain-tree",
    "code-editor-data-interface/finding-tree",
    "code-editor-data-interface/gap-tree",
    "code-editor-data-interface/page-tree",
    "code-editor-data-interface/refusal-tree",
    "code-editor-data-interface/service-tree",
    "code-editor-data-interface/status-bar",
    "code-editor-data-interface/terminal-tabs",
    "code-editor-data-interface/work-tree",
    "file-property/rows",
    "file-property/state",
    "module/command-tree-assemble",
    "module/data-watching",
    "module/domain-row-filing",
    "module/domain-tree-hanging",
    "module/finding-tree-assemble",
    "module/gap-row-filing",
    "module/gap-tree-assemble",
    "module/group-stoplights",
    "module/page-tree-assemble",
    "module/page-type-rows",
    "module/refusal-tree-drawing",
    "module/service-tree-assemble",
    "module/state-cooldown",
    "change-generator/state-drawing",
    "module/state-reading",
    "module/state-writing",
    "module/status-bar-composing",
    "module/tree-drawing",
    "module/tree-row-fields",
    "module/tree-turning",
    "number-property/cooldown-milliseconds",
    "service-workstation/code-editor-data-watcher",
    "module/work-tree-composing",
    "module/committed-data-watching",
    "service-workstation/code-editor-commit-watcher",
  ],
  properties: [
    { pageProperty: "number-property/cooldown-milliseconds", required: true, many: false },
    {
      pageProperty: "file-property/state",
      required: false,
      many: false,
      uncommitted: true,
      default: "json",
    },
    {
      pageProperty: "file-property/rows",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
    { pageProperty: "code-file-property/code", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A data interface's code holds the zod schema of its state and the types inferred from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing carries the file of every picture made from committed pages alone but the refusals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a picture is drawn while the change is prepared rather than under the hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit watcher writes the refusals picture as each commit lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The data watcher writes every picture made from files no commit holds.",
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
