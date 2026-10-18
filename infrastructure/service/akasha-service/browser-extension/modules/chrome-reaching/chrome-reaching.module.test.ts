import { expect, test } from "bun:test"
import { chromeIn } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"

test("what Chrome handed over is answered", () => {
  const handed = { runtime: {} }
  expect(chromeIn({ chrome: handed }) as unknown).toBe(handed)
})

test("a scope Chrome handed nothing is refused", () => {
  expect(() => chromeIn({})).toThrow("no extension runs here")
})
