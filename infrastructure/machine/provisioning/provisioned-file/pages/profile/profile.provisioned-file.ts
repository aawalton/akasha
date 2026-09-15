import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const profile = {
  id: "01a06862-af5c-7d72-a232-2992a71d533c",
  type: "page-type/provisioned-file",
  slug: "profile",
  definition: "what a login shell reads before any interactive shell",
  content: "sh",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.profile",
} as const satisfies ProvisionedFile
