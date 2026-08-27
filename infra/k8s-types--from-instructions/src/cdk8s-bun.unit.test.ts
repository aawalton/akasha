import { describe, expect, test } from "bun:test"
import { ApiObject, App, Chart } from "cdk8s"

describe("cdk8s loads under Bun", () => {
  test("App.synthYaml produces yaml from a Chart with one ApiObject", () => {
    const app = new App()
    const chart = new Chart(app, "smoke", { namespace: "default" })
    new ApiObject(chart, "configmap", {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: { name: "smoke", namespace: "default" },
      data: { hello: "world" },
    })

    const yaml = app.synthYaml()

    expect(yaml).toContain("apiVersion: v1")
    expect(yaml).toContain("kind: ConfigMap")
    expect(yaml).toContain("name: smoke")
    expect(yaml).toContain("hello: world")
  })

  test("two Charts in one App produce independent yaml documents joined by ---", () => {
    const app = new App()
    const chartA = new Chart(app, "a")
    new ApiObject(chartA, "ns-a", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: "a" },
    })
    const chartB = new Chart(app, "b")
    new ApiObject(chartB, "ns-b", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: "b" },
    })

    const yaml = app.synthYaml()

    expect(yaml).toContain("name: a")
    expect(yaml).toContain("name: b")
    expect(yaml.split("---").length).toBeGreaterThan(1)
  })
})
