import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const postgresAnnualDumpManifests = {
  id: "01a07386-9539-7f1f-a7a2-0792f83dbd40",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "postgres-annual-dump-manifests",
  definition: "the CronJob that writes a whole copy of the database once a year",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
