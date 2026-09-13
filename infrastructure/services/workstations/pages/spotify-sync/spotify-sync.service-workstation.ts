import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const spotifySync = {
  id: "01a09c84-8cd1-758c-8c48-b28856aa0770",
  type: "service-workstation",
  slug: "spotify-sync",
  definition: "the service filing a release as a page where none represents it",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*-*-* 07:45:00",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 3600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The artists swept are the artists Alan follows.",
    },
    {
      invariantKind: "constraint",
      statement: "An unpaced sweep of the Web API bans the account for about a day.",
    },
    {
      invariantKind: "departure",
      statement: "This run paces itself at a second a call rather than at the client's default.",
    },
    {
      invariantKind: "departure",
      statement: "The token this run signs with is the file consent left outside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A run that filed nothing new is a run that succeeded.",
    },
  ],
} as const satisfies ServiceWorkstation
