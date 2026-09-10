import { afterAll, expect, test } from "bun:test"
import { repositoryIsWrittenByAChange } from "./repository-is-written-by-a-change.code-check.audit.code.ts"
import {
  AT,
  READS,
  rooted,
  scratch,
  tracked,
  WRITES,
} from "./repository-is-written-by-a-change.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every code file outside the changes, no change naming one of them", () => {
  const said = repositoryIsWrittenByAChange(tracked(rooted(), { [AT]: WRITES }))

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("only a change writes the repository")
})

test("an audit lets through a tree where nothing outside the changes writes TypeScript", () => {
  expect(repositoryIsWrittenByAChange(tracked(rooted(), { [AT]: READS }))).toEqual([])
})
