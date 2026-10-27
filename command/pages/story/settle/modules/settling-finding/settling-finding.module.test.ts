import { expect, test } from "bun:test"
import { settlingFrom } from "akasha/command/pages/story/settle/modules/settling-finding/settling-finding.module.code.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"

const OWN = "w/stories/played/saga/mechanics/checks/saga-upkeep.world-check.ts"

const SOURCE = "w/stories/played/source/mechanics/checks/source-upkeep.world-check.ts"

const NAMED = `${worldCheck.slug}/source-upkeep`

function pathOf(check: string): string | null {
  return check === "source-upkeep" ? SOURCE : null
}

test("a check carrying its own code is settled by the code beside it", () => {
  expect(settlingFrom(OWN, { settling: {} }, pathOf)).toBe(
    "w/stories/played/saga/mechanics/checks/saga-upkeep.world-check.settling.code.ts"
  )
})

test("a check naming settledBy is settled by the code beside the check it names", () => {
  expect(settlingFrom(OWN, { settledBy: NAMED }, pathOf)).toBe(
    "w/stories/played/source/mechanics/checks/source-upkeep.world-check.settling.code.ts"
  )
})

test("a check naming a check that is no page here has no code", () => {
  expect(settlingFrom(OWN, { settledBy: `${worldCheck.slug}/gone` }, pathOf)).toBeNull()
})
