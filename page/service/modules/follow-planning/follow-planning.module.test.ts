import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { plannedFor } from "akasha/page/service/modules/follow-planning/follow-planning.module.code.ts"

test("a plan made again over the same kept files hears them without indexing them again", () => {
  const root = rootOf(import.meta.dir)
  const kinds = new Set(["story-played"])
  const whole = plannedFor(root, [{ key: "stories", kinds, slugs: null }])
  const named = plannedFor(root, [{ key: "story", kinds, slugs: new Set(["one"]) }])
  expect(named.read === whole.read).toBe(true)
  expect([...named.aimed.values()].flat().map((one) => one.slugs)).not.toContain(null)
})
