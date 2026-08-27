import { describe, expect, test } from "bun:test"
import { FILER_GOMEMLIMIT_MIB, FILER_MEMORY_LIMIT_MIB, METRICS_PORT } from "./synth-constants"
import {
  filerDeploymentYaml,
  masterDeploymentYaml,
  s3GatewayDeploymentYaml,
  volumeDeploymentYaml,
} from "./synth-deployments"

describe("seaweedfs metrics enablement (#14277)", () => {
  for (const [name, yamlFn] of [
    ["master", masterDeploymentYaml],
    ["volume", volumeDeploymentYaml],
    ["filer", filerDeploymentYaml],
  ] as const) {
    test(`${name} exposes the weed -metricsPort on :${METRICS_PORT} with a named metrics port`, () => {
      const yaml = yamlFn()
      expect(yaml).toContain(`-metricsPort=${METRICS_PORT}`)
      expect(yaml).toContain("name: metrics")
      expect(yaml).toContain(`containerPort: ${METRICS_PORT}`)
    })
  }
})

describe("s3-gateway config-checksum annotation (#16399)", () => {
  test("emits the literal placeholder for the workflow's sed to substitute", () => {
    expect(s3GatewayDeploymentYaml()).toContain("checksum/s3-config: placeholder")
  })

  test("never ships a real hash — a committed digest would be a constant that cannot roll", () => {
    expect(s3GatewayDeploymentYaml()).not.toMatch(/checksum\/s3-config:\s*"?[0-9a-f]{32}"?/)
  })
})

describe("filer heap bound (#18490)", () => {
  const UNACCOUNTED_FOOTPRINT_MIB = 74

  test("exports GOMEMLIMIT, so the runtime collects against the container ceiling", () => {
    const yaml = filerDeploymentYaml()
    expect(yaml).toContain("name: GOMEMLIMIT")
    expect(yaml).toContain(`value: ${FILER_GOMEMLIMIT_MIB}MiB`)
  })

  test("sizes the container from the constant the cap is derived from", () => {
    expect(filerDeploymentYaml()).toContain(`memory: ${FILER_MEMORY_LIMIT_MIB}Mi`)
  })

  test("holds the soft cap below the container limit it protects", () => {
    expect(FILER_GOMEMLIMIT_MIB).toBeLessThan(FILER_MEMORY_LIMIT_MIB)
  })

  test("reserves at least the footprint the soft cap does not account for", () => {
    expect(FILER_MEMORY_LIMIT_MIB - FILER_GOMEMLIMIT_MIB).toBeGreaterThanOrEqual(
      UNACCOUNTED_FOOTPRINT_MIB
    )
  })
})
