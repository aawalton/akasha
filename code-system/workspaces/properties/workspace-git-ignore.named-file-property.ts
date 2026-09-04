import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type WorkspaceGitIgnore = "gitignore"

export const workspaceGitIgnore = {
  id: "01a06cd1-f991-7376-802f-680c3c54dfa8",
  pageTypeSlug: "named-file-property",
  slug: "workspace-git-ignore",
  propertySlug: "workspace-git-ignore",
  definition: "the paths git keeps untracked",
  fileName: ".gitignore",
} as const satisfies NamedFileProperty
