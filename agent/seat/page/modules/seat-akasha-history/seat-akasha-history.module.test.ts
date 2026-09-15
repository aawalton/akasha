import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  akashaSeatNamedInHistory,
  akashaSeatsInHistory,
} from "akasha/agent/seat/page/modules/seat-akasha-history/seat-akasha-history.module.code.ts"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { indexAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const TYPE_AT = "held/chairs/held.ts"

const TYPE =
  'export const seat = { id: "held", type: "page-type", slug: "seat", pluralSlug: "seats" }\n'

const SEATS_AT = "held/chairs/seats"

const SEATS_BEFORE = "seat-system/seat/pages"

const SEAT_FILED_AT = indexAt("page-type", "page-type", "slug", "seat.jsonl")

function put(root: string, path: string, body: string): undefined {
  const at = join(root, path)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, body)
  return undefined
}

function took(root: string, path: string): undefined {
  rmSync(join(root, path))
  return undefined
}

function git(root: string, argv: readonly string[], atSecond?: number): string {
  const stamp = atSecond === undefined ? "" : `@${String(atSecond)} +0000`
  return said(
    ["git", "-C", root, ...argv],
    atSecond === undefined
      ? {}
      : { env: { ...process.env, GIT_AUTHOR_DATE: stamp, GIT_COMMITTER_DATE: stamp } }
  )
}

function landed(root: string, atSecond: number): undefined {
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "held"], atSecond)
  return undefined
}

function pageOf(slug: string, id: string): string {
  const named = JSON.stringify(slug)
  return `export const ${slug} = { id: ${JSON.stringify(id)}, type: "seat", slug: ${named} }\n`
}

function repoMade(): string {
  const root = scratch.rootFor("akasha-seat-history-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  put(root, SEAT_FILED_AT, `${JSON.stringify({ path: TYPE_AT, id: "held" })}\n`)
  put(root, TYPE_AT, TYPE)
  landed(root, 1000)
  return root
}

test("a seat page taken away holds nothing in history", () => {
  const root = repoMade()
  const at = `${SEATS_AT}/gone/gone.seat.ts`
  put(root, at, pageOf("gone", "id-gone"))
  landed(root, 2000)
  took(root, at)
  landed(root, 3000)
  expect(akashaSeatNamedInHistory("gone", root)).toBeNull()
})

test("a seat page moved and then taken away holds nothing at the path it left", () => {
  const root = repoMade()
  const was = `${SEATS_BEFORE}/moved.seat.ts`
  const now = `${SEATS_AT}/moved/moved.seat.ts`
  put(root, was, pageOf("moved", "id-moved"))
  landed(root, 2000)
  took(root, was)
  put(root, now, pageOf("moved", "id-moved"))
  landed(root, 3000)
  took(root, now)
  landed(root, 4000)
  expect(akashaSeatNamedInHistory("moved", root)).toBeNull()
})

test("where two paths end in the same file name, the one changed most recently answers", () => {
  const root = repoMade()
  const now = `${SEATS_AT}/twice/twice.seat.ts`
  put(root, now, pageOf("twice", "id-new"))
  landed(root, 5000)
  put(root, `${SEATS_BEFORE}/twice.seat.ts`, pageOf("twice", "id-old"))
  landed(root, 4000)
  const held = akashaSeatNamedInHistory("twice", root)
  expect(held?.values["id"]).toBe("id-new")
  expect(held?.path).toBe(now)
})

test("a seat page still there is read from the newest commit that wrote it", () => {
  const root = repoMade()
  const at = `${SEATS_AT}/held/held.seat.ts`
  put(root, at, pageOf("held", "id-first"))
  landed(root, 2000)
  put(root, at, pageOf("held", "id-second"))
  landed(root, 3000)
  expect(akashaSeatNamedInHistory("held", root)?.values["id"]).toBe("id-second")
})

test("what was read at one commit is read again while that commit has not moved", () => {
  const root = repoMade()
  put(root, `${SEATS_AT}/kept/kept.seat.ts`, pageOf("kept", "id-kept"))
  landed(root, 2000)
  const first = akashaSeatsInHistory(root)
  expect(akashaSeatsInHistory(root)).toBe(first)
  expect(akashaSeatNamedInHistory("kept", root)?.values["id"]).toBe("id-kept")
})

test("a seat page landed after history was read is answered for on the next call", () => {
  const root = repoMade()
  expect(akashaSeatNamedInHistory("later", root)).toBeNull()
  put(root, `${SEATS_AT}/later/later.seat.ts`, pageOf("later", "id-later"))
  landed(root, 2000)
  expect(akashaSeatNamedInHistory("later", root)?.values["id"]).toBe("id-later")
})
