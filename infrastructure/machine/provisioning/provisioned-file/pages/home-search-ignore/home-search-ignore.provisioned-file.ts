import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const homeSearchIgnore = {
  id: "01a06862-af5c-7cc1-a138-ffebf6bf1cfe",
  type: "page-type/provisioned-file",
  slug: "home-search-ignore",
  definition: "what a search over the home directory skips",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.ignore",
} as const satisfies ProvisionedFile
