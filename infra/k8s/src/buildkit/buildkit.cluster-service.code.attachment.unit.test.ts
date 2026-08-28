import { describe, expect, test } from "bun:test"
import synth, { BUILDKIT_GOMEMLIMIT_GIB, BUILDKIT_MEMORY_LIMIT_GIB } from "./buildkit.cluster-service.code.attachment"

function deploymentYaml(): string {
  const entry = synth().find((e) => e.name === "deployment")
  if (entry === undefined) throw new Error("synth() emitted no `deployment` entry")
  return entry.yaml
}

describe("buildkit heap bound (#18713)", () => {
  const UNACCOUNTED_FOOTPRINT_GIB = 4

  test("exports GOMEMLIMIT, so the runtime collects against the container ceiling", () => {
    const yaml = deploymentYaml()
    expect(yaml).toContain("name: GOMEMLIMIT")
    expect(yaml).toContain(`value: ${BUILDKIT_GOMEMLIMIT_GIB}GiB`)
  })

  test("sizes the container from the constant the cap is derived from", () => {
    expect(deploymentYaml()).toContain(`memory: ${BUILDKIT_MEMORY_LIMIT_GIB}Gi`)
  })

  test("holds the soft cap below the container limit it protects", () => {
    expect(BUILDKIT_GOMEMLIMIT_GIB).toBeLessThan(BUILDKIT_MEMORY_LIMIT_GIB)
  })

  test("reserves at least the footprint the soft cap does not account for", () => {
    expect(BUILDKIT_MEMORY_LIMIT_GIB - BUILDKIT_GOMEMLIMIT_GIB).toBeGreaterThanOrEqual(
      UNACCOUNTED_FOOTPRINT_GIB
    )
  })
})

describe("buildkit debug listener (#18713)", () => {
  test("runs the daemon with a debug address, so the runtime can be read back", () => {
    expect(deploymentYaml()).toContain("--debugaddr")
  })

  test("binds the debug listener to loopback rather than a routable address", () => {
    const yaml = deploymentYaml()
    expect(yaml).toMatch(/--debugaddr[\s\S]{0,40}127\.0\.0\.1:/)
    expect(yaml).not.toMatch(/--debugaddr[\s\S]{0,40}0\.0\.0\.0:/)
  })
})
