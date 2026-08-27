import { describe, expect, test } from "bun:test"
import {
  GPU_COMPUTE_CAP_KEY,
  GPU_VRAM_TIERS,
  GPU_VRAM_USABLE_MIB_KEY,
  gpuVramUsableMinKey,
} from "@infra/k8s-types/hostnames"
import { buildNodePatch, PLACEHOLDER_SCHEMATIC_ID } from "./build-patch"
import { buildSchematic, schematicId } from "./build-schematic"
import { emitPatchYaml } from "./emit-yaml"
import { getCluster, getNode } from "./nodes"
import { MAIN_NODES } from "./nodes-main"
import { NodeIntent } from "./schema"

function patchFor(id: string, options?: { registryCa?: string }) {
  const node = getNode(id)
  return buildNodePatch(node, getCluster(node.cluster), PLACEHOLDER_SCHEMATIC_ID, options)
}

describe("derived schematic id (the boot image each node is pointed at)", () => {
  const NVIDIA_ONLY = "517164f327c5cd119977b7581257180e36ae64d210412c13d09d3f966b464ee1"
  const idFor = (id: string): string => schematicId(buildSchematic(getNode(id)))

  test("node-06 carries uinput, and only node-06 does", () => {
    expect(idFor("node-06")).toBe(
      "bb3af18ae6745ddc0f6804c1b49043135f0b95da3cefef3608441e41b2c98b53"
    )
  })

  test("the other five main nodes stay on the fleet-shared nvidia-only schematic", () => {
    for (const id of ["node-01", "node-02", "node-03", "node-04", "node-05"]) {
      expect(idFor(id)).toBe(NVIDIA_ONLY)
    }
  })

  test("every main node advertising a GPU declares both nvidia extensions", () => {
    for (const [id, node] of Object.entries(MAIN_NODES)) {
      if (node.nodeLabels["nvidia.com/gpu.present"] !== "true") continue
      expect(node.extensions, `${id} advertises a GPU`).toEqual(
        expect.arrayContaining([
          "siderolabs/nonfree-kmod-nvidia",
          "siderolabs/nvidia-container-toolkit",
        ])
      )
    }
  })
})

describe("GPU hardware labels (the attribute axis, #16049)", () => {
  const gpuNodes = Object.entries(MAIN_NODES).filter(
    ([, node]) => node.nodeLabels["nvidia.com/gpu.present"] === "true"
  )

  test("every GPU node declares observed usable VRAM and compute capability", () => {
    for (const [id, node] of gpuNodes) {
      expect(node.nodeLabels[GPU_VRAM_USABLE_MIB_KEY], `${id} usable VRAM`).toMatch(/^\d+$/)
      expect(node.nodeLabels[GPU_COMPUTE_CAP_KEY], `${id} compute cap`).toMatch(/^\d+\.\d+$/)
    }
  })

  test("each tier membership agrees with the usable VRAM it derives from", () => {
    for (const [id, node] of gpuNodes) {
      const usable = Number(node.nodeLabels[GPU_VRAM_USABLE_MIB_KEY])
      for (const tier of GPU_VRAM_TIERS) {
        const thresholdMib = Number(tier.replace("gi", "")) * 1024
        const declared = node.nodeLabels[gpuVramUsableMinKey(tier)] === "true"
        expect(declared, `${id} ${tier} membership vs ${usable} MiB usable`).toBe(
          usable >= thresholdMib
        )
      }
    }
  })

  test("the 8gi tier resolves to node-02 + node-06 — upscale's eligible set", () => {
    const eligible = gpuNodes
      .filter(([, node]) => node.nodeLabels[gpuVramUsableMinKey("8gi")] === "true")
      .map(([id]) => id)
    expect(eligible.sort()).toEqual(["node-02", "node-06"])
  })

  test("no node carries a GPU model label — capacity composes, identity does not", () => {
    for (const [id, node] of gpuNodes) {
      const modelish = Object.keys(node.nodeLabels).filter((k) => /model|gpu-name/.test(k))
      expect(modelish, `${id} declares no model-identity label`).toEqual([])
    }
  })
})

describe("buildNodePatch — extraMounts", () => {
  test("emits kubelet.extraMounts with bind type when present", () => {
    const node: NodeIntent = {
      ...getNode("node-05"),
      extraMounts: [
        { source: "/mnt/legacy", destination: "/var/legacy", options: ["bind", "rshared", "rw"] },
      ],
    }
    const patch = buildNodePatch(node, getCluster("main"), PLACEHOLDER_SCHEMATIC_ID)
    expect(patch).toMatchObject({
      machine: {
        kubelet: {
          extraMounts: [
            {
              source: "/mnt/legacy",
              destination: "/var/legacy",
              type: "bind",
              options: ["bind", "rshared", "rw"],
            },
          ],
        },
      },
    })
  })

  test("omits kubelet when no extraMounts", () => {
    expect(patchFor("node-05")).not.toHaveProperty("machine.kubelet")
  })
})

describe("buildNodePatch — VIP interface selector (probed bare-metal facts)", () => {
  test("every main control-plane member selects its VIP NIC by physical:true", () => {
    for (const id of ["node-01", "node-03", "node-05"]) {
      expect(patchFor(id)).toMatchObject({
        machine: {
          network: {
            interfaces: [{ deviceSelector: { physical: true }, vip: { ip: "192.168.68.239" } }],
          },
        },
      })
    }
  })
})

describe("buildNodePatch — install disk selector (USB-safe, probed bare-metal facts)", () => {
  test("node-06 selects its sole NVMe by type, not a /dev path", () => {
    expect(patchFor("node-06")).toMatchObject({
      machine: { install: { diskSelector: { type: "nvme" } } },
    })
    expect(patchFor("node-06")).not.toHaveProperty("machine.install.disk")
  })

  test("node-03 / node-04 select their internal SSD by type+size, excluding HDD and USB", () => {
    for (const id of ["node-03", "node-04"]) {
      expect(patchFor(id)).toMatchObject({
        machine: { install: { diskSelector: { type: "ssd", size: "> 256GB" } } },
      })
      expect(patchFor(id)).not.toHaveProperty("machine.install.disk")
    }
  })

  test("node-01 selects its internal SSD by type+size (probed Phase D: SU720 465GiB, HDD excluded)", () => {
    expect(patchFor("node-01")).toMatchObject({
      machine: { install: { diskSelector: { type: "ssd", size: "> 256GB" } } },
    })
    expect(patchFor("node-01")).not.toHaveProperty("machine.install.disk")
  })

  test("node-05 selects its sub-256GB SSD by type+model (probed Phase D: SU630 223GiB)", () => {
    expect(patchFor("node-05")).toMatchObject({
      machine: { install: { diskSelector: { type: "ssd", model: "ADATA SU630" } } },
    })
    expect(patchFor("node-05")).not.toHaveProperty("machine.install.disk")
  })

  test("node-02 selects its sole NVMe by type (probed Phase D: WD 931GiB, no /dev/sda)", () => {
    expect(patchFor("node-02")).toMatchObject({
      machine: { install: { diskSelector: { type: "nvme" } } },
    })
    expect(patchFor("node-02")).not.toHaveProperty("machine.install.disk")
  })
})

describe("buildNodePatch — nvidia kernel modules", () => {
  const main = getCluster("main")
  const base = getNode("node-05")
  const withExtensions = (extensions: readonly string[]): NodeIntent =>
    NodeIntent.parse({ ...base, extensions })

  test("derives machine.kernel.modules from the nvidia-open-gpu-kernel-modules extension", () => {
    const patch = buildNodePatch(
      withExtensions([
        "siderolabs/nvidia-open-gpu-kernel-modules",
        "siderolabs/nvidia-container-toolkit",
      ]),
      main,
      PLACEHOLDER_SCHEMATIC_ID
    )
    expect(patch).toMatchObject({
      machine: {
        kernel: {
          modules: [
            { name: "nvidia" },
            { name: "nvidia_uvm" },
            { name: "nvidia_drm" },
            { name: "nvidia_modeset" },
          ],
        },
      },
    })
  })

  test("derives machine.kernel.modules from the proprietary nonfree-kmod-nvidia extension", () => {
    const patch = buildNodePatch(
      withExtensions(["siderolabs/nonfree-kmod-nvidia", "siderolabs/nvidia-container-toolkit"]),
      main,
      PLACEHOLDER_SCHEMATIC_ID
    )
    expect(patch).toMatchObject({
      machine: {
        kernel: {
          modules: [
            { name: "nvidia" },
            { name: "nvidia_uvm" },
            { name: "nvidia_drm" },
            { name: "nvidia_modeset" },
          ],
        },
      },
    })
  })

  test("omits machine.kernel when no extensions are present", () => {
    const patch = buildNodePatch(withExtensions([]), main, PLACEHOLDER_SCHEMATIC_ID)
    expect(patch).not.toHaveProperty("machine.kernel")
  })

  test("omits machine.kernel when only the container-toolkit extension is present", () => {
    const patch = buildNodePatch(
      withExtensions(["siderolabs/nvidia-container-toolkit"]),
      main,
      PLACEHOLDER_SCHEMATIC_ID
    )
    expect(patch).not.toHaveProperty("machine.kernel")
  })

  test("derives the bpf_jit_harden sysctl and toolkit config.toml from a driver extension", () => {
    const patch = buildNodePatch(
      withExtensions(["siderolabs/nonfree-kmod-nvidia", "siderolabs/nvidia-container-toolkit"]),
      main,
      PLACEHOLDER_SCHEMATIC_ID
    )
    expect(patch).toMatchObject({
      machine: {
        sysctls: { "net.core.bpf_jit_harden": "1" },
        files: [
          {
            path: "/usr/local/etc/nvidia-container-runtime/config.toml",
            op: "overwrite",
            permissions: 0o644,
            content: expect.stringMatching(
              /ldcache = "\/usr\/local\/glibc\/etc\/ld\.so\.cache"[\s\S]*ldconfig = "@\/usr\/local\/glibc\/sbin\/ldconfig"/
            ),
          },
        ],
      },
    })
  })

  test("omits sysctls and files when no driver extension is present", () => {
    const patch = buildNodePatch(
      withExtensions(["siderolabs/nvidia-container-toolkit"]),
      main,
      PLACEHOLDER_SCHEMATIC_ID
    )
    expect(patch).not.toHaveProperty("machine.sysctls")
    expect(patch).not.toHaveProperty("machine.files")
  })
})

describe("buildNodePatch — kernelModules merge (node-declared + driver)", () => {
  const main = getCluster("main")
  const base = getNode("node-05")
  const withExtensionsAndModules = (
    extensions: readonly string[],
    kernelModules: readonly string[]
  ): NodeIntent => NodeIntent.parse({ ...base, extensions, kernelModules })

  test("merges node-declared kernelModules after the nvidia driver set into one kernel key", () => {
    const patch = buildNodePatch(
      withExtensionsAndModules(
        ["siderolabs/nonfree-kmod-nvidia", "siderolabs/nvidia-container-toolkit"],
        ["uinput"]
      ),
      main,
      PLACEHOLDER_SCHEMATIC_ID
    )
    expect(patch).toMatchObject({
      machine: {
        kernel: {
          modules: [
            { name: "nvidia" },
            { name: "nvidia_uvm" },
            { name: "nvidia_drm" },
            { name: "nvidia_modeset" },
            { name: "uinput" },
          ],
        },
      },
    })
  })

  test("emits a standalone kernel key from kernelModules alone when the node has no driver", () => {
    const patch = buildNodePatch(
      withExtensionsAndModules([], ["uinput"]),
      main,
      PLACEHOLDER_SCHEMATIC_ID
    )
    expect(patch).toMatchObject({ machine: { kernel: { modules: [{ name: "uinput" }] } } })
    expect(patch).not.toHaveProperty("machine.sysctls")
    expect(patch).not.toHaveProperty("machine.files")
  })

  test("node-06 emits ONE kernel block carrying the nvidia four plus uinput (real node)", () => {
    expect(emitPatchYaml(patchFor("node-06"))).toContain(
      `  kernel:
    modules:
      - name: nvidia
      - name: nvidia_uvm
      - name: nvidia_drm
      - name: nvidia_modeset
      - name: uinput
`
    )
  })

  test("the other five main nodes load the nvidia four and nothing else", () => {
    for (const id of ["node-01", "node-02", "node-03", "node-04", "node-05"]) {
      expect(getNode(id).kernelModules).toEqual([])
      expect(patchFor(id)).toMatchObject({
        machine: {
          kernel: {
            modules: [
              { name: "nvidia" },
              { name: "nvidia_uvm" },
              { name: "nvidia_drm" },
              { name: "nvidia_modeset" },
            ],
          },
        },
      })
    }
  })
})
