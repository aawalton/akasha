import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const workspaceGitIgnore = {
  id: "01a06cd1-f991-7376-802f-680c3c54dfa8",
  type: "page-type/file-property",
  slug: "workspace-git-ignore",
  propertySlug: "workspace-git-ignore",
  definition: "the paths git keeps untracked",
  extensions: ["gitignore"],
  fileName: ".gitignore",
  types: "ts",
  createdAt: "2026-09-04T14:28:15.377Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
