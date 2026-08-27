import { describe, expect, test } from "bun:test"
import { decideMintAction } from "./mint-decision"

describe("decideMintAction", () => {
  test("skips when this identity's secret is already stored (mint-if-absent, not mint-on-every-sign-in)", () => {
    expect(decideMintAction({ ok: true, present: true })).toBe("skip")
  })

  test("mints when no secret is stored for this identity", () => {
    expect(decideMintAction({ ok: true, present: false })).toBe("mint")
  })

  test("mints when the probe itself failed — an unreadable Keychain must not strand the device", () => {
    expect(decideMintAction({ ok: false })).toBe("mint")
  })
})
