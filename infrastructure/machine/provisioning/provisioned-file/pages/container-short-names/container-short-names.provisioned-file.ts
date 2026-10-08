import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const containerShortNames = {
  id: "01a06862-af5c-7f74-8ad4-0444d0757ed5",
  type: "page-type/provisioned-file",
  slug: "container-short-names",
  definition: "an image named without its registry resolved without asking",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/containers/registries.conf.d/00-short-name-permissive.conf",
  createdAt: "2026-09-03T17:48:13.020Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
