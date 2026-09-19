import { expect, test } from "bun:test"
import { modelProvider } from "akasha/agent/model/provider/model-provider.page-type.ts"
import {
  apiBaseIn,
  providerModelIn,
  providerPathIn,
  providerValuesIn,
  slugOf,
} from "akasha/agent/model/provider/modules/reading/model-provider-reading.module.code.ts"
import { anthropic } from "akasha/agent/model/provider/pages/anthropic/anthropic.model-provider.ts"
import { deepseek } from "akasha/agent/model/provider/pages/deepseek/deepseek.model-provider.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const HERE = ownRepoRoot()

const ANTHROPIC = `${modelProvider.slug}/${anthropic.slug}`

const DEEPSEEK = `${modelProvider.slug}/${deepseek.slug}`

const NOBODY = `${modelProvider.slug}/nobody`

test("a provider named as an account names it is read by the slug after the type", () => {
  expect(slugOf(DEEPSEEK)).toBe(deepseek.slug)
  expect(slugOf(deepseek.slug)).toBe(deepseek.slug)
})

test("a provider's page is found through the page type reached by its id", () => {
  expect(providerPathIn(HERE, ANTHROPIC)).not.toBe(null)
  expect(providerValuesIn(HERE, ANTHROPIC)?.["slug"]).toBe(anthropic.slug)
})

test("a provider's base is read off that provider's page", () => {
  expect(apiBaseIn(HERE, ANTHROPIC)).toBe(anthropic.apiBase)
  expect(apiBaseIn(HERE, DEEPSEEK)).toBe(deepseek.apiBase)
})

test("a provider's own model is read off that provider's page", () => {
  expect(providerModelIn(HERE, DEEPSEEK)).toBe(deepseek.providerModel)
})

test("a provider stating no model of its own is answered as none", () => {
  expect(providerModelIn(HERE, ANTHROPIC)).toBe(null)
})

test("a provider no page is filed for is answered as none", () => {
  expect(providerPathIn(HERE, NOBODY)).toBe(null)
  expect(providerValuesIn(HERE, NOBODY)).toBe(null)
  expect(apiBaseIn(HERE, NOBODY)).toBe(null)
  expect(providerModelIn(HERE, NOBODY)).toBe(null)
})
