import { expect, test } from "bun:test"
import { decideMintAction, domainSaid } from "./device-secret-minting.module.code.ts"

test("a device holding its secret where the widget extension reads it mints none", () => {
  expect(decideMintAction({ ok: true, present: true, domain: "pinned" })).toBe("skip")
})

test("a device holding its secret where only the app reads it mints one", () => {
  expect(decideMintAction({ ok: true, present: true, domain: "default" })).toBe("mint")
})

test("a device that did not say which domain holds its secret mints one", () => {
  expect(decideMintAction({ ok: true, present: true, domain: "unsaid" })).toBe("mint")
})

test("a device holding no secret mints one", () => {
  expect(decideMintAction({ ok: true, present: false, domain: "pinned" })).toBe("mint")
})

test("a device that could not be asked mints one, so a lost answer never leaves it without", () => {
  expect(decideMintAction({ ok: false })).toBe("mint")
})

test("the two domains a shell names are read and anything else is unsaid", () => {
  expect(domainSaid("pinned")).toBe("pinned")
  expect(domainSaid("default")).toBe("default")
  expect(domainSaid(undefined)).toBe("unsaid")
  expect(domainSaid("fallback")).toBe("unsaid")
})
