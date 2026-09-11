import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const routerAppGitIgnore = {
  id: "01a081a4-e893-7a14-b7ba-c4f6c5977a3b",
  type: "file-property",
  slug: "router-app-git-ignore",
  propertySlug: "git-ignore",
  definition: "what a build and an install leave behind that git does not keep",
  extensions: ["gitignore"],
  fileName: ".gitignore",
  types: "ts",
} as const satisfies FileProperty
