import { expect, test } from "bun:test"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"

const PATH = "story/game/pages/the-tower/design-entries/one.game-design-entry.ts"

test("a composed page is named to the change that works out what kind of path it is", () => {
  const asked = putting({ path: PATH, content: "export const one = {}\n" })
  expect(asked.given).toEqual({ at: PATH, body: "export const one = {}\n" })
  expect(asked.at).toContain("add-file-of-any-kind")
})

test("a path taken away is named to the change that works the same out", () => {
  const asked = taking(PATH)
  expect(asked.given).toEqual({ at: PATH })
  expect(asked.at).toContain("remove-file-of-any-kind")
})
