import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type RouterAppGitIgnore = "gitignore"

export const routerAppGitIgnore = {
  id: "01a081a4-e893-7a14-b7ba-c4f6c5977a3b",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "router-app-git-ignore",
  propertySlug: "git-ignore",
  definition: "what a build and an install leave behind that git does not keep",
  fileName: ".gitignore",
} as const satisfies FileProperty
