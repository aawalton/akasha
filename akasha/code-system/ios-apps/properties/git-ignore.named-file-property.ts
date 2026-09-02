import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type GitIgnore = "gitignore"

export const gitIgnore = {
  id: "01a0591d-e23c-76ca-8764-552fd305e707",
  pageTypeSlug: "named-file-property",
  slug: "git-ignore",
  propertySlug: "git-ignore",
  definition: "what a build leaves behind that git does not keep",
  fileName: ".gitignore",
} as const satisfies NamedFileProperty
