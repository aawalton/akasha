import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const reposEditorSettings = {
  id: "01a06862-af5d-708d-a19c-4050c0370e70",
  pageTypeSlug: "provisioned-file",
  slug: "repos-editor-settings",
  definition: "how the editor behaves in a window opened over the repos folder",
  content: "json",
  placedBy: "link",
  onlyOn: "any",
  installPath: "$REPOS/.vscode/settings.json",
} as const satisfies ProvisionedFile
