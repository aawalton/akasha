import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@akasha/k8s-types/hostnames"
import {
  COMPONENT_FILER,
  COMPONENT_MASTER,
  COMPONENT_S3_GATEWAY,
  COMPONENT_VOLUME,
  componentLabels,
  FILER_GOMEMLIMIT_MIB,
  FILER_GRPC_PORT,
  FILER_HTTP_PORT,
  FILER_MEMORY_LIMIT_MIB,
  IMAGE,
  MASTER_GRPC_PORT,
  MASTER_HTTP_PORT,
  METRICS_PORT,
  NAMESPACE,
  S3_GATEWAY_HTTP_PORT,
  selectorLabels,
  VOLUME_GRPC_PORT,
  VOLUME_HTTP_PORT,
} from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"

const POD_IP_ENV = {
  name: "POD_IP",
  valueFrom: { fieldRef: { fieldPath: "status.podIP" } },
}

const DATA_VOLUME = {
  name: "data",
  persistentVolumeClaim: { claimName: "seaweedfs-data" },
}

export function masterDeploymentYaml(): string {
  return synthOne(NAMESPACE, "master-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "master",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_MASTER),
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: selectorLabels(COMPONENT_MASTER) },
      template: {
        metadata: { labels: componentLabels(COMPONENT_MASTER) },
        spec: {
          nodeSelector: capabilitySelector("serve"),
          containers: [
            {
              name: "master",
              image: IMAGE,
              command: ["/usr/bin/weed"],
              args: [
                "-logtostderr=true",
                "master",
                "-ip=$(POD_IP)",
                "-ip.bind=0.0.0.0",
                `-port=${MASTER_HTTP_PORT}`,
                "-mdir=/data",
                "-defaultReplication=000",
                "-volumeSizeLimitMB=1024",
                `-metricsPort=${METRICS_PORT}`,
              ],
              env: [POD_IP_ENV],
              ports: [
                { name: "http", containerPort: MASTER_HTTP_PORT },
                { name: "grpc", containerPort: MASTER_GRPC_PORT },
                { name: "metrics", containerPort: METRICS_PORT },
              ],
              resources: {
                requests: { cpu: "50m", memory: "256Mi" },
                limits: { memory: "256Mi" },
              },
              readinessProbe: {
                httpGet: { path: "/cluster/status", port: MASTER_HTTP_PORT },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
              livenessProbe: {
                httpGet: { path: "/cluster/status", port: MASTER_HTTP_PORT },
                initialDelaySeconds: 30,
                periodSeconds: 15,
                failureThreshold: 5,
              },
              volumeMounts: [{ name: "data", mountPath: "/data", subPath: "master" }],
            },
          ],
          volumes: [DATA_VOLUME],
        },
      },
    },
  })
}

export function volumeDeploymentYaml(): string {
  return synthOne(NAMESPACE, "volume-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "volume",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_VOLUME),
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: selectorLabels(COMPONENT_VOLUME) },
      template: {
        metadata: { labels: componentLabels(COMPONENT_VOLUME) },
        spec: {
          nodeSelector: capabilitySelector("serve"),
          containers: [
            {
              name: "volume",
              image: IMAGE,
              args: [
                "volume",
                `-mserver=master.${NAMESPACE}.svc.cluster.local:${MASTER_HTTP_PORT}`,
                "-ip=$(POD_IP)",
                "-ip.bind=0.0.0.0",
                `-port=${VOLUME_HTTP_PORT}`,
                "-dir=/data",
                "-max=0",
                "-dataCenter=dc1",
                "-rack=rack1",
                `-metricsPort=${METRICS_PORT}`,
              ],
              env: [POD_IP_ENV],
              ports: [
                { name: "http", containerPort: VOLUME_HTTP_PORT },
                { name: "grpc", containerPort: VOLUME_GRPC_PORT },
                { name: "metrics", containerPort: METRICS_PORT },
              ],
              resources: {
                requests: { cpu: "100m", memory: "1Gi" },
                limits: { memory: "1Gi" },
              },
              readinessProbe: {
                httpGet: { path: "/status", port: VOLUME_HTTP_PORT },
                initialDelaySeconds: 10,
                periodSeconds: 10,
              },
              livenessProbe: {
                httpGet: { path: "/status", port: VOLUME_HTTP_PORT },
                initialDelaySeconds: 30,
                periodSeconds: 15,
                failureThreshold: 5,
              },
              volumeMounts: [{ name: "data", mountPath: "/data", subPath: "volume" }],
            },
          ],
          volumes: [DATA_VOLUME],
        },
      },
    },
  })
}

export function filerDeploymentYaml(): string {
  return synthOne(NAMESPACE, "filer-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "filer",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_FILER),
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: selectorLabels(COMPONENT_FILER) },
      template: {
        metadata: { labels: componentLabels(COMPONENT_FILER) },
        spec: {
          nodeSelector: capabilitySelector("serve"),
          containers: [
            {
              name: "filer",
              image: IMAGE,
              args: [
                "filer",
                `-master=master.${NAMESPACE}.svc.cluster.local:${MASTER_HTTP_PORT}`,
                "-ip=$(POD_IP)",
                "-ip.bind=0.0.0.0",
                `-port=${FILER_HTTP_PORT}`,
                "-defaultReplicaPlacement=000",
                "-concurrentUploadLimitMB=256",
                `-metricsPort=${METRICS_PORT}`,
              ],
              env: [
                POD_IP_ENV,
                { name: "WEED_LEVELDB2_ENABLED", value: "true" },
                { name: "WEED_LEVELDB2_DIR", value: "/data" },
                { name: "GOMEMLIMIT", value: `${FILER_GOMEMLIMIT_MIB}MiB` },
              ],
              ports: [
                { name: "http", containerPort: FILER_HTTP_PORT },
                { name: "grpc", containerPort: FILER_GRPC_PORT },
                { name: "metrics", containerPort: METRICS_PORT },
              ],
              resources: {
                requests: { cpu: "50m", memory: `${FILER_MEMORY_LIMIT_MIB}Mi` },
                limits: { memory: `${FILER_MEMORY_LIMIT_MIB}Mi` },
              },
              readinessProbe: {
                httpGet: { path: "/", port: FILER_HTTP_PORT },
                initialDelaySeconds: 10,
                periodSeconds: 10,
              },
              livenessProbe: {
                httpGet: { path: "/", port: FILER_HTTP_PORT },
                initialDelaySeconds: 30,
                periodSeconds: 15,
                failureThreshold: 5,
              },
              volumeMounts: [{ name: "data", mountPath: "/data", subPath: "filer" }],
            },
          ],
          volumes: [DATA_VOLUME],
        },
      },
    },
  })
}

export function s3GatewayDeploymentYaml(): string {
  return synthOne(NAMESPACE, "s3-gateway-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "s3-gateway",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_S3_GATEWAY),
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: selectorLabels(COMPONENT_S3_GATEWAY) },
      template: {
        metadata: {
          annotations: {
            "checksum/s3-config": "placeholder",
          },
          labels: componentLabels(COMPONENT_S3_GATEWAY),
        },
        spec: {
          nodeSelector: capabilitySelector("serve"),
          containers: [
            {
              name: "s3-gateway",
              image: IMAGE,
              args: [
                "s3",
                `-filer=filer.${NAMESPACE}.svc.cluster.local:${FILER_HTTP_PORT}`,
                "-ip.bind=0.0.0.0",
                `-port=${S3_GATEWAY_HTTP_PORT}`,
                "-config=/etc/seaweedfs/s3-config.json",
                "-allowEmptyFolder=false",
              ],
              ports: [{ name: "http", containerPort: S3_GATEWAY_HTTP_PORT }],
              resources: {
                requests: { cpu: "50m", memory: "256Mi" },
                limits: { memory: "256Mi" },
              },
              readinessProbe: {
                tcpSocket: { port: S3_GATEWAY_HTTP_PORT },
                initialDelaySeconds: 10,
                periodSeconds: 10,
              },
              livenessProbe: {
                tcpSocket: { port: S3_GATEWAY_HTTP_PORT },
                initialDelaySeconds: 30,
                periodSeconds: 15,
                failureThreshold: 5,
              },
              volumeMounts: [
                {
                  name: "s3-config",
                  mountPath: "/etc/seaweedfs",
                  readOnly: true,
                },
              ],
            },
          ],
          volumes: [
            {
              name: "s3-config",
              secret: {
                secretName: "seaweedfs-creds",
                items: [{ key: "s3-config.json", path: "s3-config.json" }],
              },
            },
          ],
        },
      },
    },
  })
}
