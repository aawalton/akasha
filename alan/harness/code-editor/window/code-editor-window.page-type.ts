import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const codeEditorWindow = {
  id: "01a06826-92e5-77ad-ad85-f1aa8cb5d359",
  type: "page-type/page-type",
  slug: "code-editor-window",
  definition: "an open window of the editor",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "code editor window" },
    { partOfSpeech: "part-of-speech/noun", spelling: "code editor windows" },
  ],
  extends: ["page-type/page"],
  mortal: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's page is made by the first write of that window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A closed window's page goes in the hourly sweep rather than at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's page goes by its slug naming a process that is gone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is written for a window's groups or for a window's tabs.",
    },
  ],
  types: "ts",
  parts: [
    "instant-property/observed-at",
    "module/window-page-sweeping",
    "service-workstation/sweep-window-pages",
    "text-property/window-features",
  ],
  properties: [
    {
      pageProperty: "instant-property/observed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/window-features",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  schema: "jsonl",
  createdAt: "2026-09-03T16:42:33.573Z",
  updatedAt: "2026-10-30T15:29:43.354Z",
} as const satisfies PageType
