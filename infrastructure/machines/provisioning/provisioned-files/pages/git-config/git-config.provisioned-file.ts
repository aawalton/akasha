import type { ProvisionedFile } from "akasha/infrastructure/machines/provisioning/provisioned-files/provisioned-file.page-type.types.ts"

export const gitConfig = {
  id: "01a06862-af5c-7957-b120-09572c2c7b4c",
  type: "provisioned-file",
  slug: "git-config",
  definition: "who Alan commits as and where git keeps its credentials",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.gitconfig",
} as const satisfies ProvisionedFile
