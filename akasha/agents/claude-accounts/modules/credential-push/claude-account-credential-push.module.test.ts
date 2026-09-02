import { afterAll, expect, test } from "bun:test"
import { chmodSync } from "node:fs"
import { join } from "node:path"
import { readingIn } from "@akasha/indexes"
import { routingIn } from "../marking/claude-account-marking.module.code.ts"
import {
  ACCOUNT_DECLARED,
  besideAt,
  besideHeld,
  besideText,
  bodiesIn,
  counting,
  pageAt,
} from "../marking/claude-account-marking.module.test-fixtures.ts"
import { everyAccountStateIn, rescuedIn } from "../reading/claude-account-reading.module.code.ts"
import {
  type Credential,
  DOORS,
  type Doors,
  expiryHeldIn,
  narrowedFor,
  PUSHED_KEYS,
  type Push,
  pushedIn,
  sayingOf,
} from "./claude-account-credential-push.module.code.ts"
import {
  ACCESS_KEY,
  AN_HOUR,
  credentialOf,
  crossedLanding,
  heldIn,
  LATER,
  LATER_AT,
  modeOf,
  NOW,
  REFRESH_KEY,
  ROTATED_ACCESS,
  ROTATED_REFRESH,
  refusingLanding,
  seeded,
  silentLanding,
  sopsIn,
  spoilingLanding,
  sweep,
  whyOf,
  worldMade,
} from "./claude-account-credential-push.module.test-fixtures.ts"

afterAll(sweep)

const NOWHERE = "/var/tmp/credential-push-no-such-root"

const FAILED: readonly string[] = ["[gate] fail: the landing said no"]

function pushed(root: string, credential: Credential, doors: Doors): Push {
  return pushedIn(root, credential, doors, readingIn(root), bodiesIn(root))
}

test("a push lands the pair in the sops file and answers pushed", () => {
  const root = worldMade()
  const sops = sopsIn()
  const said = pushed(root, credentialOf("aine"), sops.doors)
  if (said.kind !== "pushed") throw new Error(whyOf(said))
  expect(said.keys).toEqual([...PUSHED_KEYS])
  expect(said.sidecar).toBe(
    "akasha/agents/claude-accounts/pages/aine/aine.claude-account.sops.yaml"
  )
  const held = heldIn(sops, root, pageAt("aine"))
  expect(held.get(ACCESS_KEY)).toBe(ROTATED_ACCESS)
  expect(held.get(REFRESH_KEY)).toBe(ROTATED_REFRESH)
  expect(sops.landed.length).toBe(1)
})

test("a push stamps the moment the access token expires", () => {
  const root = worldMade()
  expect(pushed(root, credentialOf("aine"), sopsIn().doors).kind).toBe("pushed")
  expect(besideHeld(root, "aine")["accessTokenExpiresAt"]).toBe(LATER_AT)
})

test("a push merges the pair into the keys the sops file already holds", () => {
  const root = worldMade()
  const sops = sopsIn()
  seeded(sops, root, pageAt("aine"), { "api-key": "fake-api-key" })
  expect(pushed(root, credentialOf("aine"), sops.doors).kind).toBe("pushed")
  const held = heldIn(sops, root, pageAt("aine"))
  expect(held.get("api-key")).toBe("fake-api-key")
  expect(held.get(ACCESS_KEY)).toBe(ROTATED_ACCESS)
})

test("a sops file already holding the pair is answered as unchanged and lands nothing", () => {
  const root = worldMade()
  const sops = sopsIn()
  seeded(sops, root, pageAt("aine"), {
    [ACCESS_KEY]: ROTATED_ACCESS,
    [REFRESH_KEY]: ROTATED_REFRESH,
  })
  const said = pushed(root, credentialOf("aine"), sops.doors)
  expect(said.kind).toBe("unchanged")
  expect(sops.landed).toEqual([])
  expect(besideHeld(root, "aine")["accessTokenExpiresAt"]).toBe(LATER_AT)
})

test("a push whose expiry is no later than the expiry beside the page is stale", () => {
  const root = worldMade()
  const sops = sopsIn()
  expect(pushed(root, credentialOf("aine"), sops.doors).kind).toBe("pushed")
  const older = credentialOf("aine", { accessTokenExpiresAtMs: LATER - 1 })
  expect(pushed(root, older, sops.doors).kind).toBe("stale")
  const same = credentialOf("aine", { accessTokenExpiresAtMs: LATER })
  expect(pushed(root, same, sops.doors).kind).toBe("stale")
  const newer = credentialOf("aine", {
    accessToken: "fake-access-token-newer",
    accessTokenExpiresAtMs: LATER + 1,
  })
  expect(pushed(root, newer, sops.doors).kind).toBe("pushed")
})

test("a push answered as stale writes no file", () => {
  const root = worldMade()
  const sops = sopsIn()
  expect(pushed(root, credentialOf("aine"), sops.doors).kind).toBe("pushed")
  const before = besideText(root, "aine")
  const said = pushed(
    root,
    credentialOf("aine", { accessToken: "fake-access-token-older", accessTokenExpiresAtMs: NOW }),
    sops.doors
  )
  expect(said.kind).toBe("stale")
  expect(whyOf(said)).toContain("the fresher credential wins")
  expect(besideText(root, "aine")).toBe(before)
  expect(heldIn(sops, root, pageAt("aine")).get(ACCESS_KEY)).toBe(ROTATED_ACCESS)
  expect(sops.landed.length).toBe(1)
})

test("a page beside which no expiry is written makes no push stale", () => {
  const root = worldMade()
  expect(expiryHeldIn(besideHeld(root, "aow"))).toBe(null)
  const early = credentialOf("aow", { accessTokenExpiresAtMs: 1 })
  expect(pushed(root, early, sopsIn().doors).kind).toBe("pushed")
})

test("an expiry beside the page that will not read is answered as none", () => {
  expect(expiryHeldIn(null)).toBe(null)
  expect(expiryHeldIn({})).toBe(null)
  expect(expiryHeldIn({ accessTokenExpiresAt: "" })).toBe(null)
  expect(expiryHeldIn({ accessTokenExpiresAt: "not a moment" })).toBe(null)
  expect(expiryHeldIn({ accessTokenExpiresAt: LATER })).toBe(null)
  expect(expiryHeldIn({ accessTokenExpiresAt: LATER_AT })).toBe(LATER)
})

test("a token that is empty or holds a newline is refused and reaches no file", () => {
  const root = worldMade()
  const sops = sopsIn()
  const wrong = [
    { accessToken: "" },
    { refreshToken: "" },
    { accessToken: "one\ntwo" },
    { refreshToken: "one\ntwo" },
  ]
  for (const said of wrong) {
    expect(pushed(root, credentialOf("aine", said), sops.doors).kind).toBe("refused")
  }
  expect(sops.landed).toEqual([])
  expect("accessTokenExpiresAt" in besideHeld(root, "aine")).toBe(false)
})

test("an expiry that is no moment a date holds is refused", () => {
  const root = worldMade()
  const sops = sopsIn()
  for (const ms of [NaN, Number.POSITIVE_INFINITY, 8_640_000_000_000_001]) {
    const said = pushed(root, credentialOf("aine", { accessTokenExpiresAtMs: ms }), sops.doors)
    expect(whyOf(said)).toContain("no moment a date holds")
  }
  expect(sops.landed).toEqual([])
  expect("accessTokenExpiresAt" in besideHeld(root, "aine")).toBe(false)
})

test("a name that is no lower kebab-case slug is refused before the index is read", () => {
  for (const slug of ["../aine", "Aine", "aine/x", "a_b", "-aine", ""]) {
    const said = pushed(NOWHERE, credentialOf(slug), sopsIn().doors)
    expect(whyOf(said)).toContain("is no account name a path is written from")
  }
  expect(whyOf(pushed(NOWHERE, credentialOf("aine"), sopsIn().doors))).toContain("the push threw")
})

test("an account no page is filed for is answered as absent", () => {
  const said = pushed(worldMade(), credentialOf("nobody"), sopsIn().doors)
  expect(said.kind).toBe("absent")
  expect(whyOf(said)).toContain("no page is filed for `nobody`")
})

test("a landing that does not carry the pair holds that pair beside the page", () => {
  const root = worldMade()
  const sops = sopsIn({ landing: refusingLanding(FAILED) })
  const said = pushed(root, credentialOf("aine"), sops.doors)
  expect(said.kind).toBe("refused")
  expect(whyOf(said)).toContain("the landing said no")
  expect(whyOf(said)).toContain("held beside the page")
  expect(besideHeld(root, "aine")["rescuedCredential"]).toEqual({
    accessToken: ROTATED_ACCESS,
    refreshToken: ROTATED_REFRESH,
    expiresAtMs: LATER,
  })
  expect("accessTokenExpiresAt" in besideHeld(root, "aine")).toBe(false)
})

test("a read-back answering nothing holds the rotated pair beside the page", () => {
  const root = worldMade()
  const sops = sopsIn()
  const said = pushed(root, credentialOf("aine"), { ...sops.doors, landing: silentLanding(sops) })
  expect(said.kind).toBe("refused")
  expect(whyOf(said)).toContain("does not read back what it was handed")
  expect(besideHeld(root, "aine")["rescuedCredential"]).toEqual({
    accessToken: ROTATED_ACCESS,
    refreshToken: ROTATED_REFRESH,
    expiresAtMs: LATER,
  })
})

test("a read-back answering another pair holds the rotated pair beside the page", () => {
  const root = worldMade()
  const sops = sopsIn()
  const said = pushed(root, credentialOf("aine"), {
    ...sops.doors,
    landing: crossedLanding(sops),
  })
  expect(said.kind).toBe("refused")
  expect(whyOf(said)).toContain("does not read back what it was handed")
  expect(rescuedIn(besideHeld(root, "aine"))).toEqual({
    accessToken: ROTATED_ACCESS,
    refreshToken: ROTATED_REFRESH,
    accessTokenExpiresAtMs: LATER,
  })
})

test("the file the rotated pair is held in is narrowed before that pair is written", () => {
  const root = worldMade(ACCOUNT_DECLARED)
  expect(modeOf(root, besideAt("aine"))).toBe("644")
  const sops = sopsIn({ landing: refusingLanding(FAILED) })
  const said = pushed(root, credentialOf("aine"), sops.doors)
  expect(whyOf(said)).toContain("was not held beside the page either")
  expect("rescuedCredential" in besideHeld(root, "aine")).toBe(false)
  expect(modeOf(root, besideAt("aine"))).toBe("600")
  expect(whyOf(pushed(root, credentialOf("aow"), sops.doors))).toContain(
    "was not held beside the page either"
  )
  expect(besideHeld(root, "aow")).toEqual({})
  expect(modeOf(root, besideAt("aow"))).toBe("600")
})

test("a file beside a page written for the first time is narrowed too", () => {
  const root = worldMade()
  const sops = sopsIn({ landing: refusingLanding(FAILED) })
  expect(pushed(root, credentialOf("aow"), sops.doors).kind).toBe("refused")
  expect(modeOf(root, besideAt("aow"))).toBe("600")
  expect(besideHeld(root, "aow")["rescuedCredential"]).not.toBe(undefined)
})

test("a push that lands takes the rescued pair away", () => {
  const root = worldMade()
  const refusing = sopsIn({ landing: refusingLanding(FAILED) })
  expect(pushed(root, credentialOf("aine"), refusing.doors).kind).toBe("refused")
  expect("rescuedCredential" in besideHeld(root, "aine")).toBe(true)
  const sops = sopsIn()
  expect(pushed(root, credentialOf("aine"), sops.doors).kind).toBe("pushed")
  expect("rescuedCredential" in besideHeld(root, "aine")).toBe(false)
  expect(besideHeld(root, "aine")["accessTokenExpiresAt"]).toBe(LATER_AT)
})

test("a push answered as unchanged takes the rescued pair away", () => {
  const root = worldMade()
  const refusing = sopsIn({ landing: refusingLanding(FAILED) })
  expect(pushed(root, credentialOf("aine"), refusing.doors).kind).toBe("refused")
  const sops = sopsIn()
  seeded(sops, root, pageAt("aine"), {
    [ACCESS_KEY]: ROTATED_ACCESS,
    [REFRESH_KEY]: ROTATED_REFRESH,
  })
  expect(pushed(root, credentialOf("aine"), sops.doors).kind).toBe("unchanged")
  expect("rescuedCredential" in besideHeld(root, "aine")).toBe(false)
})

test("a push that lands and does not stamp the expiry is refused", () => {
  const root = worldMade()
  const sops = sopsIn()
  const doors = { ...sops.doors, landing: spoilingLanding(sops, besideAt("aine")) }
  const said = pushed(root, credentialOf("aine"), doors)
  expect(said.kind).toBe("refused")
  expect(whyOf(said)).toContain("the reader answers absent")
  expect(heldIn(sops, root, pageAt("aine")).get(ACCESS_KEY)).toBe(ROTATED_ACCESS)
})

test("a secrets reader that throws refuses the push and lands nothing", () => {
  const root = worldMade()
  const sops = sopsIn({
    secretsRead: () => {
      throw new Error("the sops file would not decrypt")
    },
  })
  expect(whyOf(pushed(root, credentialOf("aine"), sops.doors))).toContain("would not decrypt")
  expect(sops.landed).toEqual([])
})

test("a cipher that will not compose refuses the push and rescues nothing", () => {
  const root = worldMade()
  const sops = sopsIn({ cipherMade: () => ({ text: null, why: "sops named no recipient" }) })
  expect(whyOf(pushed(root, credentialOf("aine"), sops.doors))).toContain("no recipient")
  expect(sops.landed).toEqual([])
  expect("rescuedCredential" in besideHeld(root, "aine")).toBe(false)
})

test("a root filing no index refuses the push rather than throwing", () => {
  const said = pushed(NOWHERE, credentialOf("aine"), sopsIn().doors)
  expect(said.kind).toBe("refused")
  expect(whyOf(said)).toContain("the push threw, which it is written never to do")
})

test("pushing one account's credential opens that account's page and no other page", () => {
  const root = worldMade()
  for (const one of ["aine", "aow"]) chmodSync(join(root, pageAt(one)), 0o000)
  expect(() => everyAccountStateIn(root)).toThrow()
  expect(pushed(root, credentialOf("ctw"), sopsIn().doors).kind).toBe("pushed")
  for (const one of ["aine", "aow"]) chmodSync(join(root, pageAt(one)), 0o644)
})

test("pushing one account's credential lists no directory the accounts are filed under", () => {
  const root = worldMade()
  const routing = routingIn(readingIn(root), bodiesIn(root))
  const one = counting(root)
  const said = pushedIn(
    root,
    credentialOf("aine"),
    sopsIn().doors,
    one.reading,
    bodiesIn(root),
    routing
  )
  expect(said.kind).toBe("pushed")
  expect(one.seen).toEqual([])
})

test("no token value reaches a refusal", () => {
  const root = worldMade()
  const sops = sopsIn({ landing: refusingLanding(FAILED) })
  for (const slug of ["aine", "aow", "ctw"]) {
    const said = whyOf(pushed(root, credentialOf(slug), sops.doors))
    expect(said).not.toContain(ROTATED_ACCESS)
    expect(said).not.toContain(ROTATED_REFRESH)
  }
})

test("a landing refusal naming nothing says the code the landing answered", () => {
  expect(sayingOf({ report: [], refusals: [], code: 7 })).toBe(
    "the landing answered 7 and said nothing"
  )
  expect(sayingOf({ report: ["only a report"], refusals: [" "], code: 7 })).toBe("only a report")
  expect(sayingOf({ report: ["a report"], refusals: ["one", "two"], code: 1 })).toBe("one; two")
})

test("narrowing a path that is no TypeScript file answers with why", () => {
  expect(narrowedFor(worldMade(), "no-typescript-file")).toContain("names no file to hold")
})

test("the doors bind the sops reader, the cipher and the landing", () => {
  expect(typeof DOORS.secretsRead).toBe("function")
  expect(typeof DOORS.cipherMade).toBe("function")
  expect(typeof DOORS.landing).toBe("function")
})

test("a second rotation after a rescue lands and clears the rescue", () => {
  const root = worldMade()
  const refusing = sopsIn({ landing: refusingLanding(FAILED) })
  expect(pushed(root, credentialOf("aine"), refusing.doors).kind).toBe("refused")
  const sops = sopsIn()
  const later = credentialOf("aine", { accessTokenExpiresAtMs: LATER + AN_HOUR })
  expect(pushed(root, later, sops.doors).kind).toBe("pushed")
  expect(rescuedIn(besideHeld(root, "aine"))).toBe(null)
  expect(heldIn(sops, root, pageAt("aine")).get(REFRESH_KEY)).toBe(ROTATED_REFRESH)
})
