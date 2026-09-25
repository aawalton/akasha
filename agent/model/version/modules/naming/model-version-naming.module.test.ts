import { expect, test } from "bun:test"
import { modelVersion } from "akasha/agent/model/version/model-version.page-type.ts"
import { titleOf } from "akasha/agent/model/version/modules/naming/model-version-naming.module.code.ts"
import { claudeOpus551m } from "akasha/agent/model/version/pages/claude-opus-5-5-1m.model-version.ts"

test("a model version's address names the title its page states", () => {
  expect(titleOf(`${modelVersion.slug}/${claudeOpus551m.slug}`)).toBe(claudeOpus551m.title)
})

test("an address no model version's page carries names no title", () => {
  expect(titleOf(`${modelVersion.slug}/claude-nothing-at-all`)).toBe(null)
})

test("a model id is no address and names no title", () => {
  expect(titleOf(claudeOpus551m.modelId)).toBe(null)
})
