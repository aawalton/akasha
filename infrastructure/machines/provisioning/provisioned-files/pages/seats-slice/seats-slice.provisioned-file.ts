import type { ProvisionedFile } from "akasha/infrastructure/machines/provisioning/provisioned-files/provisioned-file.page-type.types.ts"

export const seatsSlice = {
  id: "01a0927c-ec26-7feb-bbd5-a2754a45f6c0",
  type: "provisioned-file",
  slug: "seats-slice",
  definition: "the share the seats hold together against the apps Alan is using",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/seats.slice",
  reloadWith: "systemctl --user daemon-reload",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The share is held by the seats together rather than by each seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat takes the whole machine while the apps want none of it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat already running keeps the slice that seat began in.",
    },
  ],
} as const satisfies ProvisionedFile
