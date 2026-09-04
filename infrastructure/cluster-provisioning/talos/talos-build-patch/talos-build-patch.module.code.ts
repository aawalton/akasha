import type {
  ClusterIntent,
  MachineConfigPatch,
  NodeIntent,
} from "../talos-schema/talos-schema.module.code.ts"

export const PLACEHOLDER_SCHEMATIC_ID = "PLACEHOLDER_SCHEMATIC_ID"

export type BuildPatchOptions = Readonly<{
  registryCa?: string
}>

function isControlPlane(role: NodeIntent["role"]): boolean {
  return role === "controlplane" || role === "init"
}

const NVIDIA_KERNEL_MODULES = ["nvidia", "nvidia_uvm", "nvidia_drm", "nvidia_modeset"] as const

const NVIDIA_CONTAINER_RUNTIME_CONFIG = `disable-require = false

[nvidia-container-cli]
environment = []
debug = "/var/log/nvidia-container-cli.log"
ldcache = "/usr/local/glibc/etc/ld.so.cache"
ldconfig = "@/usr/local/glibc/sbin/ldconfig"
load-kmods = false
user = "0:0"

[nvidia-container-runtime]
debug = "/var/log/nvidia-container-runtime.log"
`

function hasNvidiaDriver(node: NodeIntent): boolean {
  return node.extensions.some(
    (e) =>
      e === "siderolabs/nvidia-open-gpu-kernel-modules" || e === "siderolabs/nonfree-kmod-nvidia"
  )
}

function kernelModulesBlock(node: NodeIntent): Record<string, unknown> {
  const names = [...(hasNvidiaDriver(node) ? NVIDIA_KERNEL_MODULES : []), ...node.kernelModules]
  if (names.length === 0) return {}
  return { kernel: { modules: names.map((name) => ({ name })) } }
}

function nvidiaDriverBlocks(node: NodeIntent): Record<string, unknown> {
  if (!hasNvidiaDriver(node)) return {}
  return {
    sysctls: { "net.core.bpf_jit_harden": "1" },
    files: [
      {
        path: "/usr/local/etc/nvidia-container-runtime/config.toml",
        op: "overwrite",
        permissions: 0o644,
        content: NVIDIA_CONTAINER_RUNTIME_CONFIG,
      },
    ],
  }
}

const PERMISSIVE_POD_SECURITY = {
  name: "PodSecurity",
  configuration: {
    apiVersion: "pod-security.admission.config.k8s.io/v1",
    kind: "PodSecurityConfiguration",
    defaults: {
      enforce: "privileged",
      "enforce-version": "latest",
      audit: "privileged",
      "audit-version": "latest",
      warn: "privileged",
      "warn-version": "latest",
    },
    exemptions: { usernames: [], runtimeClasses: [], namespaces: [] },
  },
} as const

function registriesConfig(
  hosts: readonly string[],
  caPem: string | undefined,
  mirrorEndpoints: readonly string[]
): Record<string, unknown> {
  const ca = caPem !== undefined ? Buffer.from(caPem, "utf8").toString("base64") : undefined
  const config: Record<string, unknown> = {}
  const mirrors: Record<string, unknown> = {}
  for (const host of hosts) {
    if (ca !== undefined) config[host] = { tls: { ca } }
    if (mirrorEndpoints.length > 0) mirrors[host] = { endpoints: [...mirrorEndpoints] }
  }
  const registries: Record<string, unknown> = {}
  if (ca !== undefined) registries.config = config
  if (mirrorEndpoints.length > 0) registries.mirrors = mirrors
  return { registries }
}

export function buildNodePatch(
  node: NodeIntent,
  cluster: ClusterIntent,
  schematicId: string,
  options: BuildPatchOptions = {}
): MachineConfigPatch {
  const installImage = `factory.talos.dev/installer/${schematicId}:${cluster.talosVersion}`
  const controlPlane = isControlPlane(node.role)

  const machine: Record<string, unknown> = {
    type: node.role,
    network: {
      hostname: node.id,
      ...(controlPlane &&
        cluster.controlPlaneVip !== undefined && {
          interfaces: [
            {
              deviceSelector: { physical: true },
              dhcp: true,
              vip: { ip: cluster.controlPlaneVip },
            },
          ],
        }),
    },
    install: {
      ...(node.installDisk !== undefined
        ? { disk: node.installDisk }
        : { diskSelector: { ...node.installDiskSelector } }),
      image: installImage,
      ...(node.extraKernelArgs.length > 0 && { extraKernelArgs: [...node.extraKernelArgs] }),
      wipe: false,
    },
    ...kernelModulesBlock(node),
    ...nvidiaDriverBlocks(node),
    ...(cluster.registryHosts.length > 0 &&
      (options.registryCa !== undefined || cluster.registryMirrorEndpoints.length > 0) &&
      registriesConfig(cluster.registryHosts, options.registryCa, cluster.registryMirrorEndpoints)),
    ...(node.extraMounts.length > 0 && {
      kubelet: {
        extraMounts: node.extraMounts.map((m) => ({
          source: m.source,
          destination: m.destination,
          type: "bind",
          options: [...m.options],
        })),
      },
    }),
    ...(Object.keys(node.nodeLabels).length > 0 && {
      nodeLabels: { ...node.nodeLabels },
    }),
  }

  const clusterBlock = controlPlane
    ? {
        cluster: {
          allowSchedulingOnControlPlanes: cluster.allowSchedulingOnControlPlanes,
          network: {
            podSubnets: [cluster.podSubnet],
            serviceSubnets: [cluster.serviceSubnet],
          },
          apiServer: { admissionControl: [PERMISSIVE_POD_SECURITY] },
          ...(cluster.etcdQuotaBytes !== undefined && {
            etcd: { extraArgs: { "quota-backend-bytes": String(cluster.etcdQuotaBytes) } },
          }),
        },
      }
    : {}

  return { machine, ...clusterBlock }
}
