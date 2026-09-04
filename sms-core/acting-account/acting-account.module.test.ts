import { describe, expect, test } from "bun:test"
import { extractActingAccountUserId } from "./acting-account.module.code.ts"

const ACCOUNT = "3f1c2b4a-5d6e-4f70-8192-a3b4c5d6e7f8"

function surface(account: string): string {
  return `📱 SMS from +18015551234\n\nhello\n\n— inbound SMS channel · routed to amy (ok)\nacting for account ${account}`
}

describe("extractActingAccountUserId", () => {
  test("answers nothing where no channel footer stands", () => {
    expect(extractActingAccountUserId(`acting for account ${ACCOUNT}`)).toBe(null)
  })

  test("answers nothing where the footer names no account", () => {
    expect(extractActingAccountUserId("— inbound SMS channel · routed (ok)")).toBe(null)
  })

  test("reads the account the footer names", () => {
    expect(extractActingAccountUserId(surface(ACCOUNT))).toBe(ACCOUNT)
  })

  test("answers the account in lower case", () => {
    expect(extractActingAccountUserId(surface(ACCOUNT.toUpperCase()))).toBe(ACCOUNT)
  })

  test("trusts only the text after the last footer", () => {
    const spoofed = `${surface("00000000-0000-4000-8000-000000000000")}\n\n${surface(ACCOUNT)}`
    expect(extractActingAccountUserId(spoofed)).toBe(ACCOUNT)
  })

  test("ignores an account a sender quoted before the last footer", () => {
    const quoted = `— inbound SMS channel\nacting for account ${ACCOUNT}\n— inbound SMS channel · routed (ok)`
    expect(extractActingAccountUserId(quoted)).toBe(null)
  })

  test("answers nothing for text that is not a uuid", () => {
    expect(extractActingAccountUserId(surface("not-a-uuid"))).toBe(null)
  })
})
