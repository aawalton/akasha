import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const seaweedfsBackupLongtail = {
  id: "01a0737d-3bc5-74ca-8f47-d5febbf370ba",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "seaweedfs-backup-longtail",
  definition: "the scheduled job copying the oldest backups on to slower storage",
  code: "ts",
  generatedDirectory: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the longtail copier's code sits is asked of the index rather than spelled.",
    },
  ],
} as const satisfies Manifest
