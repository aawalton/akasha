import type { PageType } from "@akasha/pages-system/page-type"
import type { Service } from "../services/service.page-type.ts"
import type { ClusterServiceSchedule } from "./properties/cluster-service-schedule.text-property.ts"
import type { ContainerPort } from "./properties/container-port.number-property.ts"
import type { Image } from "./properties/image.text-property.ts"
import type { ManifestCode } from "./properties/manifest-code.text-property.ts"
import type { Namespace } from "./properties/namespace.text-property.ts"
import type { Replicas } from "./properties/replicas.number-property.ts"
import type { ResourceKind } from "./properties/resource-kind.text-property.ts"
import type { ResourceName } from "./properties/resource-name.text-property.ts"

export type ClusterService = Service & {
  resourceKind: ResourceKind
  namespace: Namespace
  resourceName: ResourceName
  image: Image
  replicas?: Replicas
  containerPort?: ContainerPort
  schedule?: ClusterServiceSchedule
  manifestCode: ManifestCode
}

export const clusterService = {
  id: "01a05a41-58c2-7cbb-bfed-c234697164e3",
  pageTypeSlug: "page-type",
  slug: "cluster-service",
  definition: "a service the cluster runs as a workload",
  pluralSlug: "cluster-services",
  extendsSlug: "page-type/service",
  partSlugs: [
    "cluster-service/alanwalton-atlas",
    "cluster-service/alanwalton-web",
    "cluster-service/archive-of-worlds-web",
    "cluster-service/audhdalan-web",
    "cluster-service/calendar-sync",
    "cluster-service/smilingjenny-web",
    "cluster-service/temper-web",
    "cluster-service/voice-infer",
    "cluster-service/eso-rig",
    "cluster-service/auth-proxy",
    "cluster-service/buildkit",
    "cluster-service/buildkit-prune",
    "cluster-service/ci-storage-admin",
    "cluster-service/ci-storage-maintain",
    "cluster-service/cloudflared",
    "cluster-service/dcgm-exporter-daemonset",
    "cluster-service/ddns-headscale",
    "cluster-service/gotrue",
    "cluster-service/grafana",
    "cluster-service/headscale",
    "cluster-service/kube-state-metrics",
    "cluster-service/loki",
    "cluster-service/node-exporter-daemonset",
    "cluster-service/nvidia-device-plugin",
    "cluster-service/page-store",
    "cluster-service/pgbouncer",
    "cluster-service/pgbouncer-exporter",
    "cluster-service/pod-janitor",
    "cluster-service/postgres-annual-dump",
    "cluster-service/postgres-cnpg",
    "cluster-service/postgres-exporter",
    "cluster-service/postgrest",
    "cluster-service/prometheus",
    "cluster-service/promtail",
    "cluster-service/registry",
    "cluster-service/registry-gc",
    "cluster-service/git-transport",
    "cluster-service/gfs-promoter",
    "cluster-service/seaweedfs-backup-assets",
    "cluster-service/seaweedfs-backup-bulk",
    "cluster-service/seaweedfs-backup-cnpg",
    "cluster-service/seaweedfs-backup-longtail",
    "cluster-service/seaweedfs-etcd-snapshot",
    "cluster-service/seaweedfs-filer",
    "cluster-service/seaweedfs-maintenance",
    "cluster-service/seaweedfs-master",
    "cluster-service/seaweedfs-prune-sessions",
    "cluster-service/seaweedfs-s3-gateway",
    "cluster-service/seaweedfs-volume",
    "cluster-service/supabase-realtime",
    "cluster-service/supabase-studio",
    "cluster-service/tailnet-egress",
    "cluster-service/talos-subnet-router",
    "number-property/container-port",
    "number-property/replicas",
    "text-property/image",
    "text-property/manifest-code",
    "text-property/namespace",
    "text-property/resource-kind",
    "text-property/resource-name",
    "text-property/cluster-service-schedule",
  ],
  properties: [
    { pagePropertySlug: "resource-kind", required: true, many: false },
    { pagePropertySlug: "namespace", required: true, many: false },
    { pagePropertySlug: "resource-name", required: true, many: false },
    { pagePropertySlug: "image", required: true, many: false },
    { pagePropertySlug: "replicas", required: false, many: false },
    { pagePropertySlug: "container-port", required: false, many: false },
    { pagePropertySlug: "cluster-service-schedule", required: false, many: false },
    { pagePropertySlug: "manifest-code", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cluster service is one resource carrying a pod template.",
    },
    {
      invariantKind: "absence",
      statement: "The resource the cluster calls a Service is not one of these.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster service runs one copy unless the cluster service is spread across nodes on purpose.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service stands under the domain the cluster service serves.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service's page states the shape of the workload it is.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service states replicas only where its kind carries replicas.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster service states a container port only where its kind carries a container port.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster service the cluster starts on a schedule states that schedule.",
    },
    {
      invariantKind: "gap",
      statement: "The manifests a cluster service is applied as are emitted from its own page.",
    },
  ],
} as const satisfies PageType
