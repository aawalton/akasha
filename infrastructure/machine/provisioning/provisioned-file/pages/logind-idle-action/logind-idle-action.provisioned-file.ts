import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const logindIdleAction = {
  id: "01a0d38a-686f-79ff-b78a-6378171c4ed4",
  type: "page-type/provisioned-file",
  slug: "logind-idle-action",
  definition: "what logind does with an idle seat, and the sleep every target is masked against",
  content: "conf",
  placedBy: "copy",
  onlyOn: "linux",
  installPath: "/etc/systemd/logind.conf.d/10-never-idle-suspend.conf",
  reloadWith:
    "sudo systemctl reload systemd-logind && sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target suspend-then-hibernate.target",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing on Alan's workstation sleeps, so every sleep target is masked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Masking holds where a desktop setting is lost, because a lost setting is what suspended the machine.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The masking rides on the command that makes the body take effect.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A page states a unit is masked.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A deliberate suspend is refused as well, and unmasking is what allows one.",
    },
  ],
} as const satisfies ProvisionedFile
