import { afterAll, expect, test } from "bun:test"
import { statSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { uncommittedAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  foldedReads,
  keptReads,
} from "akasha/page/service/modules/reads-keeping/reads-keeping.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PROPERTY = "held/loaded.computed-property.ts"

test("a folder holding more than eight files read is kept in place of them", () => {
  const many = Array.from({ length: 9 }, (_, at) => `logs/${at}.jsonl`)
  expect(foldedReads([...many, "people/alan.person.ts"], [])).toEqual({
    files: ["people/alan.person.ts"],
    folders: ["logs"],
  })
})

test("a file in a folder already kept is not kept as well", () => {
  expect(foldedReads(["logs/one.jsonl"], ["logs"])).toEqual({ files: [], folders: ["logs"] })
})

test("what a calculation reads is added to what its computed property keeps", () => {
  const root = scratch.rootFor("akasha-reads-")
  keptReads(root, new Map([[PROPERTY, new Set(["people/alan.person.ts"])]]))
  keptReads(root, new Map([[PROPERTY, new Set(["moves/squat.movement.ts"])]]))
  expect(uncommittedIn(root, PROPERTY)).toEqual({
    readFiles: ["moves/squat.movement.ts", "people/alan.person.ts"],
    readFolders: [],
  })
})

test("nothing is written where what is kept would stay the same", () => {
  const root = scratch.rootFor("akasha-reads-")
  keptReads(root, new Map([[PROPERTY, new Set(["people/alan.person.ts"])]]))
  const at = join(root, uncommittedAt(PROPERTY) ?? "")
  const before = statSync(at).mtimeMs
  keptReads(root, new Map([[PROPERTY, new Set(["people/alan.person.ts"])]]))
  expect(statSync(at).mtimeMs).toBe(before)
})
