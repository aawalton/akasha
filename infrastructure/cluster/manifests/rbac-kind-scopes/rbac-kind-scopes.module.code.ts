export type KindScope =
  | { readonly scope: "namespaced" }
  | { readonly scope: "cluster"; readonly apiGroup: string; readonly resource: string }

export const KIND_SCOPE_REGISTRY: Readonly<Record<string, KindScope>> = {
  Namespace: { scope: "cluster", apiGroup: "", resource: "namespaces" },
  PersistentVolume: { scope: "cluster", apiGroup: "", resource: "persistentvolumes" },
  StorageClass: { scope: "cluster", apiGroup: "storage.k8s.io", resource: "storageclasses" },
  RuntimeClass: { scope: "cluster", apiGroup: "node.k8s.io", resource: "runtimeclasses" },
  ClusterIssuer: { scope: "cluster", apiGroup: "cert-manager.io", resource: "clusterissuers" },
  ClusterRole: {
    scope: "cluster",
    apiGroup: "rbac.authorization.k8s.io",
    resource: "clusterroles",
  },
  ClusterRoleBinding: {
    scope: "cluster",
    apiGroup: "rbac.authorization.k8s.io",
    resource: "clusterrolebindings",
  },
  Certificate: { scope: "namespaced" },
  Cluster: { scope: "namespaced" },
  ConfigMap: { scope: "namespaced" },
  CronJob: { scope: "namespaced" },
  DaemonSet: { scope: "namespaced" },
  Deployment: { scope: "namespaced" },
  EndpointSlice: { scope: "namespaced" },
  IPAddressPool: { scope: "namespaced" },
  Job: { scope: "namespaced" },
  L2Advertisement: { scope: "namespaced" },
  NetworkPolicy: { scope: "namespaced" },
  ObjectStore: { scope: "namespaced" },
  PersistentVolumeClaim: { scope: "namespaced" },
  Role: { scope: "namespaced" },
  RoleBinding: { scope: "namespaced" },
  ScheduledBackup: { scope: "namespaced" },
  Service: { scope: "namespaced" },
  ServiceAccount: { scope: "namespaced" },
  StatefulSet: { scope: "namespaced" },
}

export const NAMESPACED_KIND_TO_RESOURCE: Readonly<
  Record<string, { readonly apiGroup: string; readonly resource: string }>
> = {
  Certificate: { apiGroup: "cert-manager.io", resource: "certificates" },
  Cluster: { apiGroup: "postgresql.cnpg.io", resource: "clusters" },
  ConfigMap: { apiGroup: "", resource: "configmaps" },
  CronJob: { apiGroup: "batch", resource: "cronjobs" },
  DaemonSet: { apiGroup: "apps", resource: "daemonsets" },
  Deployment: { apiGroup: "apps", resource: "deployments" },
  EndpointSlice: { apiGroup: "discovery.k8s.io", resource: "endpointslices" },
  IPAddressPool: { apiGroup: "metallb.io", resource: "ipaddresspools" },
  Job: { apiGroup: "batch", resource: "jobs" },
  L2Advertisement: { apiGroup: "metallb.io", resource: "l2advertisements" },
  NetworkPolicy: { apiGroup: "networking.k8s.io", resource: "networkpolicies" },
  ObjectStore: { apiGroup: "barmancloud.cnpg.io", resource: "objectstores" },
  PersistentVolumeClaim: { apiGroup: "", resource: "persistentvolumeclaims" },
  Role: { apiGroup: "rbac.authorization.k8s.io", resource: "roles" },
  RoleBinding: { apiGroup: "rbac.authorization.k8s.io", resource: "rolebindings" },
  ScheduledBackup: { apiGroup: "postgresql.cnpg.io", resource: "scheduledbackups" },
  Service: { apiGroup: "", resource: "services" },
  ServiceAccount: { apiGroup: "", resource: "serviceaccounts" },
  StatefulSet: { apiGroup: "apps", resource: "statefulsets" },
}

export const APPLY_VERBS: readonly string[] = ["create", "patch"]
