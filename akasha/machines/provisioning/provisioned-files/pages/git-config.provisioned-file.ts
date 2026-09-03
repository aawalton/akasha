import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const gitConfig = {
  id: "01a06862-af5c-7957-b120-09572c2c7b4c",
  pageTypeSlug: "provisioned-file",
  slug: "git-config",
  definition: "who Alan commits as and where git keeps its credentials",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.gitconfig",
} as const satisfies ProvisionedFile
