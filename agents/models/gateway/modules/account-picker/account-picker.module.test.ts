import { expect, test } from "bun:test"
import type { OAuthEffects } from "../oauth-effects/oauth-effects.module.code.ts"
import type { CredentialPick } from "../oauth-types/oauth-types.module.code.ts"
import {
  bindLine,
  buildAccountPicker,
  excludesFrom,
  type PickerDoors,
} from "./account-picker.module.code.ts"

const PREFIX = "[gw]"

const FAKE_TOKEN = "fake-access-token-for-a-test"

type Asked = {
  readonly effects: OAuthEffects
  readonly seen: ReadonlySet<string>[]
  readonly prefixes: string[]
  readonly lines: string[]
  readonly doors: PickerDoors
}

function pickOf(account: string): CredentialPick {
  return {
    credential: {
      account,
      accessToken: FAKE_TOKEN,
      refreshToken: FAKE_TOKEN,
      expiresAt: 1_700_000_000_000,
      scopes: [],
      subscriptionType: null,
      rateLimitTier: null,
    },
    fiveHourResetsAtMs: null,
  }
}

function refuse(): never {
  throw new Error("nothing here reaches an account")
}

function asked(answers: readonly (CredentialPick | null)[]): Asked {
  const seen: ReadonlySet<string>[] = []
  const prefixes: string[] = []
  const lines: string[] = []
  let turn = 0
  const effects: OAuthEffects = {
    getBestCredential: async (prefix, excludes) => {
      prefixes.push(prefix ?? "")
      seen.push(excludes ?? new Set())
      const answer = answers[Math.min(turn, answers.length - 1)] ?? null
      turn += 1
      return answer
    },
    getCredentialByAccount: refuse,
    markAccountAtLimit: refuse,
    repollUsageAfter429: refuse,
    getClaudeAccountPacing: refuse,
    markAccountSubscriptionDisabled: refuse,
    clearAccountSubscriptionDisabled: refuse,
  }
  return {
    effects,
    seen,
    prefixes,
    lines,
    doors: {
      said: (line) => {
        lines.push(line)
      },
    },
  }
}

test("a pick answers the account the chosen credential names", async () => {
  const one = asked([pickOf("aine")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  expect(await pick()).toEqual({ account: "aine" })
  expect(one.lines).toEqual([`${PREFIX} bind account=aine`])
})

test("a pick the effects answer no credential to answers no account", async () => {
  const one = asked([null])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  expect(await pick()).toBeNull()
  expect(one.lines).toEqual([])
})

test("a pick handed no exclude excludes no account", async () => {
  const one = asked([pickOf("aine")])
  await buildAccountPicker(PREFIX, one.effects, one.doors)()
  expect([...(one.seen[0] ?? new Set())]).toEqual([])
})

test("an account named as a string is excluded from the choice", async () => {
  const one = asked([pickOf("ctw")])
  await buildAccountPicker(PREFIX, one.effects, one.doors)("aine")
  expect([...(one.seen[0] ?? new Set())]).toEqual(["aine"])
  expect(one.lines).toEqual([`${PREFIX} bind account=ctw exclude=aine`])
})

test("a set of accounts handed in is excluded as handed in", async () => {
  const one = asked([pickOf("zed")])
  const held = new Set(["aine", "ctw"])
  await buildAccountPicker(PREFIX, one.effects, one.doors)(held)
  expect(one.seen[0]).toBe(held)
  expect(one.lines).toEqual([`${PREFIX} bind account=zed exclude=aine,ctw`])
})

test("an account picked after another is written about as a rebind", async () => {
  const one = asked([pickOf("aine"), pickOf("ctw")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  await pick()
  await pick("aine")
  expect(one.lines).toEqual([
    `${PREFIX} bind account=aine`,
    `${PREFIX} rebind account=ctw from=aine exclude=aine`,
  ])
})

test("the account picked again is written about no second time", async () => {
  const one = asked([pickOf("aine"), pickOf("aine"), pickOf("aine")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  await pick()
  await pick()
  await pick()
  expect(one.lines.length).toBe(1)
})

test("the account picked before is remembered through a pick that answered nothing", async () => {
  const one = asked([pickOf("aine"), null, pickOf("aine")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  await pick()
  expect(await pick()).toBeNull()
  await pick()
  expect(one.lines).toEqual([`${PREFIX} bind account=aine`])
})

test("a pick asked for while a pick is in flight is answered by the pick in flight", async () => {
  const one = asked([pickOf("aine"), pickOf("ctw")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  const first = pick()
  const second = pick("aine")
  expect(await second).toEqual({ account: "aine" })
  expect(await first).toEqual({ account: "aine" })
  expect(one.seen.length).toBe(1)
})

test("the pick in flight is let go once that pick settles", async () => {
  const one = asked([pickOf("aine"), pickOf("ctw")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  await pick()
  expect(await pick("aine")).toEqual({ account: "ctw" })
  expect(one.seen.length).toBe(2)
})

test("a pick that throws is thrown on and lets the pick in flight go", async () => {
  const one = asked([pickOf("aine")])
  const thrown: OAuthEffects = {
    ...one.effects,
    getBestCredential: async () => {
      throw new Error("the index is not there")
    },
  }
  const pick = buildAccountPicker(PREFIX, thrown, one.doors)
  await expect(pick()).rejects.toThrow("the index is not there")
  const after = buildAccountPicker(PREFIX, one.effects, one.doors)
  expect(await after()).toEqual({ account: "aine" })
})

test("a pick that throws leaves nothing in flight", async () => {
  const one = asked([pickOf("aine")])
  let turn = 0
  const flaky: OAuthEffects = {
    ...one.effects,
    getBestCredential: async () => {
      turn += 1
      if (turn === 1) throw new Error("first is refused")
      return pickOf("ctw")
    },
  }
  const pick = buildAccountPicker(PREFIX, flaky, one.doors)
  await expect(pick()).rejects.toThrow("first is refused")
  expect(await pick()).toEqual({ account: "ctw" })
})

test("an exclude is read into a set of its own where a string is handed in", () => {
  expect([...excludesFrom("aine")]).toEqual(["aine"])
  expect([...excludesFrom(undefined)]).toEqual([])
  const held = new Set(["ctw"])
  expect(excludesFrom(held)).toBe(held)
})

test("a bind line names the command, the account, the account before and the excludes", () => {
  expect(bindLine(PREFIX, "aine", null, new Set())).toBe(`${PREFIX} bind account=aine`)
  expect(bindLine(PREFIX, "ctw", "aine", new Set())).toBe(`${PREFIX} rebind account=ctw from=aine`)
  expect(bindLine(PREFIX, "ctw", "aine", new Set(["aine", "zed"]))).toBe(
    `${PREFIX} rebind account=ctw from=aine exclude=aine,zed`
  )
})

test("the prefix the picker was built with reaches the effects", async () => {
  const one = asked([pickOf("aine")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  expect(await pick()).toEqual({ account: "aine" })
  expect(one.prefixes).toEqual([PREFIX])
  expect(one.seen.length).toBe(1)
})

test("no line written here carries a token", async () => {
  const one = asked([pickOf("aine"), pickOf("ctw")])
  const pick = buildAccountPicker(PREFIX, one.effects, one.doors)
  await pick()
  await pick("aine")
  expect(one.lines.join(" ")).not.toContain(FAKE_TOKEN)
})
