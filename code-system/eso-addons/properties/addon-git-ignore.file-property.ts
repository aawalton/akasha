import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const addonGitIgnore = {
  id: "01a06036-9b79-7b11-972f-655af36acfd5",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "addon-git-ignore",
  propertySlug: "git-ignore",
  definition: "what a build leaves behind that git does not keep",
  extensions: ["gitignore"],
  fileName: ".gitignore",
  types: "ts",
} as const satisfies FileProperty
