import { expect, test } from "bun:test"
import {
  commitSaid,
  defaultMessage,
  formattedSaid,
} from "akasha/commands/modules/landing-saying/landing-saying.module.code.ts"

test("a body that landed other than as it was handed in is named in the report", () => {
  expect(formattedSaid(["akasha/two.ts"])).toEqual([
    "formatted akasha/two.ts as it landed — what is there is not what was handed in",
  ])
  expect(formattedSaid([])).toEqual([])
})

test("a landing given no message is said as the act and the paths that landing carries", () => {
  expect(defaultMessage("write", ["akasha/two.ts", "akasha/one.ts"])).toBe(
    "write akasha/one.ts, akasha/two.ts"
  )
})

test("three paths are still named one by one", () => {
  expect(defaultMessage("write", ["c.ts", "a.ts", "b.ts"])).toBe("write a.ts, b.ts, c.ts")
})

test("a landing carrying more than three paths is said as how many paths landed", () => {
  expect(defaultMessage("replace in", ["a.ts", "b.ts", "c.ts", "d.ts"])).toBe("replace in 4 files")
})

test("a landing that committed nothing says which of the two reasons it was", () => {
  expect(commitSaid("abc123", [])).toBe("committed as abc123")
  expect(commitSaid(null, [])).toContain("the tree already holds what the change asked for")
})

test("a landing that took away a path the repository ignores names every such path", () => {
  const said = commitSaid(null, ["akasha/two.uncommitted.ts", "akasha/one.uncommitted.ts"])

  expect(said).toContain("git ignores the path(s) this apply took away")
  expect(said).toContain("akasha/one.uncommitted.ts, akasha/two.uncommitted.ts")
  expect(said).not.toContain("already holds what the change asked for")
})
