import { afterAll, expect, test } from "bun:test"
import {
  carriedOver,
  heldByGit,
} from "akasha/pages/indexes/modules/carrying/index-carrying.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/modules/filing/index-filing.module.code.ts"
import { nothingFiled } from "akasha/pages/indexes/modules/reading/index-reading.module.test-fixtures.ts"
import { indexAt } from "akasha/pages/indexes/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const INDEX = "index"

const HELD = "01a09209-0000-7000-8000-00000000000a"

const AWAY = "01a09209-0000-7000-8000-00000000000b"

const AT = indexAt("identity", "page/id/held.jsonl")

const LINE = '{"path":"akasha/a.domain.ts","id":"01a09209-0000-7000-8000-00000000000c"}\n'

const BYTES = new TextEncoder()

function indexPageIn(root: string, slug: string, id: string, value: object): undefined {
  const path = `akasha/${slug}.index.ts`
  listedFiled(root, INDEX, slug, [{ path, id }])
  valueAlsoFiled(root, INDEX, [{ path, value: { id, pageTypeSlug: INDEX, slug, ...value } }])
}

function worldOf(value: object): string {
  const root = scratch.rootFor("akasha-index-carrying-")
  nothingFiled(root)
  indexPageIn(root, "index-identity", HELD, value)
  indexPageIn(root, "index-path", AWAY, { name: "path" })
  return root
}

function shadowOf(root: string, filed: ReadonlyMap<string, string | null>): Shadow {
  return { ...shadowAt(root), filed: () => filed }
}

function changeWith(root: string, held: ReadonlyMap<string, string>): Change {
  const read = (path: string): Uint8Array | null => {
    const body = held.get(path)
    return body === undefined ? null : BYTES.encode(body)
  }
  return { root, changed: [], before: read, after: read }
}

test("the indexes git holds are the ones whose own pages say so", () => {
  const root = worldOf({ name: "identity", tracked: true })
  expect(heldByGit(shadowAt(root))).toEqual([indexAt("identity")])
})

test("an index saying nothing about git is held by git nowhere", () => {
  const root = worldOf({ name: "identity" })
  expect(heldByGit(shadowAt(root))).toEqual([])
})

test("an answer the base commit holds at no body is carried as an addition", () => {
  const root = worldOf({ name: "identity", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([
    { kind: "add", path: AT, content: LINE },
  ])
})

test("an answer whose body moved is carried as a replacement", () => {
  const root = worldOf({ name: "identity", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  const change = changeWith(root, new Map([[AT, "was\n"]]))
  expect(carriedOver(change, shadow).edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "was\n", contentTo: LINE },
  ])
})

test("an answer already holding what the change leaves is carried by no row", () => {
  const root = worldOf({ name: "identity", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map([[AT, LINE]])), shadow).edits).toEqual([])
})

test("an answer the change empties is carried as a removal", () => {
  const root = worldOf({ name: "identity", tracked: true })
  const shadow = shadowOf(root, new Map([[AT, null]]))
  const change = changeWith(root, new Map([[AT, LINE]]))
  expect(carriedOver(change, shadow).edits).toEqual([{ kind: "remove", path: AT }])
})

test("an answer filed under an index git holds none of is carried by nothing", () => {
  const root = worldOf({ name: "identity", tracked: true })
  const away = indexAt("path", "akasha/a.domain.ts.jsonl")
  const shadow = shadowOf(root, new Map([[away, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([])
})

test("a change carries nothing where git holds no index at all", () => {
  const root = worldOf({ name: "identity" })
  const shadow = shadowOf(root, new Map([[AT, LINE]]))
  expect(carriedOver(changeWith(root, new Map()), shadow).edits).toEqual([])
})
