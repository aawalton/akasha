import type { FileProperty } from "@akasha/pages/file-property"

export type AddonGitIgnore = "gitignore"

export const addonGitIgnore = {
  id: "01a06036-9b79-7b11-972f-655af36acfd5",
  pageTypeSlug: "file-property",
  slug: "addon-git-ignore",
  propertySlug: "git-ignore",
  definition: "what a build leaves behind that git does not keep",
  fileName: ".gitignore",
} as const satisfies FileProperty
