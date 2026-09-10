import { afterAll, expect, test } from "bun:test"
import { landing, NO_BYTES } from "../../../modules/scratch/check-scratch.module.code.ts"
import { introducedPropertyIsAPart } from "./introduced-property-is-a-part.code-check.code.ts"
import {
  bytesOf,
  pathFor,
  rooted,
  scratch,
  shadowed,
  typed,
} from "./introduced-property-is-a-part.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a change carrying a page type is judged against every page type the index has", () => {
  const root = rooted("akasha-introduced-check-")
  typed(root, "held", null, ["mine"], [])
  const change = landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], []) })
  const said = introducedPropertyIsAPart(change, shadowed(change))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("held"))
})

test("a change carrying no page type is passed over", () => {
  const root = rooted("akasha-introduced-check-")
  typed(root, "held", null, ["mine"], [])
  const change = landing(root, { "akasha/held.domain.ts": NO_BYTES })
  expect(introducedPropertyIsAPart(change, shadowed(change))).toEqual([])
})
