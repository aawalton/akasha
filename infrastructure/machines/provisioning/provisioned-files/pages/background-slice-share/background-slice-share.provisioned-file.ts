import type { ProvisionedFile } from "akasha/infrastructure/machines/provisioning/provisioned-files/provisioned-file.page-type.types.ts"

export const backgroundSliceShare = {
  id: "01a0930e-6612-7563-a508-b6695086c8cb",
  type: "provisioned-file",
  slug: "background-slice-share",
  definition: "the share the services hold together against the apps Alan is using",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/background.slice.d/10-share.conf",
  reloadWith: "systemctl --user daemon-reload",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The share is the one systemd ships, said here rather than left to a default.",
    },
    {
      invariantKind: "departure",
      statement: "The services and the seats hold the same share as each other.",
    },
  ],
} as const satisfies ProvisionedFile
