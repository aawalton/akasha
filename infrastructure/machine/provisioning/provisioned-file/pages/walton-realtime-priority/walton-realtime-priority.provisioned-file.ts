import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const waltonRealtimePriority = {
  id: "01a0d463-e5c1-748a-89fe-3987418eb528",
  type: "page-type/provisioned-file",
  slug: "walton-realtime-priority",
  definition: "the realtime priority Alan's login session may ask the kernel for",
  content: "conf",
  placedBy: "copy",
  onlyOn: "linux",
  installPath: "/etc/security/limits.d/40-walton-rtprio.conf",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Spotify asks the kernel rather than rtkit for realtime, and is refused while the limit is zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's user is let ask for realtime priority up to 20 and no higher.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The limit stays below the 70 the audio server's own group is let ask for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The limit is granted to Alan's user rather than through the audio server's group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is copied rather than linked, so a file under the home sets no limit.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only a login begun after placing has the limit, and no command reloads it.",
    },
  ],
} as const satisfies ProvisionedFile
