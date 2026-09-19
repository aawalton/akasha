import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const seatsSlice = {
  id: "01a0927c-ec26-7feb-bbd5-a2754a45f6c0",
  type: "page-type/provisioned-file",
  slug: "seats-slice",
  definition: "the share the seats hold together against the apps Alan is using",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/systemd/user/seats.slice",
  reloadWith: "systemctl --user daemon-reload",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The share is held by the seats together rather than by each seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat takes the whole processor while the apps want none of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat already running keeps the slice that seat began in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seats hold one memory ceiling whether or not the apps want memory.",
    },
  ],
} as const satisfies ProvisionedFile
