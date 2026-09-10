import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const esoInterface = {
  id: "01a06036-9b76-7bf2-b21b-2f45a8b14ac4",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "eso-interface",
  definition: "one XML document the game reads",
  pluralSlug: "eso-interfaces",
  parts: ["file-property/markup", "text-property/loaded-as"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/markup", required: true, many: false },
    { pageProperty: "text-property/loaded-as", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An interface's XML is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is imported.",
    },
    {
      invariantKind: "departure",
      statement: "The game reads the XML rather than running that XML.",
    },
    {
      invariantKind: "departure",
      statement: "A control the XML declares is reached from Lua by the control's name.",
    },
    {
      invariantKind: "departure",
      statement: "The addon loading an interface names that interface.",
    },
    {
      invariantKind: "departure",
      statement: "The name the manifest loads a document by is stated on the document's page.",
    },
  ],
  types: "ts",
} as const satisfies PageType
