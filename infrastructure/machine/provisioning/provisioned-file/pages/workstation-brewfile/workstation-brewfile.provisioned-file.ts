import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const workstationBrewfile = {
  id: "01a06862-af5d-7d71-b50b-b6dcf25bb24a",
  type: "page-type/provisioned-file",
  slug: "workstation-brewfile",
  definition: "the brew formulae the Linux workstation's external-tool baseline is",
  content: "conf",
  placedBy: "read-where-it-stands",
  onlyOn: "linux",
  createdAt: "2026-09-03T17:48:13.021Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
