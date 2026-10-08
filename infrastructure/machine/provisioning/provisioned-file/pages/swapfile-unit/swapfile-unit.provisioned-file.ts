import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const swapfileUnit = {
  id: "01a06862-af5d-7c99-ad36-2ecd155d6c75",
  type: "page-type/provisioned-file",
  slug: "swapfile-unit",
  definition: "the disk-backed swapfile that cushions the box below zram",
  content: "conf",
  placedBy: "copy",
  onlyOn: "linux",
  installPath: "/etc/systemd/system/var-swap-swapfile.swap",
  reloadWith: "sudo systemctl daemon-reload && sudo systemctl enable --now var-swap-swapfile.swap",
  createdAt: "2026-09-03T17:48:13.021Z",
  updatedAt: "2026-09-22T14:11:15.000Z",
} as const satisfies ProvisionedFile
