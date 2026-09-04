import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const containerShortNames = {
  id: "01a06862-af5c-7f74-8ad4-0444d0757ed5",
  pageTypeSlug: "provisioned-file",
  slug: "container-short-names",
  definition: "an image named without its registry resolved without asking",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/containers/registries.conf.d/00-short-name-permissive.conf",
} as const satisfies ProvisionedFile
