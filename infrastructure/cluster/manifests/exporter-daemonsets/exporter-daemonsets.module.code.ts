import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { cgroupPsiCollectorContainer } from "../cgroup-psi-collector/cgroup-psi-collector.module.code.ts"
import {
  CGROUP_HIER_PATH,
  CGROUP_LOCAL_PATH,
  COLLECTOR_CONTAINER_NAME,
  METRIC_HIER_OOM_KILL,
  METRIC_LOCAL_OOM_KILL,
  PROM_FILE_PATH,
  PROM_FILENAME,
  TEXTFILE_DIR,
} from "../kubepods-oom-constants/kubepods-oom-constants.module.code.ts"
import {
  DCGM_EXPORTER_IMAGE,
  DCGM_EXPORTER_LABELS,
  DCGM_EXPORTER_SELECTOR_LABELS,
  KUBE_SYSTEM_NAMESPACE,
  NODE_EXPORTER_IMAGE,
  NODE_EXPORTER_LABELS,
  NODE_EXPORTER_SELECTOR_LABELS,
} from "../prometheus-constants/prometheus-constants.module.code.ts"

const COLLECTOR_LOOP = `while true; do
  local_kills=$(awk '/^oom_kill /{print $2}' ${CGROUP_LOCAL_PATH} 2>/dev/null)
  hier_kills=$(awk '/^oom_kill /{print $2}' ${CGROUP_HIER_PATH} 2>/dev/null)
  if [ -n "$local_kills" ] && [ -n "$hier_kills" ]; then
    tmp="${TEXTFILE_DIR}/.${PROM_FILENAME}.tmp"
    {
      echo "# HELP ${METRIC_LOCAL_OOM_KILL} OOM kills charged to the kubepods slice's own memory limit (cgroup v2 memory.events.local oom_kill)."
      echo "# TYPE ${METRIC_LOCAL_OOM_KILL} counter"
      echo "${METRIC_LOCAL_OOM_KILL} $local_kills"
      echo "# HELP ${METRIC_HIER_OOM_KILL} OOM kills anywhere beneath the kubepods slice (cgroup v2 memory.events oom_kill); proof-of-life for the local counter."
      echo "# TYPE ${METRIC_HIER_OOM_KILL} counter"
      echo "${METRIC_HIER_OOM_KILL} $hier_kills"
    } > "$tmp" && mv "$tmp" "${PROM_FILE_PATH}"
  fi
  sleep 30
done`

export function nodeExporterDaemonsetYaml(): string {
  return synthOne(KUBE_SYSTEM_NAMESPACE, "node-exporter-daemonset", {
    apiVersion: "apps/v1",
    kind: "DaemonSet",
    metadata: {
      name: "node-exporter",
      namespace: KUBE_SYSTEM_NAMESPACE,
      labels: NODE_EXPORTER_LABELS,
    },
    spec: {
      selector: { matchLabels: NODE_EXPORTER_SELECTOR_LABELS },
      updateStrategy: {
        type: "RollingUpdate",
        rollingUpdate: { maxUnavailable: 1 },
      },
      template: {
        metadata: { labels: NODE_EXPORTER_LABELS },
        spec: {
          hostNetwork: true,
          hostPID: true,
          containers: [
            {
              name: "node-exporter",
              image: NODE_EXPORTER_IMAGE,
              args: [
                "--path.procfs=/host/proc",
                "--path.sysfs=/host/sys",
                "--path.rootfs=/host/root",
                "--collector.filesystem.mount-points-exclude=^/(dev|proc|sys|var/lib/docker/.+|var/lib/kubelet/.+)($|/)",
                `--collector.textfile.directory=${TEXTFILE_DIR}`,
                "--web.listen-address=:9100",
              ],
              ports: [{ name: "metrics", containerPort: 9100, hostPort: 9100 }],
              resources: {
                requests: { cpu: "5m", memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65534,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              volumeMounts: [
                { name: "proc", mountPath: "/host/proc", readOnly: true },
                { name: "sys", mountPath: "/host/sys", readOnly: true },
                {
                  name: "root",
                  mountPath: "/host/root",
                  mountPropagation: "HostToContainer",
                  readOnly: true,
                },
                { name: "textfile", mountPath: TEXTFILE_DIR, readOnly: true },
              ],
            },
            {
              name: COLLECTOR_CONTAINER_NAME,
              image: "alpine:3.21",
              command: ["sh", "-c", COLLECTOR_LOOP],
              resources: {
                requests: { cpu: "10m", memory: "32Mi" },
                limits: { cpu: "10m", memory: "32Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65534,
                runAsGroup: 65534,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              volumeMounts: [
                { name: "sys", mountPath: "/host/sys", readOnly: true },
                { name: "textfile", mountPath: TEXTFILE_DIR },
              ],
            },
            cgroupPsiCollectorContainer(),
          ],
          tolerations: [{ operator: "Exists" }],
          volumes: [
            { name: "proc", hostPath: { path: "/proc" } },
            { name: "sys", hostPath: { path: "/sys" } },
            { name: "root", hostPath: { path: "/" } },
            { name: "textfile", emptyDir: { sizeLimit: "1Mi" } },
          ],
        },
      },
    },
  })
}

export function dcgmExporterDaemonsetYaml(): string {
  return synthOne(KUBE_SYSTEM_NAMESPACE, "dcgm-exporter-daemonset", {
    apiVersion: "apps/v1",
    kind: "DaemonSet",
    metadata: {
      name: "dcgm-exporter",
      namespace: KUBE_SYSTEM_NAMESPACE,
      labels: DCGM_EXPORTER_LABELS,
    },
    spec: {
      selector: { matchLabels: DCGM_EXPORTER_SELECTOR_LABELS },
      updateStrategy: {
        type: "RollingUpdate",
        rollingUpdate: { maxUnavailable: 1 },
      },
      template: {
        metadata: { labels: DCGM_EXPORTER_LABELS },
        spec: {
          nodeSelector: { "nvidia.com/gpu.present": "true" },
          runtimeClassName: "nvidia",
          containers: [
            {
              name: "dcgm-exporter",
              image: DCGM_EXPORTER_IMAGE,
              ports: [{ name: "metrics", containerPort: 9400, hostPort: 9400 }],
              env: [
                { name: "NVIDIA_VISIBLE_DEVICES", value: "all" },
                { name: "NVIDIA_DRIVER_CAPABILITIES", value: "all" },
              ],
              resources: {
                requests: { cpu: "5m", memory: "576Mi" },
                limits: { memory: "576Mi" },
              },
              securityContext: { privileged: true },
              volumeMounts: [
                {
                  name: "pod-resources",
                  mountPath: "/var/lib/kubelet/pod-resources",
                  readOnly: true,
                },
              ],
            },
          ],
          tolerations: [{ operator: "Exists" }],
          volumes: [
            {
              name: "pod-resources",
              hostPath: { path: "/var/lib/kubelet/pod-resources" },
            },
          ],
        },
      },
    },
  })
}
