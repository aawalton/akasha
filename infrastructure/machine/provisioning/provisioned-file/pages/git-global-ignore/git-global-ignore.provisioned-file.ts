import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const gitGlobalIgnore = {
  id: "01a06862-af5c-7db9-86b1-d4785579006f",
  type: "page-type/provisioned-file",
  slug: "git-global-ignore",
  definition: "what git leaves untracked in every repository",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.config/git/ignore",
  createdAt: "2026-09-03T17:48:13.020Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
