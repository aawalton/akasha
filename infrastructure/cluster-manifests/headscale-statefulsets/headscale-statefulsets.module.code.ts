import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"
import {
  CONTROL_PLANE_LABELS,
  CONTROL_PLANE_SELECTOR_LABELS,
  HEADSCALE_IMAGE,
  LITESTREAM_IMAGE,
  NAMESPACE,
  SUBNET_ROUTER_LABELS,
  SUBNET_ROUTER_SELECTOR_LABELS,
  TAILSCALE_IMAGE,
} from "../headscale-constants/headscale-constants.module.code.ts"

const LITESTREAM_S3_ENV = [
  {
    name: "LITESTREAM_ACCESS_KEY_ID",
    valueFrom: { secretKeyRef: { name: "headscale-s3-creds", key: "access_key" } },
  },
  {
    name: "LITESTREAM_SECRET_ACCESS_KEY",
    valueFrom: { secretKeyRef: { name: "headscale-s3-creds", key: "secret_key" } },
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
  { name: "tmp", mountPath: "/var/tmp" },
]

export function statefulsetYaml(): string {
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
          annotations: { "checksum/s3-creds": "placeholder" },
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
              secret: { secretName: "headscale-tls", defaultMode: 0o400 },
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

export function subnetRouterDeploymentYaml(): string {
  return synthOne(NAMESPACE, "subnet-router-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "talos-subnet-router",
      namespace: NAMESPACE,
      labels: SUBNET_ROUTER_LABELS,
    },
    spec: {
      replicas: 1,
      selector: { matchLabels: SUBNET_ROUTER_SELECTOR_LABELS },
      template: {
        metadata: { labels: SUBNET_ROUTER_LABELS },
        spec: {
          terminationGracePeriodSeconds: 30,
          hostAliases: [
            {
              ip: "192.168.68.240",
              hostnames: ["headscale.alanwalton.com"],
            },
          ],
          containers: [
            {
              name: "tailscale",
              image: TAILSCALE_IMAGE,
              env: [
                {
                  name: "TS_AUTHKEY",
                  valueFrom: {
                    secretKeyRef: { name: "subnet-router-auth", key: "TS_AUTHKEY" },
                  },
                },
                {
                  name: "TS_EXTRA_ARGS",
                  value:
                    "--login-server=https://headscale.alanwalton.com --advertise-routes=10.244.0.0/16,10.96.0.0/12 --accept-dns=false",
                },
                { name: "TS_USERSPACE", value: "true" },
                { name: "TS_STATE_DIR", value: "/var/lib/tailscale" },
                { name: "TS_HOSTNAME", value: "talos-subnet-router" },
                { name: "TS_KUBE_SECRET", value: "" },
              ],
              volumeMounts: [
                { name: "state", mountPath: "/var/lib/tailscale" },
                { name: "tmp", mountPath: "/var/tmp" },
                { name: "run", mountPath: "/run" },
              ],
              resources: {
                requests: { cpu: "50m", memory: "1Gi" },
                limits: { memory: "1Gi" },
              },
              securityContext: {
                runAsUser: 0,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
          volumes: [
            { name: "tmp", emptyDir: {} },
            { name: "run", emptyDir: {} },
            { name: "state", emptyDir: {} },
          ],
        },
      },
    },
  })
}
