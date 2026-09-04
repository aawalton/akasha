import { afterAll, expect, test } from "bun:test"
import { chmodSync } from "node:fs"
import { join } from "node:path"
import {
  bestCredentialIn,
  credentialByAccountIn,
  oauthEffectsIn,
  pacingIn,
  pacingOf,
} from "./oauth-effects.module.code.ts"
import {
  accountWritten,
  besideHeld,
  doorsWith,
  FAKE_ACCESS,
  FAKE_REFRESH,
  NOW,
  pageAt,
  RESETS_AT,
  rootFor,
  secretsMissing,
  sweep,
  tokenHanded,
  usageBody,
  worldMade,
} from "./oauth-effects.module.test-fixtures.ts"

afterAll(sweep)

const NO_EXCLUDES: ReadonlySet<string> = new Set()

const EXPIRED_AT = "2026-09-02T11:00:00.000Z"

const INSIDE_BUFFER_AT = "2026-09-02T12:02:00.000Z"

test("a credential asked for by account is read off that account's page", async () => {
  const root = worldMade()
  const sink = doorsWith()
  const held = await oauthEffectsIn(root, sink.doors).getCredentialByAccount("aine")
  expect(held?.account).toBe("aine")
  expect(held?.accessToken).toBe(FAKE_ACCESS)
  expect(held?.refreshToken).toBe(FAKE_REFRESH)
  expect(held?.expiresAt).toBe(Date.parse("2026-09-02T20:00:00.000Z"))
  expect(held?.scopes).toEqual(["user:inference"])
  expect(held?.subscriptionType).toBe("max")
  expect(held?.rateLimitTier).toBe("default")
  expect(sink.warned).toEqual([])
})

test("an account no page is filed for is answered as no credential", async () => {
  const root = worldMade()
  const sink = doorsWith()
  expect(await oauthEffectsIn(root, sink.doors).getCredentialByAccount("nobody")).toBeNull()
  expect(sink.warned.join(" ")).toContain("no page is filed for `nobody`")
})

test("an account naming no sops file is answered as no credential", async () => {
  const root = worldMade()
  const sink = doorsWith({ secretsRead: () => null })
  expect(credentialByAccountIn(root, sink.doors, "aine", "[t]")).toBeNull()
  expect(sink.warned.join(" ")).toContain("names no sops file")
})

test("a sops file that will not decrypt is answered as no credential", async () => {
  const root = worldMade()
  const sink = doorsWith({
    secretsRead: () => {
      throw new Error("no age key reached the machine")
    },
  })
  expect(credentialByAccountIn(root, sink.doors, "aine", "[t]")).toBeNull()
  expect(sink.warned.join(" ")).toContain("no age key reached the machine")
})

test("reading one account opens no other account's page", async () => {
  const root = worldMade()
  const sink = doorsWith()
  for (const slug of ["aine", "ctw"]) chmodSync(join(root, pageAt(slug)), 0o000)
  try {
    const held = credentialByAccountIn(root, sink.doors, "zed", "[t]")
    expect(held?.account).toBe("zed")
    expect(held?.accessToken).toBe(FAKE_ACCESS)
    expect(sink.pages).toEqual([pageAt("zed")])
    expect(bestCredentialIn(root, sink.doors, "[t]", NO_EXCLUDES)).toBeNull()
  } finally {
    for (const slug of ["aine", "ctw"]) chmodSync(join(root, pageAt(slug)), 0o644)
  }
})

test("the best credential is the account with the most seven-day headroom", async () => {
  const root = worldMade()
  const sink = doorsWith()
  const picked = await oauthEffectsIn(root, sink.doors).getBestCredential("[t]")
  expect(picked?.credential.account).toBe("ctw")
  expect(picked?.credential.accessToken).toBe(FAKE_ACCESS)
  expect(picked?.fiveHourResetsAtMs).toBeNull()
  expect(sink.pages).toEqual([pageAt("aine"), pageAt("ctw"), pageAt("zed")])
})

test("an account named in the excludes is left out of the choice", async () => {
  const root = worldMade()
  const sink = doorsWith()
  const picked = await oauthEffectsIn(root, sink.doors).getBestCredential("[t]", new Set(["ctw"]))
  expect(picked?.credential.account).toBe("aine")
  expect(picked?.fiveHourResetsAtMs).toBe(Date.parse("2026-09-02T15:00:00.000Z"))
})

test("a five-hour reset behind the moment of the choice is answered as none", async () => {
  const root = worldMade()
  accountWritten(
    root,
    "aine",
    {},
    {
      accessTokenExpiresAt: "2026-09-02T20:00:00.000Z",
      fiveHourResetsAt: "2026-09-02T09:00:00.000Z",
    }
  )
  const sink = doorsWith()
  const picked = bestCredentialIn(root, sink.doors, "[t]", new Set(["ctw", "zed"]))
  expect(picked?.credential.account).toBe("aine")
  expect(picked?.fiveHourResetsAtMs).toBeNull()
})

test("an expired credential is excluded and the choice is made again", async () => {
  const root = worldMade()
  accountWritten(root, "ctw", {}, { accessTokenExpiresAt: EXPIRED_AT, sevenDayResetsAt: RESETS_AT })
  const sink = doorsWith()
  const picked = bestCredentialIn(root, sink.doors, "[t]", NO_EXCLUDES)
  expect(picked?.credential.account).toBe("aine")
  expect(sink.warned.join(" ")).toContain("ctw expired at")
})

test("a pool holding only expired credentials is answered with no pick", async () => {
  const root = worldMade()
  for (const slug of ["aine", "ctw", "zed"]) {
    accountWritten(root, slug, {}, { accessTokenExpiresAt: EXPIRED_AT })
  }
  const sink = doorsWith()
  expect(bestCredentialIn(root, sink.doors, "[t]", NO_EXCLUDES)).toBeNull()
  expect(sink.warned.filter((line) => line.includes("expired at")).length).toBe(3)
})

test("a credential expiring inside the refresh buffer is still chosen", async () => {
  const root = worldMade()
  accountWritten(
    root,
    "ctw",
    {},
    {
      accessTokenExpiresAt: INSIDE_BUFFER_AT,
      sevenDayResetsAt: RESETS_AT,
    }
  )
  const sink = doorsWith()
  const picked = bestCredentialIn(root, sink.doors, "[t]", NO_EXCLUDES)
  expect(picked?.credential.account).toBe("ctw")
  expect(sink.warned.join(" ")).toContain("inside the reader's buffer")
})

test("an account whose credential cannot be read is left out of the pool", async () => {
  const root = worldMade()
  const sink = doorsWith({ secretsRead: secretsMissing("ctw") })
  const picked = bestCredentialIn(root, sink.doors, "[t]", NO_EXCLUDES)
  expect(picked?.credential.account).toBe("aine")
  expect(sink.warned.join(" ")).toContain("`ctw` names no sops file")
})

test("a root filing no claude account is answered with no pick rather than a throw", async () => {
  const root = rootFor("oauth-effects-bare-")
  const sink = doorsWith()
  expect(bestCredentialIn(root, sink.doors, "[t]", NO_EXCLUDES)).toBeNull()
  expect(credentialByAccountIn(root, sink.doors, "aine", "[t]")).toBeNull()
  expect(sink.warned.length).toBeGreaterThan(0)
})

test("a pacing reading is the gateway's spelling of what is beside a page", async () => {
  const root = worldMade()
  const states = pacingIn(root)
  expect([...states.keys()]).toEqual(["aine", "ctw", "zed"])
  const one = states.get("aine")
  expect(one?.account).toBe("aine")
  expect(one?.fiveHourUtil).toBe(12)
  expect(one?.sevenDayUtil).toBe(80)
  expect(one?.sevenDayResetsAt).toBe(RESETS_AT)
  expect(one?.subscriptionType).toBe("max")
  expect(one?.subscriptionDisabled).toBe(false)
  expect(one?.renewalTerminal).toBe(false)
  expect(one?.accessTokenExpiresAt).toBe(Date.parse("2026-09-02T20:00:00.000Z"))
})

test("a subscription reason beside a page counts that account disabled", () => {
  const state = pacingOf({
    slug: "aine",
    fiveHourPercentUsed: 0,
    sevenDayPercentUsed: 0,
    fiveHourResetsAt: null,
    sevenDayResetsAt: null,
    subscriptionType: null,
    subscriptionDisabledReason: "withdrawn upstream",
    retryAllowedAtMs: 5,
    terminalAtMs: 7,
    terminalAlertedAtMs: null,
    lastWindowTriggerAtMs: null,
    accessTokenExpiresAtMs: null,
  })
  expect(state.subscriptionDisabled).toBe(true)
  expect(state.renewalTerminal).toBe(true)
  expect(state.fiveHourAtLimitUntil).toBe(5)
})

test("the pacing a facade answers with is the reading of the root it was built on", async () => {
  const root = worldMade()
  const sink = doorsWith()
  const states = await oauthEffectsIn(root, sink.doors).getClaudeAccountPacing()
  expect([...states.keys()]).toEqual(["aine", "ctw", "zed"])
})

test("an at-limit mark writes the instant a retry is allowed at beside the page", async () => {
  const root = worldMade()
  const sink = doorsWith()
  await oauthEffectsIn(root, sink.doors).markAccountAtLimit({
    account: "aine",
    retryAfterHeader: "30",
  })
  expect(besideHeld(root, "aine")["retryAllowedAt"]).toBe(new Date(NOW + 30_000).toISOString())
  expect(sink.warned).toEqual([])
})

test("an at-limit mark with no header backs off the default", async () => {
  const root = worldMade()
  const sink = doorsWith()
  await oauthEffectsIn(root, sink.doors).markAccountAtLimit({
    account: "aine",
    retryAfterHeader: null,
  })
  expect(besideHeld(root, "aine")["retryAllowedAt"]).toBe(new Date(NOW + 5_000).toISOString())
})

test("a subscription mark writes the reason beside the page as plain text", async () => {
  const root = worldMade()
  const sink = doorsWith()
  const effects = oauthEffectsIn(root, sink.doors)
  await effects.markAccountSubscriptionDisabled("aine", "usage credits are required")
  expect(besideHeld(root, "aine")["subscriptionDisabledReason"]).toBe("usage credits are required")
  expect(pacingIn(root).get("aine")?.subscriptionDisabled).toBe(true)
})

test("clearing a subscription mark takes that reason away", async () => {
  const root = worldMade()
  const sink = doorsWith()
  const effects = oauthEffectsIn(root, sink.doors)
  await effects.markAccountSubscriptionDisabled("aine", "withdrawn")
  await effects.clearAccountSubscriptionDisabled("aine")
  expect(besideHeld(root, "aine")["subscriptionDisabledReason"]).toBeUndefined()
  expect(pacingIn(root).get("aine")?.subscriptionDisabled).toBe(false)
})

test("a mark for an account no page is filed for is written about rather than thrown", async () => {
  const root = worldMade()
  const sink = doorsWith()
  await oauthEffectsIn(root, sink.doors).markAccountAtLimit({
    account: "nobody",
    retryAfterHeader: null,
  })
  expect(sink.warned.join(" ")).toContain("kept a mark off its page")
})

test("a usage re-poll writes what the endpoint answered beside the page", async () => {
  const root = worldMade()
  const sink = doorsWith({}, [{ kind: "read", body: usageBody(33, 44) }])
  await oauthEffectsIn(root, sink.doors).repollUsageAfter429("aine", tokenHanded, "[t]")
  const held = besideHeld(root, "aine")
  expect(held["fiveHourPercentUsed"]).toBe(33)
  expect(held["sevenDayPercentUsed"]).toBe(44)
  expect(held["usageReadAt"]).toBe(new Date(NOW).toISOString())
  expect(sink.asked).toEqual([FAKE_ACCESS])
})

test("a second re-poll inside the minimum interval is skipped", async () => {
  const root = worldMade()
  const sink = doorsWith({}, [{ kind: "read", body: usageBody(33, 44) }])
  const effects = oauthEffectsIn(root, sink.doors)
  await effects.repollUsageAfter429("aine", tokenHanded, "[t]")
  await effects.repollUsageAfter429("aine", tokenHanded, "[t]")
  expect(sink.asked.length).toBe(1)
  expect(sink.said.join(" ")).toContain("inside the minimum interval")
})

test("the gate is held for each account rather than for the fleet", async () => {
  const root = worldMade()
  const sink = doorsWith({}, [{ kind: "read", body: usageBody(33, 44) }])
  const effects = oauthEffectsIn(root, sink.doors)
  await effects.repollUsageAfter429("aine", tokenHanded, "[t]")
  await effects.repollUsageAfter429("ctw", tokenHanded, "[t]")
  expect(sink.asked.length).toBe(2)
  expect(besideHeld(root, "ctw")["fiveHourPercentUsed"]).toBe(33)
})

test("a usage endpoint answering 429 opens the breaker", async () => {
  const root = worldMade()
  const sink = doorsWith({}, [{ kind: "refused", status: 429 }])
  const effects = oauthEffectsIn(root, sink.doors)
  await effects.repollUsageAfter429("aine", tokenHanded, "[t]")
  expect(sink.warned.join(" ")).toContain("the breaker is open")
  await effects.repollUsageAfter429("aine", tokenHanded, "[t]")
  expect(sink.said.join(" ")).toContain("breaker open for another")
  expect(sink.asked.length).toBe(1)
})

test("a usage endpoint answering another refusal leaves the breaker closed", async () => {
  const root = worldMade()
  const sink = doorsWith({}, [{ kind: "refused", status: 503 }])
  await oauthEffectsIn(root, sink.doors).repollUsageAfter429("aine", tokenHanded, "[t]")
  expect(sink.warned.join(" ")).toContain("answered 503")
  expect(besideHeld(root, "aine")["fiveHourPercentUsed"]).toBe(12)
})

test("a usage fetch that throws writes no mark", async () => {
  const root = worldMade()
  const sink = doorsWith({}, [{ kind: "threw", error: new Error("socket closed") }])
  await oauthEffectsIn(root, sink.doors).repollUsageAfter429("aine", tokenHanded, "[t]")
  expect(sink.warned.join(" ")).toContain("socket closed")
  expect(besideHeld(root, "aine")["usageReadAt"]).toBeUndefined()
})

test("a usage body the wire shape refuses writes no mark", async () => {
  const root = worldMade()
  const sink = doorsWith({}, [{ kind: "read", body: { five_hour: { utilization: 1 } } }])
  await oauthEffectsIn(root, sink.doors).repollUsageAfter429("aine", tokenHanded, "[t]")
  expect(sink.warned.join(" ")).toContain("malformed")
  expect(besideHeld(root, "aine")["usageReadAt"]).toBeUndefined()
})

test("a re-poll answered no token reaches the usage endpoint not at all", async () => {
  const root = worldMade()
  const sink = doorsWith()
  await oauthEffectsIn(root, sink.doors).repollUsageAfter429("aine", async () => null, "[t]")
  expect(sink.asked).toEqual([])
  expect(besideHeld(root, "aine")["usageReadAt"]).toBeUndefined()
})

test("no line written here carries a token", async () => {
  const root = worldMade()
  const sink = doorsWith({ secretsRead: () => null }, [{ kind: "refused", status: 429 }])
  const effects = oauthEffectsIn(root, sink.doors)
  await effects.getBestCredential("[t]")
  await effects.getCredentialByAccount("aine", "[t]")
  await effects.repollUsageAfter429("aine", tokenHanded, "[t]")
  await effects.markAccountAtLimit({ account: "nobody", retryAfterHeader: null })
  const written = [...sink.said, ...sink.warned].join(" ")
  expect(written.length).toBeGreaterThan(0)
  expect(written).not.toContain(FAKE_ACCESS)
  expect(written).not.toContain(FAKE_REFRESH)
  expect(written).not.toContain("digest")
})
