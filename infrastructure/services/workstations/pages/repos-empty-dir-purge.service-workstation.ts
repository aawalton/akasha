import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const reposEmptyDirPurge = {
  id: "01a06829-0194-7c17-9a07-d06e04099921",
  type: "service-workstation",
  slug: "repos-empty-dir-purge",
  definition: "the service removing every directory with nothing under Alan's repositories",
  enabled: false,
  systemd: {
    schedule: "daily",
    jitterSeconds: 1800,
    catchUp: true,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The purge leaves `.git` and `node_modules` to git and to the package installer.",
    },
  ],
} as const satisfies ServiceWorkstation
