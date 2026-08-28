import { describe, expect, it } from "bun:test"
import { describeDrift, generatedPathFor, pathHasComponent, reachedThroughSrc } from "./manifests"

describe("reachedThroughSrc", () => {
  it("keeps a service the k8s package holds in its own source root", () => {
    expect(reachedThroughSrc("infra/k8s/src/grafana/grafana.cluster-service.code.attachment.ts")).toBe(false)
  })

  it("skips a service reached through some other package's source root", () => {
    expect(reachedThroughSrc("temper/web/src/deploy/k8s/synth.ts")).toBe(true)
  })

  it("skips a src nested below the k8s package's own source root", () => {
    expect(reachedThroughSrc("infra/k8s/src/grafana/src/synth.ts")).toBe(true)
  })
})

describe("pathHasComponent", () => {
  it("matches the service component naming the package", () => {
    expect(pathHasComponent("infra/k8s/src/grafana/grafana.cluster-service.code.attachment.ts", "grafana")).toBe(true)
  })

  it("matches either component of a nested service", () => {
    const nested = "infra/k8s/postgres/gfs-promoter/synth.ts"
    expect(pathHasComponent(nested, "postgres")).toBe(true)
    expect(pathHasComponent(nested, "gfs-promoter")).toBe(true)
  })

  it("never matches a structural component, which names no service", () => {
    for (const structural of ["k8s", "deploy", "src", "synth.ts"]) {
      expect(pathHasComponent("infra/k8s/src/grafana/grafana.cluster-service.code.attachment.ts", structural)).toBe(false)
    }
  })

  it("matches a whole component only, never a substring of one", () => {
    expect(pathHasComponent("infra/k8s/src/grafana/grafana.cluster-service.code.attachment.ts", "graf")).toBe(false)
  })
})

describe("generatedPathFor", () => {
  it("lands the manifest under the synth file's own generated directory", () => {
    expect(
      generatedPathFor("/repo/infra/k8s/src/grafana/synth.ts", "grafana-deployment")
    ).toBe("/repo/infra/k8s/src/grafana/generated/grafana-deployment.generated.yaml")
  })
})

describe("describeDrift", () => {
  it("reports a file synth produces but disk lacks, named from the repo root", () => {
    expect(describeDrift("/repo/pkg/generated/x.generated.yaml", "body", "/repo")).toBe(
      "pkg/generated/x.generated.yaml: missing — synth.ts produces this file but it is not on disk"
    )
  })
})
