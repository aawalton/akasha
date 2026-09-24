import { expect, test } from "bun:test"
import type { SecretsRead } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import { encoded } from "akasha/agent/model/gateway/modules/model-body/model-body.module.code.ts"
import {
  anthropicBaseIn,
  askedOf,
  fallbackIn,
  fallbackReadIn,
} from "akasha/agent/model/gateway/modules/provider-upstream/provider-upstream.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { z } from "zod"

const HERE = ownRepoRoot()

const WRITTEN = z.looseObject({ model: z.string(), max_tokens: z.number() })

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

test("the model the fallback asks for is read off DeepSeek's page", () => {
  expect(fallbackIn(HERE, keyed)?.model).toBe("deepseek-flash")
})

test("a body is rewritten to ask for the provider's own model", () => {
  const asked = askedOf(
    encoded(JSON.stringify({ model: "claude-opus-5[1m]", max_tokens: 8 })),
    "deepseek-flash"
  )
  const written = WRITTEN.parse(JSON.parse(new TextDecoder().decode(asked as ArrayBuffer)))
  expect(written["model"]).toBe("deepseek-flash")
  expect(written["max_tokens"]).toBe(8)
})

test("a provider stating no model is asked for what the caller named", () => {
  const came = encoded(JSON.stringify({ model: "claude-opus-5[1m]" }))
  expect(askedOf(came, null)).toBe(came)
})

test("a body nothing here can rewrite is sent as that body came", () => {
  const nameless = encoded(JSON.stringify({ max_tokens: 8 }))
  expect(askedOf(nameless, "deepseek-flash")).toBe(nameless)

  const raw = encoded("not json at all")
  expect(askedOf(raw, "deepseek-flash")).toBe(raw)

  expect(askedOf(null, "deepseek-flash")).toBe(null)
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
