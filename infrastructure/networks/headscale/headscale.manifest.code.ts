import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/cluster/k8s-types/k8s-namespace/k8s-namespace.module.code.ts"
import { secretChecksum } from "akasha/infrastructure/cluster/k8s-types/secret-checksum/secret-checksum.module.code.ts"
import { ApiObject, App, Chart } from "cdk8s"
import {
  CONTROL_PLANE_LABELS,
  CONTROL_PLANE_SELECTOR_LABELS,
  HEADSCALE_IMAGE,
  LITESTREAM_IMAGE,
  NAMESPACE,
  NAMESPACE_LABELS,
  TLS_LABELS,
} from "../headscale-constants/headscale-constants.module.code.ts"
import {
  configmapYaml,
  litestreamConfigmapYaml,
  policyConfigmapYaml,
} from "./modules/configmaps/headscale-configmaps.module.code.ts"
import { networkPolicyYaml } from "./modules/network-policies/headscale-network-policies.module.code.ts"

const TLS_SECRET_NAME = "headscale-tls"
const S3_CREDS_SECRET_NAME = "headscale-s3-creds"
const S3_CREDS_KEYS = ["access_key", "secret_key"]

const LITESTREAM_S3_ENV = [
  {
    name: "LITESTREAM_ACCESS_KEY_ID",
    valueFrom: { secretKeyRef: { name: S3_CREDS_SECRET_NAME, key: "access_key" } },
  },
  {
    name: "LITESTREAM_SECRET_ACCESS_KEY",
    valueFrom: { secretKeyRef: { name: S3_CREDS_SECRET_NAME, key: "secret_key" } },
  },
]

const LITESTREAM_SECURITY_CONTEXT = {
  runAsNonRoot: true,
  runAsUser: 1000,
  runAsGroup: 1000,
  readOnlyRootFilesystem: true,
  allowPrivilegeEscalation: false,
  capabilities: { drop: ["ALL"] },
}

const LITESTREAM_VOLUME_MOUNTS = [
  { name: "data", mountPath: "/var/lib/headscale" },
  {
    name: "litestream-config",
    mountPath: "/etc/litestream.yml",
    subPath: "litestream.yml",
    readOnly: true,
  },
  { name: "tmp", mountPath: "/tmp" },
]

function statefulsetYaml(): string {
  return synthOne(NAMESPACE, "statefulset", {
    apiVersion: "apps/v1",
    kind: "StatefulSet",
    metadata: {
      name: "headscale",
      namespace: NAMESPACE,
      labels: CONTROL_PLANE_LABELS,
    },
    spec: {
      serviceName: "headscale",
      replicas: 1,
      updateStrategy: { type: "RollingUpdate" },
      selector: { matchLabels: CONTROL_PLANE_SELECTOR_LABELS },
      template: {
        metadata: {
          labels: CONTROL_PLANE_LABELS,
          annotations: {
            "checksum/tls": secretChecksum(NAMESPACE, TLS_SECRET_NAME, ["tls.crt", "tls.key"]),
            "checksum/s3-creds": secretChecksum(NAMESPACE, S3_CREDS_SECRET_NAME, S3_CREDS_KEYS),
          },
        },
        spec: {
          terminationGracePeriodSeconds: 30,
          nodeSelector: workloadClassMemberSelector("control"),
          securityContext: { fsGroup: 1000 },
          initContainers: [
            {
              name: "litestream-restore",
              image: LITESTREAM_IMAGE,
              args: [
                "restore",
                "-if-db-not-exists",
                "-if-replica-exists",
                "-config",
                "/etc/litestream.yml",
                "/var/lib/headscale/db.sqlite",
              ],
              env: LITESTREAM_S3_ENV,
              volumeMounts: LITESTREAM_VOLUME_MOUNTS,
              resources: {
                requests: { cpu: "10m", memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: LITESTREAM_SECURITY_CONTEXT,
            },
          ],
          containers: [
            {
              name: "headscale",
              image: HEADSCALE_IMAGE,
              args: ["serve", "-c", "/headscale-config/config.yaml"],
              ports: [
                { name: "https", containerPort: 8443, protocol: "TCP" },
                { name: "metrics", containerPort: 9090, protocol: "TCP" },
              ],
              volumeMounts: [
                { name: "config", mountPath: "/headscale-config", readOnly: true },
                { name: "policy", mountPath: "/headscale-policy", readOnly: true },
                { name: "secrets", mountPath: "/headscale-secrets", readOnly: true },
                { name: "tls", mountPath: "/headscale-tls", readOnly: true },
                { name: "data", mountPath: "/var/lib/headscale" },
                { name: "run", mountPath: "/var/run/headscale" },
              ],
              resources: {
                requests: { cpu: "50m", memory: "256Mi" },
                limits: { memory: "256Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                runAsGroup: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              readinessProbe: {
                httpGet: { path: "/health", port: "https", scheme: "HTTPS" },
                initialDelaySeconds: 5,
                periodSeconds: 10,
                timeoutSeconds: 3,
                failureThreshold: 3,
              },
              livenessProbe: {
                httpGet: { path: "/health", port: "https", scheme: "HTTPS" },
                initialDelaySeconds: 15,
                periodSeconds: 30,
                timeoutSeconds: 5,
                failureThreshold: 3,
              },
            },
            {
              name: "litestream",
              image: LITESTREAM_IMAGE,
              args: ["replicate", "-config", "/etc/litestream.yml"],
              env: LITESTREAM_S3_ENV,
              volumeMounts: LITESTREAM_VOLUME_MOUNTS,
              resources: {
                requests: { cpu: "10m", memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: LITESTREAM_SECURITY_CONTEXT,
            },
          ],
          volumes: [
            {
              name: "config",
              configMap: {
                name: "headscale-config",
                items: [{ key: "config.yaml", path: "config.yaml" }],
              },
            },
            {
              name: "policy",
              configMap: {
                name: "headscale-policy",
                items: [{ key: "policy.hujson", path: "policy.hujson" }],
              },
            },
            {
              name: "litestream-config",
              configMap: {
                name: "headscale-litestream",
                items: [{ key: "litestream.yml", path: "litestream.yml" }],
              },
            },
            {
              name: "secrets",
              secret: { secretName: "headscale-secrets", defaultMode: 0o400 },
            },
            {
              name: "tls",
              secret: { secretName: TLS_SECRET_NAME, defaultMode: 0o400 },
            },
            { name: "run", emptyDir: {} },
            { name: "tmp", emptyDir: {} },
            { name: "data", emptyDir: {} },
          ],
        },
      },
    },
  })
}

function certificateYaml(): string {
  const app = new App()
  const chart = new Chart(app, NAMESPACE)
  new ApiObject(chart, "certificate", {
    apiVersion: "cert-manager.io/v1",
    kind: "Certificate",
    metadata: {
      name: "headscale-tls",
      namespace: NAMESPACE,
      labels: TLS_LABELS,
    },
    spec: {
      secretName: TLS_SECRET_NAME,
      secretTemplate: {
        labels: TLS_LABELS,
      },
      issuerRef: {
        name: "letsencrypt-prod",
        kind: "ClusterIssuer",
      },
      dnsNames: ["headscale.alanwalton.com"],
      duration: "2160h",
      renewBefore: "720h",
    },
  })
  return app.synthYaml()
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "headscale",
      namespace: NAMESPACE,
      labels: CONTROL_PLANE_LABELS,
      annotations: {
        "metallb.universe.tf/loadBalancerIPs": "192.168.68.240",
      },
    },
    spec: {
      type: "LoadBalancer",
      externalTrafficPolicy: "Cluster",
      selector: CONTROL_PLANE_SELECTOR_LABELS,
      ports: [
        {
          name: "https",
          port: 443,
          targetPort: "https",
          nodePort: 30443,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(NAMESPACE, NAMESPACE_LABELS) },
    { name: "configmap", yaml: configmapYaml() },
    { name: "policy-configmap", yaml: policyConfigmapYaml() },
    { name: "litestream-configmap", yaml: litestreamConfigmapYaml() },
    { name: "certificate", yaml: certificateYaml() },
    { name: "network-policy", yaml: networkPolicyYaml() },
    { name: "service", yaml: serviceYaml() },
    { name: "statefulset", yaml: statefulsetYaml() },
  ]
}
