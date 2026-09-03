import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const btw5UdevRule = {
  id: "01a06862-af5d-7bcd-9d81-fbddcbe6dd2d",
  pageTypeSlug: "provisioned-file",
  slug: "btw5-udev-rule",
  definition: "the seated user's access to the BT-W5 transmitter's config interface",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "/etc/udev/rules.d/70-btw5.rules",
  reloadWith:
    "sudo udevadm control --reload && sudo udevadm trigger --subsystem-match=hidraw --subsystem-match=usb",
} as const satisfies ProvisionedFile
