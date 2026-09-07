import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { importNotLeftHanging } from "../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import {
  answered,
  moving,
  refusing,
  taking,
  writing,
} from "../change-answer/change-answer.module.code.ts"
import { type World, worldAt, worldOver } from "../change-shadow/change-shadow.module.code.ts"
import { guardedBy, takingIn } from "./change-guarding.module.code.ts"
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
  const wrote = answered([writing(AT, null, "held\n")])

  expect(guardedBy(worldIn(root), wrote, [counting([], null)])).toEqual(wrote)
})

test("the first guard to refuse gives the reason and no guard runs after", () => {
  const root = indexedRepo()
  const ran: string[] = []

  const said = guardedBy(worldIn(root), answered([writing(AT, null, "held\n")]), [
    counting(ran, "the first"),
    counting(ran, "the second"),
  ])

  expect(said.refused).toBe("the first")
  expect(ran).toEqual(["the first"])
})

test("a file an earlier answer took away is gone from the files a guard reads", () => {
  const root = indexedRepo()
  const was = textIn(root)
  const world = worldOver(worldIn(root), answered([taking(NAMER_CODE, was(NAMER_CODE) ?? "")]))
  const said = answered([taking(HELD_CODE, was(HELD_CODE) ?? "")])

  expect(guardedBy(world, said, [importNotLeftHanging]).refused).toBe(null)
  expect(guardedBy(worldIn(root), said, [importNotLeftHanging]).refused ?? "").toContain(NAMER_CODE)
})

test("two answers that will not gather refuse rather than being judged apart", () => {
  const root = indexedRepo()
  const world = worldOver(worldIn(root), answered([writing(AT, null, "one\n")]))

  const said = guardedBy(world, answered([writing(AT, null, "two\n")]), [counting([], null)])

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("answered twice")
})

test("the paths an answer takes away are read here, and a path a move leaves is not one", () => {
  const said = answered([
    taking("akasha/a.ts", "x\n"),
    moving("akasha/b.ts", "akasha/c.ts", "y\n", "y\n"),
    writing("akasha/d.ts", null, "z\n"),
  ])

  expect(takingIn(said)).toEqual(["akasha/a.ts"])
})
