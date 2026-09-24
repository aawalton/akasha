import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const kdeScreenLocker = {
  id: "01a0d38a-37c1-725c-bbb5-74f7aa7e8cfc",
  type: "page-type/provisioned-file",
  slug: "kde-screen-locker",
  definition: "the screen locker KDE reads, which never locks on its own",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/kscreenlockerrc",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's workstation never locks itself, and never locks on waking.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The lock KDE takes on its own is what preceded each suspend it took.",
    },
  ],
} as const satisfies ProvisionedFile
