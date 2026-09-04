import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const swapfileUnit = {
  id: "01a06862-af5d-7c99-ad36-2ecd155d6c75",
  pageTypeSlug: "provisioned-file",
  slug: "swapfile-unit",
  definition: "the disk-backed swapfile that cushions the box below zram",
  content: "conf",
  placedBy: "copy",
  onlyOn: "linux",
  installPath: "/etc/systemd/system/var-swap-swapfile.swap",
  reloadWith: "sudo systemctl daemon-reload",
} as const satisfies ProvisionedFile
