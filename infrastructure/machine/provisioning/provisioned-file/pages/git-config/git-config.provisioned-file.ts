import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const gitConfig = {
  id: "01a06862-af5c-7957-b120-09572c2c7b4c",
  type: "page-type/provisioned-file",
  slug: "git-config",
  definition: "who Alan commits as and where git keeps its credentials",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.gitconfig",
  createdAt: "2026-09-03T17:48:13.020Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
