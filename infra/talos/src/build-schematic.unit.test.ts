import { describe, expect, test } from "bun:test"
import { buildSchematic, schematicId } from "./build-schematic"
import { emitSchematicYaml } from "./emit-yaml"
import type { ImageFactoryExtension, NodeIntent } from "./schema"

describe("buildSchematic", () => {
  const TEST_NODE: NodeIntent = {
    id: "node-99",
    cluster: "main",
    role: "init",
    installDisk: "/dev/sda",
    extraKernelArgs: ["talos.halt_if_installed=0"],
    kernelModules: [],
    extensions: [],
    nodeLabels: {},
    userVolumes: [],
    extraMounts: [],
  }

  test("emits an empty extensions list plus the halt_if_installed=0 recovery kernel arg", () => {
    expect(buildSchematic(TEST_NODE)).toEqual({
      customization: {
        systemExtensions: { officialExtensions: [] },
        extraKernelArgs: ["talos.halt_if_installed=0"],
      },
    })
  })

  test("includes NVIDIA extensions when declared", () => {
    const schematic = buildSchematic({
      id: "node-99",
      cluster: "main",
      role: "worker",
      installDisk: "/dev/sda",
      extraKernelArgs: [],
      kernelModules: [],
      extensions: [
        "siderolabs/nvidia-open-gpu-kernel-modules",
        "siderolabs/nvidia-container-toolkit",
      ],
      nodeLabels: {},
      userVolumes: [],
      extraMounts: [],
    })
    expect(schematic.customization.systemExtensions.officialExtensions).toEqual([
      "siderolabs/nvidia-open-gpu-kernel-modules",
      "siderolabs/nvidia-container-toolkit",
    ])
  })

  test("yaml emission matches a stable golden snapshot", () => {
    const yaml = emitSchematicYaml(buildSchematic(TEST_NODE))
    expect(yaml).toBe(
      `customization:
  systemExtensions:
    officialExtensions: []
  extraKernelArgs:
    - talos.halt_if_installed=0
`
    )
  })
})

describe("schematicId — reproduces the factory's content-addressed id offline", () => {
  const NVIDIA_PAIR = [
    "siderolabs/nonfree-kmod-nvidia",
    "siderolabs/nvidia-container-toolkit",
  ] as const
  const idFor = (
    extensions: readonly ImageFactoryExtension[],
    extraKernelArgs: readonly string[] = ["talos.halt_if_installed=0"]
  ): string =>
    schematicId(
      buildSchematic({
        id: "node-99",
        cluster: "main",
        role: "worker",
        installDisk: "/dev/sda",
        extraKernelArgs: [...extraKernelArgs],
        kernelModules: [],
        extensions: [...extensions],
        nodeLabels: {},
        userVolumes: [],
        extraMounts: [],
      })
    )

  test("the nvidia pair yields the fleet-shared id every node ran before #16002", () => {
    expect(idFor(NVIDIA_PAIR)).toBe(
      "517164f327c5cd119977b7581257180e36ae64d210412c13d09d3f966b464ee1"
    )
  })

  test("appending uinput to the nvidia pair yields node-06's id", () => {
    expect(idFor([...NVIDIA_PAIR, "siderolabs/uinput"])).toBe(
      "bb3af18ae6745ddc0f6804c1b49043135f0b95da3cefef3608441e41b2c98b53"
    )
  })

  test("the SAME extension set in a different ORDER is a different schematic", () => {
    expect(idFor(["siderolabs/uinput", ...NVIDIA_PAIR])).toBe(
      "4ada585a9af6a560495906eaa13b2c9c7b1f2e9faa42e67b6f1577074d33f48d"
    )
  })

  test("dropping the nvidia pair to write only uinput yields a wholly different id", () => {
    expect(idFor(["siderolabs/uinput"])).toBe(
      "95a11c4cfddc395d91fd045daf1ed6904dd4cfb00e78f27bcc026faf2e144401"
    )
  })

  test("extraKernelArgs are part of the hashed content, and omitted when empty", () => {
    expect(idFor(NVIDIA_PAIR, [])).toBe(
      "0412a9a6369c0fb55e913cdfcbf4ad6ca3fab6e56ab71198ec4b58ad7e7a4ddd"
    )
  })
})
