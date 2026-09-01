import { describe, expect, mock, test } from "bun:test"
import type { SmsAllowlistClient } from "../client/client.module.code.ts"

type Row = { readonly values: Record<string, unknown> }

type Asked =
  | { readonly ok: true; readonly answer: { readonly rows: readonly Row[] } }
  | { readonly ok: false; readonly why: string }

type Held = { asked: Asked }

function rowsOf(...values: Record<string, unknown>[]): Asked {
  return { ok: true, answer: { rows: values.map((one) => ({ values: one })) } }
}

function fresh(): Held {
  return { asked: rowsOf() }
}

const held = fresh()

mock.module("@akasha/pages-query/ask", () => ({
  askComposed: () => Promise.resolve(held.asked),
}))

const { loadSmsExternalIdentities } = await import("./sms-allowlist.module.code.ts")

const UNREAD_CLIENT = {} as SmsAllowlistClient

describe("loadSmsExternalIdentities", () => {
  test("throws where the store cannot answer", async () => {
    held.asked = { ok: false, why: "the store was unreachable" }
    await expect(loadSmsExternalIdentities(UNREAD_CLIENT)).rejects.toThrow(
      "the store was unreachable"
    )
  })

  test("drops a row that will not parse", async () => {
    held.asked = rowsOf(
      { phone: 15550101234, "account-user-id": "u1", "sms-allowed": true },
      { phone: "+1 (555) 010-9999", "account-user-id": "u2", "sms-allowed": true }
    )
    const found = await loadSmsExternalIdentities(UNREAD_CLIENT)
    expect(found.map((one) => one.accountUserId)).toEqual(["u2"])
  })

  test("reads a permission spelt `true` as allowed", async () => {
    held.asked = rowsOf({
      phone: "+1 (555) 010-1234",
      "account-user-id": "u1",
      "sms-allowed": "true",
      "sms-handler-target": "ki",
    })
    const found = await loadSmsExternalIdentities(UNREAD_CLIENT)
    expect(found[0]).toEqual({
      phoneDigits: "5550101234",
      accountUserId: "u1",
      smsAllowed: true,
      handlerTarget: "ki",
    })
  })

  test("reads a permission spelt `false` as not allowed", async () => {
    held.asked = rowsOf({ phone: "5550101234", "account-user-id": "u1", "sms-allowed": "false" })
    const found = await loadSmsExternalIdentities(UNREAD_CLIENT)
    expect(found[0]?.smsAllowed).toBe(false)
  })

  test("reads a permission spelt no way it knows as not allowed", async () => {
    held.asked = rowsOf({ phone: "5550101234", "account-user-id": "u1", "sms-allowed": "yes" })
    const found = await loadSmsExternalIdentities(UNREAD_CLIENT)
    expect(found[0]?.smsAllowed).toBe(false)
  })

  test("answers nobody where the store holds no row", async () => {
    held.asked = rowsOf()
    expect(await loadSmsExternalIdentities(UNREAD_CLIENT)).toEqual([])
  })
})
