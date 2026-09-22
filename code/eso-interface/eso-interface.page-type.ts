import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const esoInterface = {
  id: "01a06036-9b76-7bf2-b21b-2f45a8b14ac4",
  type: "page-type/page-type",
  slug: "eso-interface",
  definition: "an XML document the game reads",
  parts: ["file-property/markup", "text-property/loaded-as"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/markup", required: true, many: false },
    { pageProperty: "text-property/loaded-as", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An interface's XML is in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here is imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game reads the XML rather than running that XML.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control the XML declares is reached from Lua by the control's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The addon loading an interface names that interface.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name the manifest loads a document by is stated on the document's page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
