import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { CooldownMilliseconds } from "./properties/cooldown-milliseconds.number-property.ts"
import type { State } from "./properties/state.file-property.ts"
import type { StateType } from "./properties/state-type.file-property.ts"

export type CodeEditorDataInterface = Domain & {
  cooldownMilliseconds: CooldownMilliseconds
  stateType: StateType
  state?: State
}

export const codeEditorDataInterface = {
  id: "01a07235-8d02-729e-880d-47af61f83714",
  pageTypeSlug: "page-type",
  slug: "code-editor-data-interface",
  definition: "what one part of the editor draws, held where that part reads it",
  pluralSlug: "code-editor-data-interfaces",
  extendsSlug: ["page-type/domain"],
  partSlugs: [
    "file-property/state",
    "file-property/state-type",
    "number-property/cooldown-milliseconds",
    "code-editor-data-interface/agent-colors",
    "code-editor-data-interface/agent-tree",
    "code-editor-data-interface/domain-tree",
    "code-editor-data-interface/page-tree",
    "code-editor-data-interface/work-tree",
    "code-editor-data-interface/status-bar",
    "code-editor-data-interface/terminal-tabs",
  ],
  properties: [
    { pagePropertySlug: "cooldown-milliseconds", required: true, many: false },
    { pagePropertySlug: "state-type", required: true, many: false, default: "ts" },
    {
      pagePropertySlug: "state",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One service writes every one of these files.",
    },
    {
      invariantKind: "departure",
      statement: "The editor reads these files and writes none of them.",
    },
    {
      invariantKind: "departure",
      statement: "A part of the editor reads the one file named for what that part draws.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change lands at once where the file it changes has been quiet for its cooldown.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change arriving inside that cooldown is collected and lands when the cooldown ends.",
    },
    {
      invariantKind: "departure",
      statement: "A cooldown is counted for one file rather than across them.",
    },
    {
      invariantKind: "departure",
      statement: "When the file last changed is the time the file was last written.",
    },
  ],
} as const satisfies PageType
