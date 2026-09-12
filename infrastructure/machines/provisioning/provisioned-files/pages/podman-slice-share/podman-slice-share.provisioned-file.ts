import type { ProvisionedFile } from "akasha/infrastructure/machines/provisioning/provisioned-files/provisioned-file.page-type.types.ts"

export const podmanSliceShare = {
  id: "01a09311-efdf-7871-b60c-af498677bdde",
  type: "provisioned-file",
  slug: "podman-slice-share",
  definition: "the share the containers hold together against the apps Alan is using",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/user.slice.d/10-share.conf",
  reloadWith: "systemctl --user daemon-reload",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Podman puts every container it runs rootless in the slice named here.",
    },
    {
      invariantKind: "departure",
      statement: "The containers hold the same share as the seats and the services.",
    },
    {
      invariantKind: "departure",
      statement: "A container already running takes the new share without being started again.",
    },
  ],
} as const satisfies ProvisionedFile
