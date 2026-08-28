import { describe, expect, test } from "bun:test"

import { workloadClassMemberKey } from "@infra/k8s-types/hostnames"
import {
  DEV_INPUT_PATH,
  deploymentManifest,
  MEMORY,
  NAMESPACE,
  namespaceManifest,
  REPLICAS,
  WINEPREFIX_PATH,
} from "./eso-rig.cluster-service.code.attachment"

describe("eso-rig manifests", () => {
  const podSpec = deploymentManifest.spec.template.spec
  const container = podSpec.containers[0]

  test("every construct carries metadata.name", () => {
    expect(namespaceManifest.metadata.name).toBe(NAMESPACE)
    expect(deploymentManifest.metadata.name).toBe("eso-rig")
    expect(deploymentManifest.metadata.namespace).toBe(NAMESPACE)
    expect(NAMESPACE).toBe("eso-rig")
  })

  test("targets the eso-rig workload class, and never a hostname", () => {
    const keys = Object.keys(podSpec.nodeSelector)
    expect(keys).toEqual([workloadClassMemberKey("eso-rig")])
    for (const key of keys) {
      expect(key).not.toContain("hostname")
      expect(key).not.toContain("gpu-vram")
    }
    expect("nodeName" in podSpec).toBe(false)
    expect(podSpec.runtimeClassName).toBe("nvidia")
  })

  test("claims exactly 1 GPU, equal across requests and limits", () => {
    expect(container.resources.requests["nvidia.com/gpu"]).toBe("1")
    expect(container.resources.limits["nvidia.com/gpu"]).toBe("1")
  })

  test("memory is Guaranteed at 8Gi (request == limit) and sized for node-06 co-tenancy", () => {
    expect(container.resources.requests.memory).toBe(MEMORY)
    expect(container.resources.limits.memory).toBe(MEMORY)
    expect(MEMORY).toBe("8Gi")
  })

  test("runs privileged — the actual /dev/uinput grant", () => {
    expect(container.securityContext.privileged).toBe(true)
  })

  test("does not mount /dev/uinput, and does live-bind /dev/input", () => {
    const volumes = podSpec.volumes
    const hostPaths = volumes.map((v) => v.hostPath.path)
    expect(hostPaths).not.toContain("/dev/uinput")
    expect(hostPaths).toContain(DEV_INPUT_PATH)
    expect(DEV_INPUT_PATH).toBe("/dev/input")

    const devInput = volumes.find((v) => v.hostPath.path === DEV_INPUT_PATH)
    expect(devInput?.hostPath.type).toBe("Directory")
    const devInputMount = container.volumeMounts.find((m) => m.name === devInput?.name)
    expect(devInputMount?.mountPath).toBe(DEV_INPUT_PATH)
  })

  test("the Wine prefix is node-local persistent storage, never ephemeral", () => {
    const prefix = podSpec.volumes.find((v) => v.hostPath.path === WINEPREFIX_PATH)
    expect(prefix).toBeDefined()
    expect(prefix?.hostPath.type).toBe("DirectoryOrCreate")
    expect(podSpec.volumes.some((v) => "emptyDir" in v)).toBe(false)

    const prefixMount = container.volumeMounts.find((m) => m.name === prefix?.name)
    expect(prefixMount?.mountPath).toBe(WINEPREFIX_PATH)
    const env = new Map(container.env.map((e) => [e.name, e.value]))
    expect(env.get("WINEPREFIX")).toBe(WINEPREFIX_PATH)
  })

  test("is scaled to zero and rolls by Recreate", () => {
    expect(deploymentManifest.spec.replicas).toBe(0)
    expect(REPLICAS).toBe(0)
    expect(deploymentManifest.spec.strategy.type).toBe("Recreate")
  })

  test("sets neither NVIDIA_* variable — each is owned by what it describes", () => {
    const env = new Map(container.env.map((e) => [e.name, e.value]))
    expect(env.has("NVIDIA_DRIVER_CAPABILITIES")).toBe(false)
    expect(env.has("NVIDIA_VISIBLE_DEVICES")).toBe(false)
    expect(container.resources.requests["nvidia.com/gpu"]).toBe("1")
    expect(container.resources.limits["nvidia.com/gpu"]).toBe("1")
  })
})
