import { describe, expect, test } from "bun:test"
import {
  ClusterIntent,
  ExtraMount,
  ImageFactorySchematic,
  NodeIntent,
  UserVolumeSpec,
} from "./schema"

const BASE_NODE = {
  id: "node-99",
  cluster: "main",
  role: "init",
  installDisk: "/dev/sda",
} as const

describe("NodeIntent", () => {
  test("accepts a valid node-NN id", () => {
    expect(() => NodeIntent.parse({ ...BASE_NODE })).not.toThrow()
  })

  test("rejects non-node-NN ids", () => {
    expect(() => NodeIntent.parse({ ...BASE_NODE, id: "node-7" })).toThrow()
  })

  test("accepts a rehearsal-NN id (throwaway QEMU-VM cluster)", () => {
    expect(() =>
      NodeIntent.parse({ ...BASE_NODE, id: "rehearsal-01", cluster: "rehearsal" })
    ).not.toThrow()
  })

  test("rejects an unknown id prefix", () => {
    expect(() => NodeIntent.parse({ ...BASE_NODE, id: "vm-01" })).toThrow()
  })

  test("rejects non-/dev/ install disks", () => {
    expect(() => NodeIntent.parse({ ...BASE_NODE, installDisk: "sda" })).toThrow()
  })

  test("requires a cluster", () => {
    const { cluster, ...withoutCluster } = BASE_NODE
    expect(() => NodeIntent.parse(withoutCluster)).toThrow()
  })

  test("defaults collection fields when absent", () => {
    const parsed = NodeIntent.parse({ ...BASE_NODE })
    expect(parsed.extensions).toEqual([])
    expect(parsed.kernelModules).toEqual([])
    expect(parsed.nodeLabels).toEqual({})
    expect(parsed.extraKernelArgs).toEqual([])
    expect(parsed.userVolumes).toEqual([])
    expect(parsed.extraMounts).toEqual([])
    expect(parsed.ephemeralDiskSelector).toBeUndefined()
  })

  test("allows ephemeralDiskSelector on control-plane / init nodes", () => {
    expect(() =>
      NodeIntent.parse({
        ...BASE_NODE,
        role: "controlplane",
        ephemeralDiskSelector: "!disk.rotational",
      })
    ).not.toThrow()
  })

  test("rejects ephemeralDiskSelector on workers (etcd does not run there)", () => {
    expect(() =>
      NodeIntent.parse({ ...BASE_NODE, role: "worker", ephemeralDiskSelector: "!disk.rotational" })
    ).toThrow()
  })
})

describe("UserVolumeSpec", () => {
  test("accepts a kebab-case name with a CEL disk selector", () => {
    const parsed = UserVolumeSpec.parse({ name: "seaweedfs", diskSelector: "!system_disk" })
    expect(parsed.grow).toBe(false)
    expect(parsed.filesystem).toBe("xfs")
  })

  test("rejects a non-kebab-case name", () => {
    expect(() =>
      UserVolumeSpec.parse({ name: "Seaweed_FS", diskSelector: "!system_disk" })
    ).toThrow()
  })

  test("rejects a name longer than 34 chars (Talos cap)", () => {
    expect(() => UserVolumeSpec.parse({ name: "a".repeat(35), diskSelector: "x" })).toThrow()
  })
})

describe("ExtraMount", () => {
  test("defaults options to bind/rshared/rw", () => {
    const parsed = ExtraMount.parse({ source: "/var/lib/x", destination: "/var/lib/x" })
    expect(parsed.options).toEqual(["bind", "rshared", "rw"])
  })

  test("rejects relative paths", () => {
    expect(() => ExtraMount.parse({ source: "var/lib/x", destination: "/var/lib/x" })).toThrow()
  })
})

describe("ClusterIntent", () => {
  test("accepts a v<x>.<y>.<z> talos version", () => {
    expect(() => ClusterIntent.parse({ name: "main", talosVersion: "v1.10.0" })).not.toThrow()
  })

  test("rejects non-semver talos versions", () => {
    expect(() => ClusterIntent.parse({ name: "main", talosVersion: "1.10" })).toThrow()
  })

  test("defaults CIDRs + scheduling + registry hosts", () => {
    const parsed = ClusterIntent.parse({ name: "main", talosVersion: "v1.10.0" })
    expect(parsed.podSubnet).toBe("10.244.0.0/16")
    expect(parsed.serviceSubnet).toBe("10.96.0.0/12")
    expect(parsed.allowSchedulingOnControlPlanes).toBe(true)
    expect(parsed.registryHosts).toEqual([])
    expect(parsed.controlPlaneVip).toBeUndefined()
  })

  test("accepts a dotted-quad control-plane VIP", () => {
    expect(() =>
      ClusterIntent.parse({
        name: "main",
        talosVersion: "v1.10.0",
        controlPlaneVip: "192.168.68.239",
      })
    ).not.toThrow()
  })

  test("rejects a non-IPv4 control-plane VIP", () => {
    expect(() =>
      ClusterIntent.parse({ name: "main", talosVersion: "v1.10.0", controlPlaneVip: "vip.local" })
    ).toThrow()
  })
})

describe("ImageFactorySchematic", () => {
  test("round-trips through parse without loss", () => {
    const input = {
      customization: {
        systemExtensions: {
          officialExtensions: [
            "siderolabs/nvidia-open-gpu-kernel-modules",
            "siderolabs/nvidia-container-toolkit",
          ],
        },
      },
    }
    expect(ImageFactorySchematic.parse(input)).toEqual(input)
  })
})
