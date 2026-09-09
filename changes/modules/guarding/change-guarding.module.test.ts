import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { importNotLeftHanging } from "../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import { refusing, stating } from "../answer/change-answer.module.code.ts"
import { type World, worldAt, worldOver } from "../shadow/change-shadow.module.code.ts"
import {
  guardedBy,
  holdsAfter,
  takingIn,
  textAfter,
  writtenIn,
} from "./change-guarding.module.code.ts"
import type { Guard } from "./change-guarding.module.types.ts"

afterAll(scratch.sweep)

const AT = "akasha/one/fresh.module.code.ts"

function worldIn(root: string): World {
  return worldAt(root, textIn(root))
}

function counting(said: string[], why: string | null): Guard {
  return () => {
    said.push(why ?? "let through")
    return why
  }
}

test("an answer already refused runs no guard", () => {
  const ran: string[] = []

  const said = guardedBy(worldIn(indexedRepo()), refusing("no"), [counting(ran, null)])

  expect(said.refused).toBe("no")
  expect(ran).toEqual([])
})

test("a guard answering nothing lets the answer through as the answer was", () => {
  const root = indexedRepo()
  const wrote = stating([{ kind: "add", path: AT, content: "held\n" }])

  expect(guardedBy(worldIn(root), wrote, [counting([], null)])).toEqual(wrote)
})

test("the first guard to refuse gives the reason and no guard runs after", () => {
  const root = indexedRepo()
  const ran: string[] = []

  const said = guardedBy(worldIn(root), stating([{ kind: "add", path: AT, content: "held\n" }]), [
    counting(ran, "the first"),
    counting(ran, "the second"),
  ])

  expect(said.refused).toBe("the first")
  expect(ran).toEqual(["the first"])
})

test("a file an earlier answer took away is gone from the files a guard reads", () => {
  const root = indexedRepo()
  const world = worldOver(worldIn(root), stating([{ kind: "remove", path: NAMER_CODE }]))
  const said = stating([{ kind: "remove", path: HELD_CODE }])

  expect(guardedBy(world, said, [importNotLeftHanging]).refused).toBe(null)
  expect(guardedBy(worldIn(root), said, [importNotLeftHanging]).refused ?? "").toContain(NAMER_CODE)
})

test("two answers adding to one path refuse rather than being judged apart", () => {
  const root = indexedRepo()
  const world = worldOver(worldIn(root), stating([{ kind: "add", path: AT, content: "one\n" }]))

  const said = guardedBy(world, stating([{ kind: "add", path: AT, content: "two\n" }]), [
    counting([], null),
  ])

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("holds a body already")
})

import { addedTo, ledgerAt } from "../shadow/change-shadow.module.code.ts"

test("an answer the world already holds is judged rather than refused", () => {
  const root = indexedRepo()
  const said = stating([{ kind: "remove", path: NAMER_CODE }])
  const ledger = addedTo(ledgerAt(root, textIn(root)), said)

  expect(guardedBy(ledger, said, [counting([], null)]).refused).toBe(null)
})

test("the text a path holds after the answer is read here", () => {
  const root = indexedRepo()
  const found: (string | null)[] = []
  const reading: Guard = (given) => {
    found.push(textAfter(given, AT))
    found.push(textAfter(given, HELD_CODE))
    found.push(textAfter(given, "akasha/one/nowhere.ts"))
    return null
  }

  guardedBy(worldIn(root), stating([{ kind: "add", path: AT, content: "held\n" }]), [reading])

  expect(found).toEqual(["held\n", "export const kept = 1\n", null])
})

test("the bodies an answer leaves are replayed once for one guarding", () => {
  const root = indexedRepo()
  const held = textIn(root)
  let asked = 0
  const reading: Guard = (given) => {
    holdsAfter(given, AT)
    asked = 0
    holdsAfter(given, HELD_CODE)
    textAfter(given, AT)
    writtenIn(given)
    return null
  }

  guardedBy(
    worldAt(root, (path) => {
      asked += 1
      return held(path)
    }),
    stating([{ kind: "move", pathFrom: HELD_CODE, pathTo: AT }]),
    [reading]
  )

  expect(asked).toBe(0)
})

test("the paths an answer takes away are read here, and a path a move leaves is not one", () => {
  const said = stating([
    { kind: "remove", path: "akasha/a.ts" },
    { kind: "move", pathFrom: "akasha/b.ts", pathTo: "akasha/c.ts" },
    { kind: "add", path: "akasha/d.ts", content: "z\n" },
  ])

  expect(takingIn(said)).toEqual(["akasha/a.ts"])
})
