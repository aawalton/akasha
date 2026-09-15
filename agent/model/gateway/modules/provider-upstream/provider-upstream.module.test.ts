import { expect, test } from "bun:test"
import type { SecretsRead } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import {
  anthropicBaseIn,
  fallbackIn,
  fallbackReadIn,
} from "akasha/agent/model/gateway/modules/provider-upstream/provider-upstream.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const HERE = ownRepoRoot()

const NOWHERE = "/var/tmp/provider-upstream-nowhere"

const FAKE_KEY = "fake-deepseek-key-for-a-test"

const keyed: SecretsRead = () => new Map([["apiKey", FAKE_KEY]])

const bare: SecretsRead = () => null

test("the base a request to Anthropic is sent to is read off Anthropic's page", () => {
  expect(anthropicBaseIn(HERE)).toBe("https://api.anthropic.com")
})

test("a root filing no provider is answered with no base rather than throwing", () => {
  expect(anthropicBaseIn(NOWHERE)).toBe(undefined)
})

test("the fallback is the account held with DeepSeek and that provider's base", () => {
  const held = fallbackIn(HERE, keyed)
  expect(held?.account).toBe("deepseek")
  expect(held?.upstream.base).toBe("https://api.deepseek.com/anthropic")
  expect(held?.upstream.header).toBe("x-api-key")
  expect(held?.upstream.value).toBe(FAKE_KEY)
})

test("a fallback whose account holds no key is answered as none", () => {
  expect(fallbackIn(HERE, bare)).toBe(null)
})

test("a root filing no account at all is answered as none rather than throwing", () => {
  expect(fallbackIn(NOWHERE, keyed)).toBe(null)
})

test("a fallback read once is held, and one answered as none is read again", () => {
  let turns = 0
  const counted: SecretsRead = (root, page) => {
    turns += 1
    return keyed(root, page)
  }
  const read = fallbackReadIn(HERE, counted)
  expect(read()?.account).toBe("deepseek")
  expect(read()?.account).toBe("deepseek")
  expect(turns).toBe(1)

  let asked = 0
  const empty = fallbackReadIn(HERE, (root, page) => {
    asked += 1
    return bare(root, page)
  })
  expect(empty()).toBe(null)
  expect(empty()).toBe(null)
  expect(asked).toBe(2)
})
