import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const spotifyRealtimeAccess = {
  id: "01a0c527-8917-7fed-a5a2-b22d2c24d6a8",
  type: "page-type/provisioned-file",
  slug: "spotify-realtime-access",
  definition: "Spotify's permission to ask the system for on-time scheduling",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.local/share/flatpak/overrides/com.spotify.Client",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A flatpak reaches a system service only where the flatpak is given that service.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The thread carrying sound is late under load unless that thread is scheduled first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify reaches the service granting on-time scheduling.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the permission take effect; the next Spotify launch does.",
    },
  ],
} as const satisfies ProvisionedFile
