import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const kdePowerProfile = {
  id: "01a0d389-f516-7750-9d77-3f9f8a2ca27c",
  type: "page-type/provisioned-file",
  slug: "kde-power-profile",
  definition: "the power profile KDE reads, which never dims, blanks or suspends",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/powerdevilrc",
  reloadWith: "systemctl --user restart plasma-powerdevil.service",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's workstation never suspends, dims or blanks to save power.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The profile is stated for every power source, so a battery or a UPS appearing changes nothing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "KDE suspends on its built-in defaults where this file is absent, as it did after the reinstall.",
    },
  ],
} as const satisfies ProvisionedFile
