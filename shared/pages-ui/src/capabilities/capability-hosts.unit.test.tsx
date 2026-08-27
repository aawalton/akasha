import { afterEach, describe, expect, test } from "bun:test"
import type { ComponentType } from "react"
import {
  capabilityHostEntries,
  registerCapabilityHost,
  unregisterCapabilityHost,
} from "./capability-hosts"

const HostA: ComponentType = () => null
const HostB: ComponentType = () => null

afterEach(() => {
  unregisterCapabilityHost("a")
  unregisterCapabilityHost("b")
})

describe("capability-host registry", () => {
  test("register two hosts — both present, keyed by id", () => {
    registerCapabilityHost("a", HostA)
    registerCapabilityHost("b", HostB)
    const entries = capabilityHostEntries()
    expect(entries.map(([id]) => id).sort()).toEqual(["a", "b"])
    expect(Object.fromEntries(entries)).toEqual({ a: HostA, b: HostB })
  })

  test("unregister one — only the other remains", () => {
    registerCapabilityHost("a", HostA)
    registerCapabilityHost("b", HostB)
    unregisterCapabilityHost("a")
    const entries = capabilityHostEntries()
    expect(entries.map(([id]) => id)).toEqual(["b"])
    expect(entries.map(([, C]) => C)).toEqual([HostB])
  })

  test("re-registering the same id replaces (last wins, no duplicate)", () => {
    registerCapabilityHost("a", HostA)
    registerCapabilityHost("a", HostB)
    const entries = capabilityHostEntries()
    expect(entries).toHaveLength(1)
    expect(entries[0]).toEqual(["a", HostB])
  })

  test("snapshot identity is stable between mutations", () => {
    registerCapabilityHost("a", HostA)
    const first = capabilityHostEntries()
    expect(capabilityHostEntries()).toBe(first)
    registerCapabilityHost("b", HostB)
    expect(capabilityHostEntries()).not.toBe(first)
  })

  test("empty registry yields an empty snapshot", () => {
    expect(capabilityHostEntries()).toEqual([])
  })
})
