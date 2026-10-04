import { expect, test } from "bun:test"
import {
  mechanicsPrompt,
  type Prompting,
  RULINGS_FINAL,
  recorderPrompt,
  reviewerPrompt,
} from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"

const ASKED: Prompting = {
  title: "The Saga",
  turnAt: "stories/the-saga/turns/the-saga-00-003.story-turn-played.ts",
  address: "story-turn-played/the-saga-00-003",
  calledAs: "akasha story turn advance",
  lore: [],
  written: [],
}

const STAFF = { slug: "continuity", name: "Continuity", at: "c.ts", instructionsAt: "c.md" }

const FRESH =
  "`akasha read --file-path <path> --full`, never from what you remember of an earlier job"

test("every job prompt ends the job rather than the seat, and has the seat read afresh", () => {
  const prompts = [reviewerPrompt, mechanicsPrompt, recorderPrompt].map((one) => one(ASKED, STAFF))
  for (const prompt of prompts) {
    expect(prompt).toContain("The advance ends this job, not this seat")
    expect(prompt).not.toContain("ends this seat, so")
    expect(prompt).toContain(FRESH)
    expect(prompt).toContain("Every output of yours is a tool call until the advance has landed.")
  }
})

test("a chapter's job prompt names the chapter as what is read afresh", () => {
  const prompt = reviewerPrompt({ ...ASKED, noun: "chapter" }, STAFF)
  expect(prompt).toContain("Read your instructions, the chapter and whatever beats")
})

test("a reviewer or mechanics seat on a page holding rulings is told they are final", () => {
  const file = "stories/the-saga/turns/the-saga-00-003.rulings.jsonl"
  const ruled = { ...ASKED, repairs: [{ file, faults: 2, ruled: true }] } as const
  for (const prompt of [reviewerPrompt, mechanicsPrompt].map((one) => one(ruled, STAFF))) {
    expect(prompt).toContain(`ruled out 2 issues in \`${file}\``)
    expect(prompt).toContain(RULINGS_FINAL)
  }
  const faulted = { ...ASKED, repairs: [{ file: "x.issues.txt", faults: 1 }] }
  expect(reviewerPrompt(faulted, STAFF)).not.toContain(RULINGS_FINAL)
})
