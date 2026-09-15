import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const tmuxConfig = {
  id: "01a06862-af5c-7088-9dca-24a266c87466",
  type: "page-type/provisioned-file",
  slug: "tmux-config",
  definition: "how tmux draws and scrolls",
  content: "conf",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.tmux.conf",
} as const satisfies ProvisionedFile
