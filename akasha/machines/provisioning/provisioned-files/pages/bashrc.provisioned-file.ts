import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const bashrc = {
  id: "01a06862-af5c-7212-901d-4472fc61079c",
  pageTypeSlug: "provisioned-file",
  slug: "bashrc",
  definition: "what an interactive bash shell on a machine of Alan's reads at start",
  content: "sh",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.bashrc",
} as const satisfies ProvisionedFile
