import { describe, expect, test } from "bun:test"
import { kubernetesLabels, selectorOf } from "./labels"

describe("kubernetesLabels", () => {
  test("returns all five keys when every field is supplied", () => {
    const labels = kubernetesLabels({
      name: "app",
      instance: "app",
      component: "control-plane",
      partOf: "platform",
      managedBy: "deploy-script",
    })

    expect(labels).toEqual({
      "app.kubernetes.io/name": "app",
      "app.kubernetes.io/instance": "app",
      "app.kubernetes.io/component": "control-plane",
      "app.kubernetes.io/part-of": "platform",
      "app.kubernetes.io/managed-by": "deploy-script",
    })
  })

  test("omits optional keys whose values are not supplied (namespace shape)", () => {
    const labels = kubernetesLabels({
      name: "app",
      managedBy: "deploy-script",
    })

    expect(labels).toEqual({
      "app.kubernetes.io/name": "app",
      "app.kubernetes.io/managed-by": "deploy-script",
    })
  })

  test("includes only the supplied subset when partOf is omitted", () => {
    const labels = kubernetesLabels({
      name: "app",
      instance: "app",
      component: "data-plane",
      managedBy: "deploy-script",
    })

    expect(labels).toEqual({
      "app.kubernetes.io/name": "app",
      "app.kubernetes.io/instance": "app",
      "app.kubernetes.io/component": "data-plane",
      "app.kubernetes.io/managed-by": "deploy-script",
    })
  })

  test("emits keys in canonical order regardless of input order", () => {
    const labels = kubernetesLabels({
      managedBy: "deploy-script",
      partOf: "platform",
      component: "x",
      instance: "app",
      name: "app",
    })

    expect(Object.keys(labels)).toEqual([
      "app.kubernetes.io/name",
      "app.kubernetes.io/instance",
      "app.kubernetes.io/component",
      "app.kubernetes.io/part-of",
      "app.kubernetes.io/managed-by",
    ])
  })
})

describe("selectorOf", () => {
  const fullLabels = kubernetesLabels({
    name: "app",
    instance: "app",
    component: "control-plane",
    partOf: "platform",
    managedBy: "deploy-script",
  })

  test("name-instance mode returns name + instance only", () => {
    const selector = selectorOf(fullLabels, "name-instance")

    expect(selector).toEqual({
      "app.kubernetes.io/name": "app",
      "app.kubernetes.io/instance": "app",
    })
  })

  test("name-instance-component mode returns name + instance + component", () => {
    const selector = selectorOf(fullLabels, "name-instance-component")

    expect(selector).toEqual({
      "app.kubernetes.io/name": "app",
      "app.kubernetes.io/instance": "app",
      "app.kubernetes.io/component": "control-plane",
    })
  })

  test("throws when name-instance mode is requested but instance is missing", () => {
    const namespaceLabels = kubernetesLabels({ name: "app", managedBy: "deploy-script" })
    expect(() => selectorOf(namespaceLabels, "name-instance")).toThrow()
  })

  test("throws when name-instance-component mode is requested but component is missing", () => {
    const labels = kubernetesLabels({ name: "app", instance: "app", managedBy: "deploy-script" })
    expect(() => selectorOf(labels, "name-instance-component")).toThrow()
  })
})
