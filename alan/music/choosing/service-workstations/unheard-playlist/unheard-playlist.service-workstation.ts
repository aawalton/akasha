import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const unheardPlaylist = {
  id: "01a17ef9-9635-7f1e-8818-d26fb3e2137f",
  type: "page-type/service-workstation",
  slug: "unheard-playlist",
  definition: "the service keeping the unheard playlist up to date every day",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*-*-* 09:00:00",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 900,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is the `music unheard-playlist` command, called with no flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run comes after the morning's `spotify-sync`, so the releases it filed are picked.",
    },
  ],
  createdAt: "2026-10-27T20:07:28.563Z",
  updatedAt: "2026-10-27T20:07:28.563Z",
} as const satisfies ServiceWorkstation
