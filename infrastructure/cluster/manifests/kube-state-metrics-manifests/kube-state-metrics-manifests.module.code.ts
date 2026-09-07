import { synthMulti, synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@akasha/k8s-types/hostnames"
import {
  KUBE_STATE_METRICS_IMAGE,
  KUBE_STATE_METRICS_LABELS,
  KUBE_STATE_METRICS_SELECTOR_LABELS,
  NAMESPACE,
} from "../prometheus-constants/prometheus-constants.module.code.ts"

export function kubeStateMetricsRbacYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "kube-state-metrics-serviceaccount",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: "kube-state-metrics",
          namespace: NAMESPACE,
          labels: KUBE_STATE_METRICS_LABELS,
        },
      },
    },
    {
      id: "kube-state-metrics-clusterrole",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRole",
        metadata: {
          name: "kube-state-metrics",
          labels: KUBE_STATE_METRICS_LABELS,
        },
        rules: [
          {
            apiGroups: [""],
            resources: [
              "configmaps",
              "secrets",
              "nodes",
              "pods",
              "services",
              "serviceaccounts",
              "resourcequotas",
              "replicationcontrollers",
              "limitranges",
              "persistentvolumeclaims",
              "persistentvolumes",
              "namespaces",
              "endpoints",
            ],
            verbs: ["list", "watch"],
          },
          {
            apiGroups: ["apps"],
            resources: ["statefulsets", "daemonsets", "deployments", "replicasets"],
            verbs: ["list", "watch"],
          },
          {
            apiGroups: ["batch"],
            resources: ["cronjobs", "jobs"],
            verbs: ["list", "watch"],
          },
          {
            apiGroups: ["autoscaling"],
            resources: ["horizontalpodautoscalers"],
            verbs: ["list", "watch"],
          },
          {
            apiGroups: ["networking.k8s.io"],
            resources: ["ingresses"],
            verbs: ["list", "watch"],
          },
          {
            apiGroups: ["storage.k8s.io"],
            resources: ["storageclasses", "volumeattachments"],
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
        ],
      },
    },
    {
      id: "kube-state-metrics-clusterrolebinding",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRoleBinding",
        metadata: {
          name: "kube-state-metrics",
          labels: KUBE_STATE_METRICS_LABELS,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: "kube-state-metrics",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "kube-state-metrics",
            namespace: NAMESPACE,
          },
        ],
      },
    },
  ])
}

export function kubeStateMetricsDeploymentYaml(): string {
  return synthOne(NAMESPACE, "kube-state-metrics-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "kube-state-metrics",
      namespace: NAMESPACE,
      labels: KUBE_STATE_METRICS_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: KUBE_STATE_METRICS_SELECTOR_LABELS },
      template: {
        metadata: { labels: KUBE_STATE_METRICS_LABELS },
        spec: {
          serviceAccountName: "kube-state-metrics",
          nodeSelector: capabilitySelector("database"),
          containers: [
            {
              name: "kube-state-metrics",
              image: KUBE_STATE_METRICS_IMAGE,
              ports: [
                { name: "http-metrics", containerPort: 8080 },
                { name: "telemetry", containerPort: 8081 },
              ],
              resources: {
                requests: { cpu: "5m", memory: "96Mi" },
                limits: { memory: "96Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65534,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              livenessProbe: {
                httpGet: { path: "/healthz", port: 8080 },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
              readinessProbe: {
                httpGet: { path: "/", port: 8081 },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
            },
          ],
        },
      },
    },
  })
}

export function kubeStateMetricsServiceYaml(): string {
  return synthOne(NAMESPACE, "kube-state-metrics-service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "kube-state-metrics",
      namespace: NAMESPACE,
      labels: KUBE_STATE_METRICS_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: KUBE_STATE_METRICS_SELECTOR_LABELS,
      ports: [
        {
          name: "http-metrics",
          port: 8080,
          targetPort: "http-metrics",
          protocol: "TCP",
        },
      ],
    },
  })
}
