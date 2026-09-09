import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const seaweedfsFiler = {
  id: "01a0737c-e503-77ed-b17f-c0edbfbb06f4",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-filer",
  definition:
    "the deployment giving the stored bytes their names and directories, and the way in to it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
