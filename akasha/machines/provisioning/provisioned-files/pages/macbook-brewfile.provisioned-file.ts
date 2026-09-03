import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const macbookBrewfile = {
  id: "01a06862-af5d-7854-a522-5fc67800a13d",
  pageTypeSlug: "provisioned-file",
  slug: "macbook-brewfile",
  definition: "the brew formulae and casks the MacBook's dev parity is",
  content: "conf",
  placedBy: "read-where-it-stands",
  onlyOn: "macos",
} as const satisfies ProvisionedFile
