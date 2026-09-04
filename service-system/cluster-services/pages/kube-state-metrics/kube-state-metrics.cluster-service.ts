import type { ClusterService } from "../../cluster-service.page-type.ts"

export const kubeStateMetrics = {
  id: "01a06812-2380-742f-b9bc-e1bb91eceda6",
  pageTypeSlug: "cluster-service",
  slug: "kube-state-metrics",
  definition: "the server that publishes the state of the cluster's own objects as metrics",
  resourceKind: "Deployment",
  namespace: "prometheus",
  resourceName: "kube-state-metrics",
  image: "registry.k8s.io/kube-state-metrics/kube-state-metrics:v2.13.0",
  replicas: 1,
  containerPort: 8080,
  manifestCode:
    "akasha/service-system/cluster-services/pages/kube-state-metrics/kube-state-metrics.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
