import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { ran } from "@akasha/utils-run/running"
import { baseOf } from "../landing/landing.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import {
  carriesLock,
  installedIn,
  installingIn,
  lockedOver,
  lockingFor,
  manifestsIn,
  NOTHING_INSTALLED,
  NOTHING_LOCKED,
  sameBytes,
} from "./manifest-locking.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const MANIFEST = "package.json"

const LOCK = "bun.lock"

const MODULES = "node_modules"

const ROOT_BODY = `{
  "name": "held",
  "private": true,
  "workspaces": [
    "held/*"
  ]
}
`

const FROZEN = ["bun", "install", "--frozen-lockfile", "--dry-run"]

const LINKED_BODY = `{
  "name": "held",
  "private": true,
  "workspaces": [
    "held/*"
  ],
  "dependencies": {
    "@held/one": "workspace:*"
  }
}
`

function packageBody(name: string): string {
  return `{\n  "name": "@held/${name}",\n  "version": "0.0.0"\n}\n`
}

function bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

function world(whole: boolean = false): string {
  const root = scratch.rootFor("akasha-manifest-locking-")
  for (const [path, body] of Object.entries({
    [MANIFEST]: whole ? LINKED_BODY : ROOT_BODY,
    "held/one/package.json": packageBody("one"),
    "held/two/package.json": packageBody("two"),
  })) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  ran(whole ? ["bun", "install"] : ["bun", "install", "--lockfile-only"], { cwd: root })
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

const ARRIVING = [{ path: "held/three/package.json", body: bytes(packageBody("three")) }]

test("a manifest is one named package.json at the root or under a folder", () => {
  expect(
    manifestsIn([
      { path: MANIFEST, body: null },
      { path: "held/one/package.json", body: null },
      { path: "held/one/package.jsonc", body: null },
      { path: "held/one/src/held.ts", body: null },
    ]).map((one) => one.path)
  ).toEqual([MANIFEST, "held/one/package.json"])
})

test("a landing carrying a lockfile of its own is known from one that does not", () => {
  expect(carriesLock([{ path: LOCK, body: null }])).toBe(true)
  expect(carriesLock(ARRIVING)).toBe(false)
})

test("two bodies are the same bytes or they are not, and nothing is not a body", () => {
  expect(sameBytes(bytes("a"), bytes("a"))).toBe(true)
  expect(sameBytes(bytes("a"), bytes("b"))).toBe(false)
  expect(sameBytes(bytes("a"), bytes("aa"))).toBe(false)
  expect(sameBytes(null, null)).toBe(true)
  expect(sameBytes(null, bytes("a"))).toBe(false)
})

test("a landing carrying no manifest asks for no change and has nothing to say", () => {
  const root = world()
  expect(
    lockingFor(root, baseOf(root), [{ path: "held/one/src/held.ts", body: bytes("") }])
  ).toEqual(NOTHING_LOCKED)
})

test("a landing carrying its own lockfile is taken at its word", () => {
  const root = world()
  const held = [...ARRIVING, { path: LOCK, body: bytes("held") }]
  expect(lockingFor(root, baseOf(root), held)).toEqual(NOTHING_LOCKED)
})

test("a manifest that moves the lockfile nowhere is carried by no landing", () => {
  const root = world()
  const same = [{ path: "held/one/package.json", body: bytes(packageBody("one")) }]
  expect(lockingFor(root, baseOf(root), same)).toEqual(NOTHING_LOCKED)
})

test("a lockfile that could not be made leaves the landing whole and says so", () => {
  const root = world()
  const held = lockingFor(root, "no-commit-of-that-name", ARRIVING)
  expect(held.edits).toEqual([])
  expect(held.said[0]).toContain("could not be made again")
  expect(lockedOver(root, "no-commit-of-that-name", ARRIVING)).toBe(null)
})

test("a manifest arriving takes the lockfile with it, and the tree installs after", () => {
  const root = world()
  const held = lockingFor(root, baseOf(root), ARRIVING)
  expect(held.edits.map((one) => one.path)).toEqual([LOCK])
  for (const one of ARRIVING) {
    const at = join(root, one.path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, one.body ?? new Uint8Array())
  }
  expect(ran(FROZEN, { cwd: root }).code).not.toBe(0)
  for (const one of held.edits) {
    writeFileSync(join(root, one.path), one.body ?? new Uint8Array())
  }
  expect(ran(FROZEN, { cwd: root }).code).toBe(0)
})

test("a landing carrying no manifest installs nothing", () => {
  const root = world()
  expect(installingIn(root, [{ path: "held/one/src/held.ts", body: bytes("") }])).toEqual(
    NOTHING_INSTALLED
  )
})

test("a landing carrying a manifest points the workspace at the folder that manifest names", () => {
  const root = world(true)
  const link = join(root, MODULES, "@held", "one")
  expect(existsSync(link)).toBe(true)
  const moving = [
    { path: "held/one/package.json", body: null },
    { path: "held/moved/package.json", body: bytes(packageBody("one")) },
  ]
  const locked = lockingFor(root, baseOf(root), moving)
  for (const one of [...moving, ...locked.edits]) {
    const at = join(root, one.path)
    if (one.body === null) {
      rmSync(join(at, ".."), { recursive: true, force: true })
      continue
    }
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, one.body)
  }
  expect(existsSync(link)).toBe(false)
  const put = installingIn(root, moving)
  expect(put.wrong).toEqual([])
  expect(existsSync(link)).toBe(true)
})

test("a lockfile the install makes again says the commit carries one its manifests do not warrant", () => {
  const root = world(true)
  const at = join(root, "held/three/package.json")
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, packageBody("three"))
  const put = installedIn(root)
  expect(put.said).toEqual([])
  expect(put.wrong[0]).toContain(LOCK)
})

test("a manifest going takes the lockfile with it, as one arriving does", () => {
  const root = world()
  const going = [{ path: "held/one/package.json", body: null }]
  const held = lockingFor(root, baseOf(root), going)
  expect(held.edits.map((one) => one.path)).toEqual([LOCK])
  rmSync(join(root, "held/one"), { recursive: true, force: true })
  expect(ran(FROZEN, { cwd: root }).code).not.toBe(0)
  for (const one of held.edits) {
    writeFileSync(join(root, one.path), one.body ?? new Uint8Array())
  }
  expect(ran(FROZEN, { cwd: root }).code).toBe(0)
})
