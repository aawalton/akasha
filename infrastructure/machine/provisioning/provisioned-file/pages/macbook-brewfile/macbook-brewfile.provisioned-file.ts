import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const macbookBrewfile = {
  id: "01a06862-af5d-7854-a522-5fc67800a13d",
  type: "page-type/provisioned-file",
  slug: "macbook-brewfile",
  definition: "the brew formulae and casks the MacBook's dev parity is",
  content: "conf",
  placedBy: "read-where-it-stands",
  onlyOn: "macos",
  createdAt: "2026-09-03T17:48:13.021Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
