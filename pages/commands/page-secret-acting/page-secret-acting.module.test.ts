import { afterAll, expect, test } from "bun:test"
import { copyFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Applied } from "../../../commands/modules/applying/applying.module.code.ts"
import type { Given } from "../../../commands/modules/calling/calling.module.code.ts"
import type { Refused } from "../../../commands/modules/landing/landing.module.code.ts"
import { rootOf } from "../../../commands/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import {
  FILE_PATH,
  KEEP_LAST_NEWLINE,
  KEY,
  type Landing,
  landedWith,
  MESSAGE,
  PUT,
  readIn,
  type Said,
  TAKE,
  type Target,
  undeclared,
  valueIn,
} from "./page-secret-acting.module.code.ts"

const AT = "akasha/agents/claude-accounts/pages/one.claude-account.ts"

const HOLDING = { path: AT, sidecar: "one.claude-account.sops.yaml", declared: ["accessToken"] }

test("a call naming nothing is refused, naming what it takes", () => {
  const read = readIn([], [FILE_PATH])
  expect("refused" in read).toBe(true)
  expect(JSON.stringify(read)).toContain(FILE_PATH)
})

test("a flag it does not take is refused", () => {
  const read = readIn([FILE_PATH, AT, "--wat"], [FILE_PATH])
  expect(JSON.stringify(read)).toContain("--wat")
})

test("a flag standing where a value goes is refused rather than read as the value", () => {
  const read = readIn([FILE_PATH, KEY], [FILE_PATH, KEY])
  expect("refused" in read).toBe(true)
})

test("a flag said twice is refused", () => {
  const read = readIn([FILE_PATH, AT, FILE_PATH, AT], [FILE_PATH])
  expect("refused" in read).toBe(true)
})

test("a word said as no flag is refused", () => {
  const read = readIn(["show", FILE_PATH, AT], [FILE_PATH])
  expect("refused" in read).toBe(true)
})

test("a message is what this does not require", () => {
  expect(readIn([FILE_PATH, AT], [FILE_PATH, MESSAGE])).toEqual({
    path: AT,
    key: null,
    message: null,
    keepLastNewline: false,
  })
})

test("what is read carries the path, the key and the message apart", () => {
  expect(
    readIn([FILE_PATH, AT, KEY, "accessToken", MESSAGE, "m"], [FILE_PATH, KEY, MESSAGE])
  ).toEqual({ path: AT, key: "accessToken", message: "m", keepLastNewline: false })
})

test("a flag carrying no value is read as said rather than eating the word after it", () => {
  expect(readIn([KEEP_LAST_NEWLINE, FILE_PATH, AT], [FILE_PATH], [KEEP_LAST_NEWLINE])).toEqual({
    path: AT,
    key: null,
    message: null,
    keepLastNewline: true,
  })
})

test("a flag carrying no value is refused where the call does not offer it", () => {
  const read = readIn([FILE_PATH, AT, KEEP_LAST_NEWLINE], [FILE_PATH])
  expect("refused" in read).toBe(true)
})

test("a flag carrying no value said twice is refused", () => {
  const read = readIn(
    [FILE_PATH, AT, KEEP_LAST_NEWLINE, KEEP_LAST_NEWLINE],
    [FILE_PATH],
    [KEEP_LAST_NEWLINE]
  )
  expect("refused" in read).toBe(true)
})

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

const SAID: Said = { path: PAGE, key: null, message: null, keepLastNewline: false }

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
  expect(said).toEqual({ report: [`took away ${SIDECAR}`], refusals: [], code: 0 })
})

test("what is composed is written through the change adding a file of any kind", async () => {
  const fake = reaching()
  const values = new Map([["access-token", "one"]])
  const said = await landedWith(givenIn(rooted()), SAID, TARGET, "set", values, fake.landing)
  expect(said).toEqual({ report: [`wrote ${SIDECAR}`], refusals: [], code: 0 })
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
  expect(said.code).toBe(2)
  expect(said.refusals).toContain("nothing was written")
})

test("a landing that refuses is answered by what that landing refused", async () => {
  const fake = reaching({ refusals: ["another landing held the lock"] })
  const said = await landedWith(givenIn(NOWHERE), SAID, TARGET, "clear", new Map(), fake.landing)
  expect(said).toEqual({ report: [], refusals: ["another landing held the lock"], code: 3 })
})

test("a landing answering something wrong is answered by what went wrong", async () => {
  const fake = reaching({ ...LANDED, wrong: ["the check refused"] })
  const said = await landedWith(givenIn(NOWHERE), SAID, TARGET, "clear", new Map(), fake.landing)
  expect(said).toEqual({ report: [], refusals: ["the check refused"], code: 3 })
})

test("a message the caller spells reaches the landing rather than the one composed", async () => {
  const fake = reaching()
  const spelled = { ...SAID, message: "  a reason of my own  " }
  await landedWith(givenIn(NOWHERE), spelled, TARGET, "clear", new Map(), fake.landing)
  expect(fake.handed()?.message).toBe("a reason of my own")
})
