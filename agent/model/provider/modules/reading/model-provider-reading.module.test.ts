import { expect, test } from "bun:test"
import {
  apiBaseIn,
  providerModelIn,
  providerPathIn,
  providerValuesIn,
  slugOf,
} from "akasha/agent/model/provider/modules/reading/model-provider-reading.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const HERE = ownRepoRoot()

test("a provider named as an account names it is read by the slug after the type", () => {
  expect(slugOf("model-provider/deepseek")).toBe("deepseek")
  expect(slugOf("deepseek")).toBe("deepseek")
})

test("a provider's page is found through the page type reached by its id", () => {
  expect(providerPathIn(HERE, "model-provider/anthropic")).not.toBe(null)
  expect(providerValuesIn(HERE, "model-provider/anthropic")?.["slug"]).toBe("anthropic")
})

test("a provider's base is read off that provider's page", () => {
  expect(apiBaseIn(HERE, "model-provider/anthropic")).toBe("https://api.anthropic.com")
  expect(apiBaseIn(HERE, "model-provider/deepseek")).toBe("https://api.deepseek.com/anthropic")
})

test("a provider's own model is read off that provider's page", () => {
  expect(providerModelIn(HERE, "model-provider/deepseek")).toBe("deepseek-flash")
})

test("a provider stating no model of its own is answered as none", () => {
  expect(providerModelIn(HERE, "model-provider/anthropic")).toBe(null)
})

test("a provider no page is filed for is answered as none", () => {
  expect(providerPathIn(HERE, "model-provider/nobody")).toBe(null)
  expect(providerValuesIn(HERE, "model-provider/nobody")).toBe(null)
  expect(apiBaseIn(HERE, "model-provider/nobody")).toBe(null)
  expect(providerModelIn(HERE, "model-provider/nobody")).toBe(null)
})
