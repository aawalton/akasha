import { expect, test } from "bun:test"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  type Judge,
  mistypedAfter,
} from "akasha/command/modules/draft-typing/draft-typing.module.code.ts"

const AT = "lore/hall.lore.ts"

const BODY = `export const hall = {\n  facts: [],\n} as const\n`

function holding(body: string): (path: string) => string | null {
  return (path) => (path === AT ? body : null)
}

const bodyOf = holding(BODY)

const LONG = "`facts fact` runs to 101 characters, over the length of 100"

const judge: Judge = (paths, read) => {
  const found: Judged[] = []
  for (const path of paths) {
    const text = read(path) ?? ""
    for (const one of text.match(/X{101,}/g) ?? [])
      found.push({ path, reason: `${LONG} ${one.length}` })
  }
  return found
}

function grown(by: number): FileChange {
  return { kind: "replace", path: AT, contentFrom: "[]", contentTo: `["${"X".repeat(by)}"]` }
}

test("a draft leaving its page as its type shapes it is not refused", () => {
  expect(mistypedAfter(bodyOf, [grown(100)], [grown(100)], judge)).toEqual([])
})

test("a draft leaving a value past its property's length names the path and the reason", () => {
  const said = mistypedAfter(bodyOf, [grown(101)], [grown(101)], judge)
  expect(said).toHaveLength(1)
  expect(said[0]).toStartWith(`\`${AT}\` would not match its page type — `)
  expect(said[0]).toContain("over the length of 100")
})

test("a fault the committed page already has is not blamed on the draft", () => {
  const had = holding(BODY.replace("[]", `["${"X".repeat(101)}", []]`))
  const more: FileChange = {
    kind: "replace",
    path: AT,
    contentFrom: "facts:",
    contentTo: "facts: /* more */",
  }
  expect(mistypedAfter(had, [more], [more], judge)).toEqual([])
})

test("an edit kept earlier is replayed before the new one is judged", () => {
  const more: FileChange = {
    kind: "replace",
    path: AT,
    contentFrom: "facts:",
    contentTo: "facts: /* more */",
  }
  expect(mistypedAfter(bodyOf, [grown(101), more], [more], judge)).toHaveLength(1)
})

test("a page the draft adds is left to the landing's check", () => {
  const added: FileChange = {
    kind: "add",
    path: "lore/new.lore.ts",
    content: `["${"X".repeat(101)}"]`,
  }
  expect(mistypedAfter(bodyOf, [added], [added], judge)).toEqual([])
})
