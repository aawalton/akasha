import { expect, test } from "bun:test"
import {
  type Asking,
  intentKept,
} from "akasha/story/ui/modules/player-intent-panel/player-intent-panel.module.code.tsx"

const PLAYED = "story-played/a-story"

const WRITTEN = "story-written/a-story"

test("the intent is set on the story page its address names", async () => {
  const kept: Asking[] = []
  const refused = await intentKept(PLAYED, "Eat when hungry.", async (asked) => {
    kept.push(asked)
  })
  expect(refused).toBeNull()
  expect(kept).toEqual([
    { pageTypeSlug: "story-played", slug: "a-story", intent: "Eat when hungry." },
  ])
})

test("a written story's intent reaches its own page type", async () => {
  const kept: Asking[] = []
  await intentKept(WRITTEN, "Sleep indoors.", async (asked) => {
    kept.push(asked)
  })
  expect(kept[0]?.pageTypeSlug).toBe("story-written")
})

test("a story answering no address keeps nothing, and the write is not reached", async () => {
  let reached = false
  const refused = await intentKept("a-story", "Eat when hungry.", async () => {
    reached = true
  })
  expect(refused).toContain("answers no address")
  expect(reached).toBe(false)
})

test("a refused write is handed back as it came", async () => {
  const refused = await intentKept(PLAYED, "Eat.", async () => {
    throw new Error("no access names this page type for writing")
  })
  expect(refused).toContain("no access names this page type for writing")
})
