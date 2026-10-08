import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const podmanSliceShare = {
  id: "01a09311-efdf-7871-b60c-af498677bdde",
  type: "page-type/provisioned-file",
  slug: "podman-slice-share",
  definition: "the share the containers hold together against the apps Alan is using",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/user.slice.d/10-share.conf",
  reloadWith: "systemctl --user daemon-reload",
  filling: {},
  cpuShare: 30,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Podman puts every container it runs rootless in the slice named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The containers hold the same share as the seats and the services.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container already running takes the new share without being started again.",
    },
  ],
  createdAt: "2026-09-12T00:43:41.407Z",
  updatedAt: "2026-09-24T23:03:02.000Z",
} as const satisfies ProvisionedFile
