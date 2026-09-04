import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { ran } from "@akasha/utils-run/running"
import { baseOf } from "../../../command-system/landing/landing.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import {
  emptiedBy,
  NO_WORKSPACING,
  withoutNamed,
  workspacesIn,
  workspacingFor,
  workspacingSaid,
} from "./remove-workspacing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const MANIFEST = "package.json"

const ROOT_BODY = `{
  "name": "held",
  "private": true,
  "workspaces": [
    "one",
    "two"
  ],
  "trustedDependencies": [
    "one"
  ]
}
`

const FROZEN = ["bun", "install", "--frozen-lockfile", "--dry-run"]

function packageBody(name: string): string {
  return `{\n  "name": "@held/${name}",\n  "version": "0.0.0"\n}\n`
}

function world(): string {
  const root = scratch.rootFor("akasha-remove-workspacing-")
  const named: Record<string, string> = {
    [MANIFEST]: ROOT_BODY,
    "one/package.json": packageBody("one"),
    "two/package.json": packageBody("two"),
  }
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  ran(["bun", "install", "--lockfile-only"], { cwd: root })
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

const TAKING = new Set(["one/package.json"])

test("an entry is emptied only where the removal takes the manifest that entry names", () => {
  expect(emptiedBy(["one", "two"], TAKING)).toEqual(["one"])
  expect(emptiedBy(["one", "two"], new Set(["one/src/held.ts"]))).toEqual([])
  expect(emptiedBy([], TAKING)).toEqual([])
})

test("a workspaces list is read off the manifest, and anything else answers as no list", () => {
  expect(workspacesIn(ROOT_BODY)).toEqual(["one", "two"])
  expect(workspacesIn("{ not json")).toBe(null)
  expect(workspacesIn('{ "name": "held" }')).toBe(null)
})

test("an entry is dropped out of the list and every other byte is left as it was", () => {
  const said = withoutNamed(MANIFEST, ROOT_BODY, new Set(["one"]))
  expect(workspacesIn(said)).toEqual(["two"])
  expect(said).toContain('"trustedDependencies"')
  expect(JSON.parse(said).trustedDependencies).toEqual(["one"])
  expect(withoutNamed(MANIFEST, ROOT_BODY, new Set(["three"]))).toBe(ROOT_BODY)
})

test("a removal emptying no workspace asks for no change and has nothing to say", () => {
  const root = world()
  const held = workspacingFor(root, baseOf(root), new Set(["one/src/held.ts"]))
  expect(held).toEqual(NO_WORKSPACING)
  expect(workspacingSaid(held)).toEqual([])
})

test("the manifest is asked for without the entry the removal emptied", () => {
  const root = world()
  const held = workspacingFor(root, baseOf(root), TAKING)
  expect(held.emptied).toEqual(["one"])
  expect(held.why).toBe(null)
  expect(held.edits.map((one) => one.path)).toEqual([MANIFEST])
  const manifest = new TextDecoder().decode(held.edits[0]?.body ?? new Uint8Array())
  expect(workspacesIn(manifest)).toEqual(["two"])
})

test("the body the mending was worked out from is answered so the caller can be held to it", () => {
  const root = world()
  const held = workspacingFor(root, baseOf(root), TAKING)
  expect(held.unmoved.map((one) => one.path)).toEqual([MANIFEST])
  expect(new TextDecoder().decode(held.unmoved[0]?.was ?? new Uint8Array())).toBe(ROOT_BODY)
  expect(workspacingFor(root, baseOf(root), new Set(["one/src/held.ts"])).unmoved).toEqual([])
  expect(workspacingFor(root, "no-commit-of-that-name", TAKING).unmoved).toEqual([])
})

test("a base holding no root manifest asks for no change and says why", () => {
  const root = world()
  const held = workspacingFor(root, "no-commit-of-that-name", TAKING)
  expect(held.edits).toEqual([])
  expect(held.why).toContain("went ahead alone")
  expect(workspacingSaid(held)).toEqual([held.why ?? ""])
})

test("the workspace the removal emptied is no longer looked for, and was before", () => {
  const root = world()
  const held = workspacingFor(root, baseOf(root), TAKING)
  rmSync(join(root, "one"), { recursive: true, force: true })
  const before = ran(FROZEN, { cwd: root })
  expect(before.code).not.toBe(0)
  expect(`${before.out}${before.err}`).toContain('Workspace not found "one"')
  for (const one of held.edits) {
    writeFileSync(join(root, one.path), one.body ?? new Uint8Array())
  }
  const after = ran(FROZEN, { cwd: root })
  expect(`${after.out}${after.err}`).not.toContain("Workspace not found")
  expect(readFileSync(join(root, MANIFEST), "utf8")).not.toContain('"one",')
})
