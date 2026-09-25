import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export const addonBinFolder = {
  id: "01a0912b-3b04-79e0-b715-2decfbfcdc83",
  type: "page-type/named-folder-property",
  slug: "addon-bin-folder",
  propertySlug: "addon-bin-folder",
  definition: "the textures and fonts an add-on keeps under a folder named bin",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A font is kept in the game's own font format, converted by the game's own tool.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A font ships with its license beside it.",
    },
  ],
  folderName: "bin",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies NamedFolderProperty
