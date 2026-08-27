import { describe, expect, test } from "bun:test"
import { ApiObject, App, Chart } from "cdk8s"
import { synthMulti, synthOne } from "./cdk8s-synth"

describe("synthOne", () => {
  test("produces byte-identical yaml to the inline cdk8s ceremony", () => {
    const manifest = {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: "smoke" },
    }

    const inlineApp = new App()
    const inlineChart = new Chart(inlineApp, "namespace")
    new ApiObject(inlineChart, "namespace", manifest)
    const inlineYaml = inlineApp.synthYaml()

    const helperYaml = synthOne("namespace", "namespace", manifest)

    expect(helperYaml).toBe(inlineYaml)
  })

  test("renders kind, apiVersion, and metadata.name", () => {
    const yaml = synthOne("ns", "ns", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: "alpha" },
    })

    expect(yaml).toContain("apiVersion: v1")
    expect(yaml).toContain("kind: Namespace")
    expect(yaml).toContain("name: alpha")
  })
})

describe("synthMulti", () => {
  test("produces byte-identical yaml to the inline cdk8s ceremony with multiple ApiObjects", () => {
    const denyManifest = {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: { name: "default-deny", namespace: "alpha" },
      spec: { podSelector: {}, policyTypes: ["Ingress", "Egress"] },
    }
    const allowManifest = {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: { name: "allow-dns-egress", namespace: "alpha" },
      spec: { podSelector: {}, policyTypes: ["Egress"] },
    }

    const inlineApp = new App()
    const inlineChart = new Chart(inlineApp, "network-policies")
    new ApiObject(inlineChart, "default-deny", denyManifest)
    new ApiObject(inlineChart, "allow-dns-egress", allowManifest)
    const inlineYaml = inlineApp.synthYaml()

    const helperYaml = synthMulti("network-policies", [
      { id: "default-deny", manifest: denyManifest },
      { id: "allow-dns-egress", manifest: allowManifest },
    ])

    expect(helperYaml).toBe(inlineYaml)
  })

  test("emits multiple yaml documents joined by '---'", () => {
    const yaml = synthMulti("two-namespaces", [
      { id: "ns-a", manifest: { apiVersion: "v1", kind: "Namespace", metadata: { name: "a" } } },
      { id: "ns-b", manifest: { apiVersion: "v1", kind: "Namespace", metadata: { name: "b" } } },
    ])

    expect(yaml).toContain("name: a")
    expect(yaml).toContain("name: b")
    expect(yaml.split("---").length).toBeGreaterThan(1)
  })

  test("accepts an empty manifests array", () => {
    const yaml = synthMulti("empty", [])
    expect(yaml).toBe("")
  })
})
