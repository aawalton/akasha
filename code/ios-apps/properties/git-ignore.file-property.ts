import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const gitIgnore = {
  id: "01a0591d-e23c-76ca-8764-552fd305e707",
  type: "file-property",
  slug: "git-ignore",
  propertySlug: "git-ignore",
  definition: "what a build leaves behind that git does not keep",
  extensions: ["gitignore"],
  fileName: ".gitignore",
  types: "ts",
} as const satisfies FileProperty
