import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const gitGlobalIgnore = {
  id: "01a06862-af5c-7db9-86b1-d4785579006f",
  pageTypeSlug: "provisioned-file",
  slug: "git-global-ignore",
  definition: "what git leaves untracked in every repository",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.config/git/ignore",
} as const satisfies ProvisionedFile
