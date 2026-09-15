import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const audio = {
  id: "019f189b-018c-74b8-920b-845fe171aee7",
  type: "page-type/page-type",
  slug: "audio",
  definition: "one sound the system has",
  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An audio's bytes sit in the object store under the audio's own id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audio's bytes sit on disk where the audio says those bytes were written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audio records where its bytes are rather than the bytes.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
