import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyChapterWrite } from "akasha/command/pages/story/chapter-write/story-chapter-write.command.code.ts"

const GIVEN: Given = {
  root: "/var/tmp/story-chapter-write-test-nowhere",
  calledAs: "akasha story chapter-write",
  from: "",
  writer: null,
  agentId: null,
}

const AT = "stories/hotel/chapters/hotel-0001.story-chapter-written.ts"

test("a story named by slug or address starts its next chapter and names the seats told", async () => {
  const asked: string[] = []
  const answer = await storyChapterWrite(
    ["--story", "story-written/hotel"],
    GIVEN,
    async (story) => {
      asked.push(story)
      return {
        kind: "made",
        slug: "hotel-0001",
        at: AT,
        told: ["mari-game-master-hotel"],
        faults: [],
      }
    }
  )
  expect(asked).toEqual(["hotel"])
  expect(answer).toEqual({ report: [AT, "told\tmari-game-master-hotel"], refusals: [], code: 0 })
})

test("a story with a chapter being made is refused as the data", async () => {
  const said = "The chapter `hotel-0001` is still being made. The writer is working…"
  const answer = await storyChapterWrite(["--story", "hotel"], GIVEN, async () => ({
    kind: "refused",
    said,
  }))
  expect(answer.refusals).toEqual([said])
  expect(answer.code).not.toBe(0)
})
