import { describe, expect, test } from "bun:test"
import { buildNodePatch, PLACEHOLDER_SCHEMATIC_ID } from "./build-patch"
import { emitPatchYaml } from "./emit-yaml"
import { getCluster, getNode } from "./nodes"
import { ClusterIntent, NodeIntent } from "./schema"

const TEST_CA = "CA-PEM\n"
const TEST_CA_B64 = Buffer.from(TEST_CA, "utf8").toString("base64")

function patchFor(id: string, options?: { registryCa?: string }) {
  const node = getNode(id)
  return buildNodePatch(node, getCluster(node.cluster), PLACEHOLDER_SCHEMATIC_ID, options)
}

describe("buildNodePatch — control-plane (node-03, main)", () => {
  test("carries VIP, etcd quota, registries trust, and the cluster block", () => {
    const patch = patchFor("node-03", { registryCa: TEST_CA })
    expect(emitPatchYaml(patch)).toBe(
      `machine:
  type: controlplane
  network:
    hostname: node-03
    interfaces:
      - deviceSelector:
          physical: true
        dhcp: true
        vip:
          ip: 192.168.68.239
  install:
    diskSelector:
      type: ssd
      size: "> 256GB"
    image: factory.talos.dev/installer/PLACEHOLDER_SCHEMATIC_ID:v1.12.9
    extraKernelArgs:
      - talos.halt_if_installed=0
    wipe: false
  kernel:
    modules:
      - name: nvidia
      - name: nvidia_uvm
      - name: nvidia_drm
      - name: nvidia_modeset
  sysctls:
    net.core.bpf_jit_harden: "1"
  files:
    - path: /usr/local/etc/nvidia-container-runtime/config.toml
      op: overwrite
      permissions: 420
      content: |
        disable-require = false

        [nvidia-container-cli]
        environment = []
        debug = "/var/log/nvidia-container-cli.log"
        ldcache = "/usr/local/glibc/etc/ld.so.cache"
        ldconfig = "@/usr/local/glibc/sbin/ldconfig"
        load-kmods = false
        user = "0:0"

        [nvidia-container-runtime]
        debug = "/var/log/nvidia-container-runtime.log"
  registries:
    config:
      registry.registry.svc.cluster.local:5000:
        tls:
          ca: ${TEST_CA_B64}
    mirrors:
      registry.registry.svc.cluster.local:5000:
        endpoints:
          - http://192.168.68.75:30500
          - http://192.168.68.90:30500
          - http://192.168.68.93:30500
  nodeLabels:
    alanwalton.com/workload-class: build
    alanwalton.com/workload-class.build: "true"
    alanwalton.com/workload-class.database: "true"
    alanwalton.com/workload-class.control: "true"
    alanwalton.com/ci-enrollment: candidate
    nvidia.com/gpu.present: "true"
    alanwalton.com/gpu-vram-usable-mib: "5738"
    alanwalton.com/gpu-compute-cap: "7.5"
cluster:
  allowSchedulingOnControlPlanes: true
  network:
    podSubnets:
      - 10.244.0.0/16
    serviceSubnets:
      - 10.96.0.0/12
  apiServer:
    admissionControl:
      - name: PodSecurity
        configuration:
          apiVersion: pod-security.admission.config.k8s.io/v1
          kind: PodSecurityConfiguration
          defaults:
            enforce: privileged
            enforce-version: latest
            audit: privileged
            audit-version: latest
            warn: privileged
            warn-version: latest
          exemptions:
            usernames: []
            runtimeClasses: []
            namespaces: []
  etcd:
    extraArgs:
      quota-backend-bytes: "8589934592"
`
    )
  })
})

describe("buildNodePatch — worker (node-02, main)", () => {
  test("omits VIP, etcd, and the cluster block; keeps registries trust", () => {
    const patch = patchFor("node-02", { registryCa: TEST_CA })
    expect(patch).not.toHaveProperty("cluster")
    expect(patch).not.toHaveProperty("machine.etcd")
    expect(patch).not.toHaveProperty("machine.network.interfaces")
    expect(patch).toMatchObject({ machine: { type: "worker" } })
    expect(emitPatchYaml(patch)).toBe(
      `machine:
  type: worker
  network:
    hostname: node-02
  install:
    diskSelector:
      type: nvme
    image: factory.talos.dev/installer/PLACEHOLDER_SCHEMATIC_ID:v1.12.9
    extraKernelArgs:
      - talos.halt_if_installed=0
    wipe: false
  kernel:
    modules:
      - name: nvidia
      - name: nvidia_uvm
      - name: nvidia_drm
      - name: nvidia_modeset
  sysctls:
    net.core.bpf_jit_harden: "1"
  files:
    - path: /usr/local/etc/nvidia-container-runtime/config.toml
      op: overwrite
      permissions: 420
      content: |
        disable-require = false

        [nvidia-container-cli]
        environment = []
        debug = "/var/log/nvidia-container-cli.log"
        ldcache = "/usr/local/glibc/etc/ld.so.cache"
        ldconfig = "@/usr/local/glibc/sbin/ldconfig"
        load-kmods = false
        user = "0:0"

        [nvidia-container-runtime]
        debug = "/var/log/nvidia-container-runtime.log"
  registries:
    config:
      registry.registry.svc.cluster.local:5000:
        tls:
          ca: ${TEST_CA_B64}
    mirrors:
      registry.registry.svc.cluster.local:5000:
        endpoints:
          - http://192.168.68.75:30500
          - http://192.168.68.90:30500
          - http://192.168.68.93:30500
  nodeLabels:
    alanwalton.com/workload-class: database
    alanwalton.com/workload-class.database: "true"
    nvidia.com/gpu.present: "true"
    alanwalton.com/gpu-vram-usable-mib: "11165"
    alanwalton.com/gpu-compute-cap: "6.1"
    alanwalton.com/gpu-vram-usable-min.8gi: "true"
`
    )
  })
})

describe("buildNodePatch — registries", () => {
  test("omits the registries block when neither CA nor mirror endpoints are present", () => {
    const patch = patchFor("rehearsal-01")
    expect(patch).not.toHaveProperty("machine.registries")
  })

  test("emits mirrors-only (no config) when endpoints are present but no CA", () => {
    const patch = patchFor("node-05")
    expect(patch).toHaveProperty("machine.registries.mirrors")
    expect(patch).not.toHaveProperty("machine.registries.config")
  })

  test("attaches the CA to every declared registry host", () => {
    const node = getNode("node-03")
    const cluster = {
      ...getCluster("main"),
      registryHosts: ["a:5000", "b:5000"],
      registryMirrorEndpoints: [],
    }
    const patch = buildNodePatch(node, cluster, PLACEHOLDER_SCHEMATIC_ID, { registryCa: TEST_CA })
    expect(patch).toMatchObject({
      machine: {
        registries: {
          config: {
            "a:5000": { tls: { ca: TEST_CA_B64 } },
            "b:5000": { tls: { ca: TEST_CA_B64 } },
          },
        },
      },
    })
    expect(patch).not.toHaveProperty("machine.registries.mirrors")
  })

  test("attaches mirror endpoints to every declared registry host", () => {
    const node = getNode("node-03")
    const cluster = {
      ...getCluster("main"),
      registryHosts: ["a:5000", "b:5000"],
      registryMirrorEndpoints: ["http://10.0.0.1:30500"],
    }
    const patch = buildNodePatch(node, cluster, PLACEHOLDER_SCHEMATIC_ID)
    expect(patch).toMatchObject({
      machine: {
        registries: {
          mirrors: {
            "a:5000": { endpoints: ["http://10.0.0.1:30500"] },
            "b:5000": { endpoints: ["http://10.0.0.1:30500"] },
          },
        },
      },
    })
    expect(patch).not.toHaveProperty("machine.registries.config")
  })
})

describe("buildNodePatch — init role (single-node cluster)", () => {
  test("init carries the cluster block but no VIP (single-node cluster)", () => {
    const node = NodeIntent.parse({
      id: "node-99",
      cluster: "main",
      role: "init",
      installDisk: "/dev/sda",
    })
    const cluster = ClusterIntent.parse({ name: "single", talosVersion: "v1.10.0" })
    const patch = buildNodePatch(node, cluster, PLACEHOLDER_SCHEMATIC_ID)
    expect(patch).toHaveProperty("cluster")
    expect(patch).not.toHaveProperty("machine.network.interfaces")
    expect(patch).toMatchObject({ machine: { type: "init" } })
  })
})

describe("buildNodePatch — rehearsal cluster (QEMU VMs)", () => {
  test("control-plane rehearsal-01: bridge-subnet VIP, /dev/vda install, cluster block, no etcd quota", () => {
    const patch = patchFor("rehearsal-01", { registryCa: TEST_CA })
    expect(patch).toMatchObject({
      machine: {
        type: "controlplane",
        network: { interfaces: [{ vip: { ip: "10.5.0.100" } }] },
        install: { disk: "/dev/vda" },
      },
    })
    expect(patch).toHaveProperty("cluster")
    expect(patch).not.toHaveProperty("machine.etcd")
  })

  test("worker rehearsal-04: no VIP, no cluster block, /dev/vda install", () => {
    const patch = patchFor("rehearsal-04", { registryCa: TEST_CA })
    expect(patch).toMatchObject({ machine: { type: "worker", install: { disk: "/dev/vda" } } })
    expect(patch).not.toHaveProperty("cluster")
    expect(patch).not.toHaveProperty("machine.network.interfaces")
  })
})
