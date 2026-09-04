import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const tmuxConfig = {
  id: "01a06862-af5c-7088-9dca-24a266c87466",
  pageTypeSlug: "provisioned-file",
  slug: "tmux-config",
  definition: "how tmux draws and scrolls",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.tmux.conf",
} as const satisfies ProvisionedFile
