import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export const everythingUnreadFolder = {
  id: "01a0eb0b-fbec-74fb-8a6f-95f298c537d5",
  type: "page-type/named-folder-property",
  slug: "everything-unread-folder",
  propertySlug: "everything-unread-folder",
  definition: "the folder beside a story holding every chapter of it left unread as one chapter",
  folderName: "everything-unread",
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every chapter of a story left unread is joined into one chapter in this folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No file in this folder is judged for length, since the joined chapter holds whole chapters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a file beneath this folder beside a story is let off the ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter filed beside its story rather than in this folder is still judged.",
    },
  ],
  types: "ts",
} as const satisfies NamedFolderProperty
