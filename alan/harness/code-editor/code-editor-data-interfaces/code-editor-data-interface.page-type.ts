import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { AmbientTypes } from "../../../../code-system/type-declarations/properties/ambient-types.file-property.ts"
import type { CooldownMilliseconds } from "./properties/cooldown-milliseconds.number-property.ts"
import type { State } from "./properties/state.file-property.ts"

export type CodeEditorDataInterface = Domain & {
  cooldownMilliseconds: CooldownMilliseconds
  d: AmbientTypes
  state?: State
}

export const codeEditorDataInterface = {
  id: "01a07235-8d02-729e-880d-47af61f83714",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "code-editor-data-interface",
  definition: "what one part of the editor draws, held where that part reads it",
  pluralSlug: "code-editor-data-interfaces",
  extends: ["page-type/domain"],
  parts: [
    "file-property/state",
    "module/data-watching",
    "module/state-cooldown",
    "module/state-reading",
    "module/status-bar-composing",
    "module/group-stoplights",
    "type-declaration/tree-row",
    "module/tree-drawing",
    "module/page-tree-assemble",
    "module/command-tree-assemble",
    "number-property/cooldown-milliseconds",
    "code-editor-data-interface/agent-tree",
    "code-editor-data-interface/command-tree",
    "code-editor-data-interface/domain-tree",
    "code-editor-data-interface/page-tree",
    "code-editor-data-interface/work-tree",
    "code-editor-data-interface/status-bar",
    "code-editor-data-interface/terminal-tabs",
    "workstation-service/code-editor-data-watcher",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "One service writes every file here.",
    },
    {
      invariantKind: "departure",
      statement: "The editor reads these files and writes no file here.",
    },
    {
      invariantKind: "departure",
      statement: "A part of the editor reads the one file named for the data that part draws.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change lands at once where the file that change changes has been quiet for its cooldown.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change arriving inside that cooldown is collected and lands when the cooldown ends.",
    },
    {
      invariantKind: "departure",
      statement: "A cooldown is counted for one file rather than across files.",
    },
    {
      invariantKind: "departure",
      statement: "When the file last changed is the time the file was last written.",
    },
  ],
} as const satisfies PageType
