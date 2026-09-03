import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const homeSearchIgnore = {
  id: "01a06862-af5c-7cc1-a138-ffebf6bf1cfe",
  pageTypeSlug: "provisioned-file",
  slug: "home-search-ignore",
  definition: "what a search over the home directory passes over",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.ignore",
} as const satisfies ProvisionedFile
