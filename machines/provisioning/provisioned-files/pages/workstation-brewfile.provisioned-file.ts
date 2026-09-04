import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const workstationBrewfile = {
  id: "01a06862-af5d-7d71-b50b-b6dcf25bb24a",
  pageTypeSlug: "provisioned-file",
  slug: "workstation-brewfile",
  definition: "the brew formulae the Linux workstation's external-tool baseline is",
  content: "conf",
  placedBy: "read-where-it-stands",
  onlyOn: "linux",
} as const satisfies ProvisionedFile
