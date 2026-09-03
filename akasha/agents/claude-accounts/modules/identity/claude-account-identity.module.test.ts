import { describe, expect, test } from "bun:test"
import {
  type CredentialIdentity,
  decideIdentityPush,
  IDENTITY_SCOPED_KEYS,
  identityClearMarks,
  sayFailedPin,
} from "./claude-account-identity.module.code.ts"

const ONE_UUID = "11111111-1111-7111-8111-111111111111"

const ANOTHER_UUID = "22222222-2222-7222-8222-222222222222"

function identityOf(accountUuid: string, email: string | null = null): CredentialIdentity {
  return { accountUuid, email }
}

describe("decideIdentityPush", () => {
  test("a credential belonging to an upstream account another claude-account is pinned to is refused", () => {
    const decided = decideIdentityPush({
      slug: "one",
      identity: identityOf(ONE_UUID, "one@example.com"),
      pinnedUuidBySlug: new Map([["two", ONE_UUID]]),
      allowRebind: false,
    })
    expect(decided.kind).toBe("refuse")
    if (decided.kind !== "refuse") return
    expect(decided.reason).toContain(`claude-account "one"`)
    expect(decided.reason).toContain(`claude-account "two" is already pinned to`)
    expect(decided.reason).toContain("one@example.com")
    expect(decided.reason).toContain("phantom-account")
  })

  test("a cross-pinned credential is refused even where the caller allows a rebind", () => {
    const decided = decideIdentityPush({
      slug: "one",
      identity: identityOf(ONE_UUID),
      pinnedUuidBySlug: new Map([
        ["two", ONE_UUID],
        ["one", ANOTHER_UUID],
      ]),
      allowRebind: true,
    })
    expect(decided.kind).toBe("refuse")
    if (decided.kind !== "refuse") return
    expect(decided.reason).toContain("login email unknown")
  })

  test("a claude-account pinned to no upstream account takes the one it resolves to", () => {
    expect(
      decideIdentityPush({
        slug: "one",
        identity: identityOf(ONE_UUID),
        pinnedUuidBySlug: new Map(),
        allowRebind: false,
      })
    ).toEqual({ kind: "pin", accountUuid: ONE_UUID })
  })

  test("a claude-account pinned to nothing is unmoved by what other claude-accounts are pinned to", () => {
    expect(
      decideIdentityPush({
        slug: "one",
        identity: identityOf(ONE_UUID),
        pinnedUuidBySlug: new Map([["two", ANOTHER_UUID]]),
        allowRebind: false,
      })
    ).toEqual({ kind: "pin", accountUuid: ONE_UUID })
  })

  test("a credential resolving to the upstream account already pinned is a match", () => {
    expect(
      decideIdentityPush({
        slug: "one",
        identity: identityOf(ONE_UUID),
        pinnedUuidBySlug: new Map([["one", ONE_UUID]]),
        allowRebind: false,
      })
    ).toEqual({ kind: "match" })
  })

  test("a match is answered whether or not the caller allows a rebind", () => {
    expect(
      decideIdentityPush({
        slug: "one",
        identity: identityOf(ONE_UUID),
        pinnedUuidBySlug: new Map([["one", ONE_UUID]]),
        allowRebind: true,
      })
    ).toEqual({ kind: "match" })
  })

  test("a credential resolving to another upstream account is refused where no rebind is allowed", () => {
    const decided = decideIdentityPush({
      slug: "one",
      identity: identityOf(ANOTHER_UUID, "one@example.com"),
      pinnedUuidBySlug: new Map([["one", ONE_UUID]]),
      allowRebind: false,
    })
    expect(decided.kind).toBe("refuse")
    if (decided.kind !== "refuse") return
    expect(decided.reason).toContain(`identity mismatch on claude-account "one"`)
    expect(decided.reason).toContain(ONE_UUID)
    expect(decided.reason).toContain(ANOTHER_UUID)
    expect(decided.reason).toContain("--rebind")
  })

  test("a credential resolving to another upstream account rebinds where a rebind is allowed", () => {
    expect(
      decideIdentityPush({
        slug: "one",
        identity: identityOf(ANOTHER_UUID),
        pinnedUuidBySlug: new Map([["one", ONE_UUID]]),
        allowRebind: true,
      })
    ).toEqual({ kind: "rebind", accountUuid: ANOTHER_UUID, previousUuid: ONE_UUID })
  })

  test("an identity naming no email is said as an unknown login email", () => {
    const decided = decideIdentityPush({
      slug: "one",
      identity: identityOf(ANOTHER_UUID),
      pinnedUuidBySlug: new Map([["one", ONE_UUID]]),
      allowRebind: false,
    })
    expect(decided.kind).toBe("refuse")
    if (decided.kind !== "refuse") return
    expect(decided.reason).toContain("login email unknown")
  })

  test("deciding a pin reads nothing but what is handed in", () => {
    const pinned = new Map([["one", ONE_UUID]])
    decideIdentityPush({
      slug: "one",
      identity: identityOf(ANOTHER_UUID),
      pinnedUuidBySlug: pinned,
      allowRebind: true,
    })
    expect([...pinned]).toEqual([["one", ONE_UUID]])
  })
})

describe("sayFailedPin", () => {
  test("a first pin stopped at the clear stage says nothing moved", () => {
    const said = sayFailedPin({
      slug: "one",
      previousUuid: null,
      at: "clear",
      why: "the page would not open",
    })
    expect(said).toContain(
      `pinning claude-account "one" to the upstream account its credential resolves to`
    )
    expect(said).toContain("stopped before anything moved: the page would not open")
    expect(said).toContain("nothing is half done")
  })

  test("a re-pin names the upstream account it is moving off", () => {
    const said = sayFailedPin({
      slug: "one",
      previousUuid: ONE_UUID,
      at: "clear",
      why: "the page would not open",
    })
    expect(said).toContain(`re-pinning claude-account "one" off upstream account ${ONE_UUID}`)
  })

  test("a pin stopped at the credential stage says the credential did not reach the page", () => {
    const said = sayFailedPin({
      slug: "one",
      previousUuid: null,
      at: "credential",
      why: "the sops file did not land",
    })
    expect(said).toContain("the credential did not reach the page — the sops file did not land")
    expect(said).toContain("the same push run again lands all of it")
    expect(said).not.toContain("already off the page")
  })

  test("a re-pin stopped at the credential stage says the previous bookkeeping is already cleared", () => {
    const said = sayFailedPin({
      slug: "one",
      previousUuid: ONE_UUID,
      at: "credential",
      why: "the sops file did not land",
    })
    expect(said).toContain(
      "The previous account's pacing and at-limit bookkeeping is already off the page"
    )
  })

  test("a pin stopped at the pin stage says the page names no upstream account", () => {
    const said = sayFailedPin({
      slug: "one",
      previousUuid: null,
      at: "pin",
      why: "the page states another uuid",
    })
    expect(said).toContain("the credential reached the page but the pin did not")
    expect(said).toContain("while naming no upstream account")
    expect(said).toContain("push again to finish the pin")
  })

  test("a re-pin stopped at the pin stage says which upstream account the page still names", () => {
    const said = sayFailedPin({
      slug: "one",
      previousUuid: ONE_UUID,
      at: "pin",
      why: "the page states another uuid",
    })
    expect(said).toContain(`while still naming upstream account ${ONE_UUID}`)
  })

  test("every stage says the reason it was handed", () => {
    for (const at of ["clear", "credential", "pin"] as const) {
      expect(sayFailedPin({ slug: "one", previousUuid: null, at, why: "a said reason" })).toContain(
        "a said reason"
      )
    }
  })
})

describe("identityClearMarks", () => {
  test("the keys cleared are the ones one upstream account's readings fill", () => {
    expect(IDENTITY_SCOPED_KEYS).toEqual([
      "retryAllowedAt",
      "terminalAt",
      "terminalAlertedAt",
      "subscriptionDisabledReason",
      "lastWindowTriggerAt",
    ])
  })

  test("every key cleared is marked as no value", () => {
    const marks = identityClearMarks()
    expect(Object.keys(marks).sort()).toEqual([...IDENTITY_SCOPED_KEYS].sort())
    for (const key of IDENTITY_SCOPED_KEYS) expect(marks[key]).toBeNull()
  })

  test("no key beside those is cleared", () => {
    expect(Object.keys(identityClearMarks())).not.toContain("accountUuid")
    expect(Object.keys(identityClearMarks())).not.toContain("fiveHourPercentUsed")
    expect(Object.keys(identityClearMarks())).not.toContain("accessTokenExpiresAt")
  })

  test("each call answers a record of its own", () => {
    expect(identityClearMarks()).not.toBe(identityClearMarks())
    expect(identityClearMarks()).toEqual(identityClearMarks())
  })
})
