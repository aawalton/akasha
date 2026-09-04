import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const zshrc = {
  id: "01a06862-af5c-75f9-ad58-87d4981a1937",
  pageTypeSlug: "provisioned-file",
  slug: "zshrc",
  definition: "what an interactive zsh shell on the MacBook reads at start",
  content: "sh",
  placedBy: "link",
  onlyOn: "macos",
  installPath: "~/.zshrc",
} as const satisfies ProvisionedFile
