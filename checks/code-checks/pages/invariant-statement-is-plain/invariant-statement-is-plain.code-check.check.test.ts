import { expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { bodiesAt } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { rootOf } from "../../../../commands/modules/rooting/rooting.module.code.ts"
import { reasonsIn, reasonsShaped } from "./invariant-statement-is-plain.code-check.check.code.ts"

const ROOT = "/repo"

const AT = "akasha/held.check.ts"

const REPO_AT = rootOf(import.meta.dir)

const judged = reasonsShaped(REPO_AT, shadowAt(REPO_AT).index)

const given = bodiesAt(ROOT, AT)

function paged(one: string): string {
  const said = `    { invariantKind: "departure", statement: ${JSON.stringify(one)} },`
  return ["export const held = {", "  invariants: [", said, "  ],", "}", ""].join("\n")
}

test("the body judged is the one the change carries", () => {
  const body = paged("A page is named because the slug says so.")
  expect(reasonsIn(given(body))).toHaveLength(1)
})

test("the shaped reading judges the body the change carries too", async () => {
  const said = await judged(given(paged("It is read from the index.")))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`lone-pronoun`")
})

test("a file that is not TypeScript is passed over", () => {
  const held = {
    root: ROOT,
    path: "akasha/notes.md",
    bytes: new TextEncoder().encode(paged("A page is named because it is.")),
  }
  expect(reasonsIn(held)).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow("akasha/raw.ts")
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})
