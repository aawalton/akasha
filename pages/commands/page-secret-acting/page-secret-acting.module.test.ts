import { afterAll, expect, test } from "bun:test"
import { copyFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Applied } from "akasha/commands/modules/applying/applying.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Refused } from "akasha/commands/modules/landing/landing.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  type Landing,
  landedWith,
  PUT,
  type Saying,
  TAKE,
  type Target,
  undeclared,
  valueIn,
} from "akasha/pages/commands/page-secret-acting/page-secret-acting.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const AT = "akasha/agents/claude-accounts/pages/one.claude-account.ts"

const HOLDING = { path: AT, sidecar: "one.claude-account.sops.yaml", declared: ["accessToken"] }

test("a key the page type does not declare is named against the ones it does", () => {
  const wrong = undeclared("wat", HOLDING)
  expect(wrong).toContain("wat")
  expect(wrong).toContain("accessToken")
})

test("a key the page type declares secret passes", () => {
  expect(undeclared("accessToken", HOLDING)).toBeNull()
})

test("a page type declaring no secret says so rather than naming nothing", () => {
  expect(undeclared("wat", { ...HOLDING, declared: [] })).toContain("declares none")
})

test("one trailing newline is dropped from a value piped in", () => {
  expect(valueIn(new TextEncoder().encode("held\n"))).toBe("held")
})

test("a value carrying no trailing newline is taken whole", () => {
  expect(valueIn(new TextEncoder().encode("held"))).toBe("held")
})

test("a value holding newlines of its own is taken whole", () => {
  expect(valueIn(new TextEncoder().encode("one\ntwo\n"))).toBe("one\ntwo")
})

test("the trailing newline is kept where the caller says to keep it", () => {
  expect(valueIn(new TextEncoder().encode("one\ntwo\n"), true)).toBe("one\ntwo\n")
})

test("a value that arrives empty is refused rather than standing for a usable one", () => {
  expect(typeof valueIn(new TextEncoder().encode("\n"))).toBe("object")
})

test("a value that is one newline kept is a value rather than empty", () => {
  expect(valueIn(new TextEncoder().encode("\n"), true)).toBe("\n")
})

test("what is piped in that is no utf-8 text is refused", () => {
  expect(typeof valueIn(new Uint8Array([0xff, 0xfe, 0xfd]))).toBe("object")
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

const REPO = rootOf(import.meta.dir)

const NOWHERE = "/nowhere"

const PAGE = "akasha/one/aine.claude-account.ts"

const SIDECAR = "akasha/one/aine.claude-account.sops.yaml"

const TARGET: Target = { path: PAGE, sidecar: SIDECAR, declared: ["access-token"] }

const SAID: Saying = {}

const SET = `page secret set ${SIDECAR}`

const CLEAR = `page secret clear ${SIDECAR}`

const LANDED: Applied = {
  base: "0000000000000000000000000000000000000000",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "1111111111111111111111111111111111111111",
}

type Handed = { readonly changes: readonly Asking[]; readonly message: string }

type Reached = { readonly landing: Landing; readonly handed: () => Handed | null }

function reaching(answer: Applied | Refused = LANDED): Reached {
  let seen: Handed | null = null
  const landing: Landing = async (_root, changes, message) => {
    seen = { changes, message }
    return answer
  }
  return { landing, handed: () => seen }
}

function givenIn(root: string): Given {
  return { root, calledAs: "page-secret-acting", from: root, writer: null, agentId: null }
}

function rooted(): string {
  const root = scratch.rootFor("page-secret-acting-")
  copyFileSync(join(REPO, ".sops.yaml"), join(root, ".sops.yaml"))
  mkdirSync(join(root, "akasha/one"), { recursive: true })
  return root
}

test("a sops file holding nothing is taken away through the change removing a file", async () => {
  const fake = reaching()
  const said = await landedWith(givenIn(NOWHERE), SAID, TARGET, "clear", new Map(), fake.landing)
  expect(fake.handed()).toEqual({
    changes: [{ at: TAKE, given: { at: SIDECAR } }],
    message: CLEAR,
  })
  expect(said).toEqual({ report: [`took away ${SIDECAR}`], refusals: [], code: OK })
})

test("what is composed is written through the change adding a file of any kind", async () => {
  const fake = reaching()
  const values = new Map([["access-token", "one"]])
  const said = await landedWith(givenIn(rooted()), SAID, TARGET, "set", values, fake.landing)
  expect(said).toEqual({ report: [`wrote ${SIDECAR}`], refusals: [], code: OK })
  const one = fake.handed()
  if (one === null) throw new Error("nothing reached the landing")
  expect(one.message).toBe(SET)
  expect(one.changes.length).toBe(1)
  const change = one.changes[0]
  if (change === undefined || change.at !== PUT) throw new Error("no add reached the landing")
  expect(change.given.at).toBe(SIDECAR)
  expect(change.given.body).toContain("access-token: ENC[")
})

test("a value that will not compose is refused and reaches no landing", async () => {
  const fake = reaching()
  const values = new Map([["access-token", ""]])
  const said = await landedWith(givenIn(NOWHERE), SAID, TARGET, "set", values, fake.landing)
  expect(fake.handed()).toBeNull()
  expect(said.code).toBe(DATA)
  expect(said.refusals).toContain("nothing was written")
})

test("a landing that refuses is answered by what that landing refused", async () => {
  const fake = reaching({ refusals: ["another landing held the lock"], code: OPERATIONAL })
  const said = await landedWith(givenIn(NOWHERE), SAID, TARGET, "clear", new Map(), fake.landing)
  expect(said).toEqual({
    report: [],
    refusals: ["another landing held the lock"],
    code: OPERATIONAL,
  })
})

test("a landing answering something wrong is answered by what went wrong", async () => {
  const fake = reaching({ ...LANDED, wrong: ["the check refused"] })
  const said = await landedWith(givenIn(NOWHERE), SAID, TARGET, "clear", new Map(), fake.landing)
  expect(said).toEqual({ report: [], refusals: ["the check refused"], code: OPERATIONAL })
})

test("a message the caller spells reaches the landing rather than the one composed", async () => {
  const fake = reaching()
  const spelled = { ...SAID, commitMessage: "  a reason of my own  " }
  await landedWith(givenIn(NOWHERE), spelled, TARGET, "clear", new Map(), fake.landing)
  expect(fake.handed()?.message).toBe("a reason of my own")
})

const THREW = "the links would not be placed"

function throwing(commit: string | null): Landing {
  return async (_root, _changes, _message, _agentId, writing) => {
    if (commit !== null) writing?.done?.push(commit)
    throw new Error(THREW)
  }
}

test("a landing that threw after its commit names that commit rather than nothing written", async () => {
  const said = await landedWith(
    givenIn(NOWHERE),
    SAID,
    TARGET,
    "clear",
    new Map(),
    throwing(LANDED.commit)
  )
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toContain(THREW)
  expect(said.refusals[1]).toBe(
    `${LANDED.commit ?? ""} was committed before this stopped, ` +
      "so read that commit rather than running this again"
  )
})

test("a landing that threw before committing anything says nothing was written", async () => {
  const said = await landedWith(givenIn(NOWHERE), SAID, TARGET, "clear", new Map(), throwing(null))
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toContain(THREW)
  expect(said.refusals[1]).toBe("nothing was written")
})
