import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const swapUsedLimit = {
  id: "01a06862-af5d-791d-ad26-0e28a693258e",
  pageTypeSlug: "provisioned-file",
  slug: "swap-used-limit",
  definition: "how much swap is used before oomd starts killing",
  content: "conf",
  placedBy: "copy",
  onlyOn: "linux",
  installPath: "/etc/systemd/oomd.conf.d/99-swap-used-limit.conf",
  reloadWith: "sudo systemctl restart systemd-oomd",
} as const satisfies ProvisionedFile
