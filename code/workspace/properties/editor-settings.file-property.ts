import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const editorSettings = {
  id: "01a0b6fb-af31-7923-9913-5f378430c3d6",
  type: "page-type/file-property",
  slug: "editor-settings",
  propertySlug: "editor-settings",
  definition: "how the editor behaves in a window opened over this tree",
  extensions: ["json"],
  fileName: ".vscode/settings.json",
  types: "ts",
  createdAt: "2026-09-19T00:05:42.833Z",
  updatedAt: "2026-09-19T00:09:32.000Z",
} as const satisfies FileProperty
