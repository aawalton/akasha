import { expect, test } from "bun:test"
import {
  type Found,
  hungOf,
} from "akasha/alan/harness/code-editor/data-interface/modules/finding-tree-assemble/finding-tree-assemble.module.code.ts"

function found(slug: string, domain: string): Found {
  return { slug, at: `domain/finding/pages/${slug}.finding.ts`, domain, said: `${slug} is so` }
}

test("the findings of one domain are ordered by the name each is filed under", () => {
  const hung = hungOf([found("zulu", "domain/alpha"), found("bravo", "domain/alpha")])
  expect(hung.map((one) => one.key)).toEqual(["finding/bravo", "finding/zulu"])
})

test("a finding hangs under the domain that finding names", () => {
  const hung = hungOf([found("one", "domain/alpha"), found("two", "domain/bravo")])
  expect(hung.map((one) => one.domain)).toEqual(["domain/alpha", "domain/bravo"])
})

test("a finding is drawn as the sentence it says and opens the file it is written in", () => {
  const hung = hungOf([found("one", "domain/alpha")])
  expect(hung[0]?.label).toBe("one is so")
  expect(hung[0]?.at).toBe("domain/finding/pages/one.finding.ts")
})
