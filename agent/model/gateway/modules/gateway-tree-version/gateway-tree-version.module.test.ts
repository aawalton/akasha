import { expect, test } from "bun:test"
import {
  computeModelGatewayTreeVersion,
  modelGatewayEntrypoint,
  modelGatewayTreeFiles,
} from "akasha/agent/model/gateway/modules/gateway-tree-version/gateway-tree-version.module.code.ts"

test("the entrypoint is the gateway's own gateway-entry code", () => {
  expect(modelGatewayEntrypoint()).toContain("gateway-entry/gateway-entry.module.code.ts")
})

test("every module the gateway reaches through an `akasha/` specifier is in the closure", () => {
  const held = modelGatewayTreeFiles()
  for (const one of [
    "agent/model/gateway/modules/gateway-serving/gateway-serving.module.code.ts",
    "agent/model/gateway/modules/account-walk/account-walk.module.code.ts",
    "agent/model/gateway/modules/provider-upstream/provider-upstream.module.code.ts",
    "agent/model/gateway/modules/model-body/model-body.module.code.ts",
    "agent/model/gateway/modules/forward/forward.module.code.ts",
  ]) {
    expect(held).toContain(one)
  }
})

test("every path the closure names is relative to the repository root", () => {
  for (const one of modelGatewayTreeFiles()) {
    expect(one.startsWith("/")).toBe(false)
    expect(one.startsWith("akasha/")).toBe(false)
  }
})

test("the version is a sha256 the same twice running", () => {
  const held = computeModelGatewayTreeVersion()
  expect(held).toMatch(/^[0-9a-f]{64}$/)
  expect(computeModelGatewayTreeVersion()).toBe(held)
})
