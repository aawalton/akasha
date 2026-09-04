import type { NonResourceRule, Rule } from "@akasha/workflow-language/rbac-types"

export const clusterRoleRules: ReadonlyArray<(Rule | NonResourceRule) & { comment?: string }> = [
  {
    apiGroups: [""],
    resources: ["namespaces"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    comment:
      "PVs (create for provisioned volumes, delete for Released PV cleanup).\n  # watch is required so this SA can grant `watch` to other ClusterRoles\n  # (kube-state-metrics needs it to publish PV metrics) — RBAC escalation\n  # guard demands the granter holds every verb being granted.",
    apiGroups: [""],
    resources: ["persistentvolumes"],
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"],
  },
  {
    comment: "Namespace-scoped RBAC (create Roles/RoleBindings in any namespace for app deploys)",
    apiGroups: ["rbac.authorization.k8s.io"],
    resources: ["roles", "rolebindings"],
    verbs: ["get", "list", "create", "update", "patch"],
  },
  {
    comment:
      "Cluster-scoped RBAC — locked to known resources only (prevents privilege escalation)\n  # create: resourceNames can't restrict it, so it's in a separate rule below\n  # list: resourceNames can't restrict collection verbs, omitted intentionally\n  #\n  # Every name a synth.ts the discovery globs reach (the DISCOVERY_GLOBS in\n  # infrastructure/k8s-synth/synth-discovery/synth-discovery.module.code.ts) emits as a\n  # ClusterRole or ClusterRoleBinding MUST appear here, otherwise the\n  # second-and-onward server-side-apply (a patch op) 403s — first-time\n  # apply succeeds via the unrestricted create rule below, masking the\n  # gap until the next deploy. Enforced by `ops check-rbac-cluster-resource-names`.",
    apiGroups: ["rbac.authorization.k8s.io"],
    resources: ["clusterroles", "clusterrolebindings"],
    verbs: ["get", "update", "patch"],
    resourceNames: [
      "pipeline-engine-cluster-deploy",
      "prometheus",
      "kube-state-metrics",
      "promtail",
      "pod-janitor",
    ],
  },
  {
    comment:
      "create is separate because resourceNames can't restrict it — any ClusterRole/Binding\n  # can be created, but K8s RBAC escalation prevention ensures the SA can only grant\n  # permissions it already holds (see escalation rules below)",
    apiGroups: ["rbac.authorization.k8s.io"],
    resources: ["clusterroles", "clusterrolebindings"],
    verbs: ["create"],
  },
  {
    comment:
      "watch is required so this SA can grant `watch` on serviceaccounts to\n  # other ClusterRoles (kube-state-metrics publishes SA metrics) — RBAC\n  # escalation guard demands the granter holds every verb being granted.",
    apiGroups: [""],
    resources: ["serviceaccounts"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    comment:
      "Needed so the SA can grant apps/deployments verbs in namespace Roles\n  # (K8s RBAC escalation prevention requires the granter to hold the permissions)",
    apiGroups: ["apps"],
    resources: ["deployments"],
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"],
  },
  {
    comment: "Escalation prevention: namespace Roles grant these sub-resource verbs",
    apiGroups: ["apps"],
    resources: ["deployments/scale"],
    verbs: ["get", "patch"],
  },
  {
    apiGroups: ["apps"],
    resources: ["deployments/status"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    comment:
      "Escalation prevention: namespace Roles grant write verbs on core resources\n  # (the monitoring rule below only covers get/list/watch)",
    apiGroups: [""],
    resources: ["services", "configmaps", "secrets"],
    verbs: ["get", "list", "create", "update", "patch"],
  },
  {
    comment:
      "A Service backed by something outside the cluster carries no selector, so no\n  # controller writes its EndpointSlice and the pipeline applies one alongside it.",
    apiGroups: ["discovery.k8s.io"],
    resources: ["endpointslices"],
    verbs: ["get", "list", "create", "update", "patch"],
  },
  {
    comment:
      "Escalation prevention: namespace Roles grant write verbs on PVCs.\n  # delete is additionally required for one-time immutable-field migrations\n  # (nodeAffinity, capacity) where the PVC+PV must be recreated.",
    apiGroups: [""],
    resources: ["persistentvolumeclaims"],
    verbs: ["create", "update", "patch", "delete"],
  },
  {
    comment: "Escalation prevention: namespace Roles grant pods/exec create",
    apiGroups: [""],
    resources: ["pods/exec"],
    verbs: ["create"],
  },
  {
    comment: "Escalation prevention: namespace Roles grant write verbs on cronjobs",
    apiGroups: ["batch"],
    resources: ["cronjobs"],
    verbs: ["get", "list", "create", "update", "patch", "delete"],
  },
  {
    comment: "Escalation prevention: namespace Roles grant write verbs on PDBs",
    apiGroups: ["policy"],
    resources: ["poddisruptionbudgets"],
    verbs: ["get", "list", "create", "update", "patch"],
  },
  {
    comment:
      "Escalation prevention: prometheus namespace Role grants pod delete for\n  # pre-rollout cleanup of terminal-state pods (Recreate strategy hangs on them)",
    apiGroups: [""],
    resources: ["pods", "pods/log"],
    verbs: ["get", "list", "watch", "delete"],
  },
  {
    comment:
      "Per-node CI benchmark family c-observed (countOutOfCpuEvents,\n  # @akasha/cluster-api/cluster-jobs): lists core v1 Events\n  # cluster-wide (GET /api/v1/events?fieldSelector=reason=OutOfcpu), then\n  # attributes each to a node client-side via source.host. Cluster scope is\n  # required, not a convenience: an OutOfcpu Event lands in the REJECTED\n  # pod's own namespace, and the candidate benchmark nodes (01/03/04/05) run\n  # no ci-namespace pods (CI step pods are node-06-pinned), so a namespaced\n  # `ci` Role would observe ~zero of the cross-namespace rejections the\n  # instrument exists to count. Read-only; Events are low-sensitivity and\n  # this SA already reads cluster-wide (nodes, PVs, services). watch is\n  # included for parity with the other read rules and future streaming use.",
    apiGroups: [""],
    resources: ["events"],
    verbs: ["get", "list", "watch"],
  },
  {
    comment:
      "RBAC escalation prevention: the SA must hold all permissions it grants via\n  # monitoring ClusterRoles (prometheus, kube-state-metrics, promtail)",
    apiGroups: [""],
    resources: [
      "nodes",
      "nodes/proxy",
      "nodes/metrics",
      "services",
      "services/proxy",
      "endpoints",
      "configmaps",
      "secrets",
      "resourcequotas",
      "replicationcontrollers",
      "limitranges",
      "persistentvolumeclaims",
    ],
    resourcesRaw: `["nodes", "nodes/proxy", "nodes/metrics", "services", "services/proxy", "endpoints",
                "configmaps", "secrets", "resourcequotas", "replicationcontrollers",
                "limitranges", "persistentvolumeclaims"]`,
    verbs: ["get", "list", "watch"],
  },
  {
    comment: "Escalation prevention: namespace Roles grant write verbs on statefulsets",
    apiGroups: ["apps"],
    resources: ["statefulsets"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    apiGroups: ["apps"],
    resources: ["statefulsets/status"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    comment: "Escalation prevention: namespace Roles grant write verbs on daemonsets",
    apiGroups: ["apps"],
    resources: ["daemonsets", "daemonsets/status"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    comment:
      "get is required by the surge branch of pod selection\n  # (changes/workflow-language/pod-selection/pod-selection.module.code.ts): with more than one Running\n  # pod it reads each ReplicaSet BY NAME to roll it up to its owning Deployment,\n  # and refuses to act on a pod it cannot prove belongs to the rollout. Reading\n  # a named object needs `get`, which `list` does not confer. That call falls\n  # back to an empty string on any error, so a 403 there read as an unset\n  # ownerReference rather than as a denial — added under #18632, when\n  # `ops check-rbac-pipelines` first modelled `rs` and reported the gap.",
    apiGroups: ["apps"],
    resources: ["replicasets"],
    verbs: ["get", "list", "watch"],
  },
  {
    apiGroups: ["batch"],
    resources: ["cronjobs"],
    verbs: ["list", "watch"],
  },
  {
    apiGroups: ["batch"],
    resources: ["jobs"],
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"],
  },
  {
    apiGroups: ["autoscaling"],
    resources: ["horizontalpodautoscalers"],
    verbs: ["list", "watch"],
  },
  {
    apiGroups: ["networking.k8s.io"],
    resources: ["ingresses"],
    verbs: ["get", "list", "watch"],
  },
  {
    comment:
      "Escalation prevention: namespace Roles grant write verbs on networkpolicies.\n  # watch is required so this SA can grant `watch` to other ClusterRoles\n  # (kube-state-metrics publishes NetworkPolicy metrics).",
    apiGroups: ["networking.k8s.io"],
    resources: ["networkpolicies"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    apiGroups: ["extensions"],
    resources: ["ingresses"],
    verbs: ["get", "list", "watch"],
  },
  {
    comment: "StorageClasses (delete+recreate for immutable fields like reclaimPolicy)",
    apiGroups: ["storage.k8s.io"],
    resources: ["storageclasses"],
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"],
  },
  {
    comment:
      "RuntimeClass `nvidia` — server-side applied by the primitives foundation\n  # workflow so the nvidia-device-plugin pods' `runtimeClassName: nvidia` resolves\n  # (#11996). Cluster-scoped, applied the same way as the StorageClass above.",
    apiGroups: ["node.k8s.io"],
    resources: ["runtimeclasses"],
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"],
  },
  {
    apiGroups: ["storage.k8s.io"],
    resources: ["volumeattachments"],
    verbs: ["list", "watch"],
  },
  {
    apiGroups: ["certificates.k8s.io"],
    resources: ["certificatesigningrequests"],
    verbs: ["list", "watch"],
  },
  {
    apiGroups: ["rbac.authorization.k8s.io"],
    resources: ["clusterroles", "clusterrolebindings"],
    verbs: ["list", "watch"],
  },
  {
    apiGroups: ["authorization.k8s.io"],
    resources: ["subjectaccessreviews"],
    verbs: ["create"],
  },
  {
    apiGroups: ["authentication.k8s.io"],
    resources: ["tokenreviews"],
    verbs: ["create"],
  },
  {
    comment:
      "Escalation prevention: metallb namespace Role grants write verbs on MetalLB CRs\n  # (IPAddressPool + L2Advertisement). MetalLB controller itself is installed\n  # out-of-band under admin kubeconfig — pipeline-engine only manages the CRs.",
    apiGroups: ["metallb.io"],
    resources: ["ipaddresspools", "l2advertisements"],
    verbs: ["get", "list", "create", "update", "patch"],
  },
  {
    comment:
      "cert-manager CRs. ClusterIssuer is cluster-scoped (applied directly by\n  # pipeline-engine). Certificate is namespaced — granted via per-package Roles\n  # (e.g., headscale) and listed here for escalation coverage. cert-manager\n  # controller itself is installed out-of-band under admin kubeconfig.",
    apiGroups: ["cert-manager.io"],
    resources: ["clusterissuers", "certificates"],
    verbs: ["get", "list", "create", "update", "patch"],
  },
  {
    comment:
      "Escalation prevention: the postgres namespace Role (infrastructure/cluster-manifests/postgres-rbac/postgres-rbac.module.code.ts)\n  # grants write verbs on the CloudNativePG `Cluster` CR (#11608) and the daily\n  # `ScheduledBackup` CR (#11723) so pipeline-engine can apply them. The CNPG\n  # operator itself is installed under admin kubeconfig — pipeline-engine only\n  # manages the CRs.",
    apiGroups: ["postgresql.cnpg.io"],
    resources: ["clusters", "scheduledbackups"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    comment:
      "Escalation prevention: the postgres namespace Role (infrastructure/cluster-manifests/postgres-rbac/postgres-rbac.module.code.ts)\n  # grants write verbs on the Barman Cloud `ObjectStore` CR so pipeline-engine\n  # can apply the postgres-cnpg backup destination (#11723). The Barman Cloud\n  # plugin itself is installed under admin kubeconfig — pipeline-engine only\n  # manages the CR.",
    apiGroups: ["barmancloud.cnpg.io"],
    resources: ["objectstores"],
    verbs: ["get", "list", "watch", "create", "update", "patch"],
  },
  {
    nonResourceURLs: ["/metrics", "/metrics/cadvisor"],
    verbs: ["get"],
  } satisfies NonResourceRule & { comment?: string },
]
