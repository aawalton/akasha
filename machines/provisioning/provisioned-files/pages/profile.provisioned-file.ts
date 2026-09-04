import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const profile = {
  id: "01a06862-af5c-7d72-a232-2992a71d533c",
  pageTypeSlug: "provisioned-file",
  slug: "profile",
  definition: "what a login shell reads before any interactive shell",
  content: "sh",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.profile",
} as const satisfies ProvisionedFile
