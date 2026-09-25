import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const buildFolderProperty = {
  id: "01a081cd-5b5f-731e-95ed-0ea5ee3b352b",
  type: "page-type/page-type",
  slug: "build-folder-property",
  definition: "a page property held in a folder a build writes",
  extends: ["page-type/named-folder-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build folder is outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build writes a build folder again from the source beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build folder has a body that is not text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every folder a build writes is declared by a property of this type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change moving a folder carries the folders this property names on disk and out of the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every folder a page names by this property is one git ignores.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
