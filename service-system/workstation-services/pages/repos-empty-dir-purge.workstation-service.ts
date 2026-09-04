import type { WorkstationService } from "../workstation-service.page-type.ts"

export const reposEmptyDirPurge = {
  id: "01a06829-0194-7c17-9a07-d06e04099921",
  pageTypeSlug: "workstation-service",
  slug: "repos-empty-dir-purge",
  definition: "the service removing every directory holding nothing under Alan's repositories",
  runs: [
    "bash code-system/shell-scripts/pages/repos-empty-dir-purge/repos-empty-dir-purge.shell-script.shell.sh",
  ],
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
} as const satisfies WorkstationService
