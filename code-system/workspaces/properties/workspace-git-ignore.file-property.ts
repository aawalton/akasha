import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type WorkspaceGitIgnore = "gitignore"

export const workspaceGitIgnore = {
  id: "01a06cd1-f991-7376-802f-680c3c54dfa8",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "workspace-git-ignore",
  propertySlug: "workspace-git-ignore",
  definition: "the paths git keeps untracked",
  fileName: ".gitignore",
} as const satisfies FileProperty
