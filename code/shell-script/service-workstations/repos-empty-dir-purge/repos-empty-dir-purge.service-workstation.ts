import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const reposEmptyDirPurge = {
  id: "01a06829-0194-7c17-9a07-d06e04099921",
  type: "page-type/service-workstation",
  slug: "repos-empty-dir-purge",
  definition: "the service removing every directory with nothing under Alan's repositories",
  enabled: false,
  systemd: {
    schedule: "daily",
    jitterSeconds: 1800,
    catchUp: true,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The purge leaves `.git` and `node_modules` to git and to the package installer.",
    },
  ],
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
