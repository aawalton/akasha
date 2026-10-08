import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const codeEditorGroup = {
  id: "01a06826-92e5-7205-a945-38ff0c371a22",
  type: "page-type/page-type",
  slug: "code-editor-group",
  definition: "a container of tabs, one of which is showing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "code editor group" },
    { partOfSpeech: "part-of-speech/noun", spelling: "code editor groups" },
  ],
  extends: ["page-type/page"],
  parts: ["page-type/code-editor-group-tab"],
  mortal: true,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:42:33.573Z",
  updatedAt: "2026-09-24T22:38:28.000Z",
} as const satisfies PageType
