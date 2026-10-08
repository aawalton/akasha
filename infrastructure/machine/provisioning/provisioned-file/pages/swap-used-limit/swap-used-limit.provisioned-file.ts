import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const swapUsedLimit = {
  id: "01a06862-af5d-791d-ad26-0e28a693258e",
  type: "page-type/provisioned-file",
  slug: "swap-used-limit",
  definition: "how much swap is used before oomd starts killing",
  content: "conf",
  placedBy: "copy",
  onlyOn: "linux",
  installPath: "/etc/systemd/oomd.conf.d/99-swap-used-limit.conf",
  reloadWith: "sudo systemctl restart systemd-oomd",
  createdAt: "2026-09-03T17:48:13.021Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
