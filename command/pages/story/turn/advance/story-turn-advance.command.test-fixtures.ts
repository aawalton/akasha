import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"

export const REVIEWERS = [
  {
    slug: continuity.slug,
    name: "Continuity",
    at: "reviewers/continuity.story-reviewer.ts",
    instructionsAt: "reviewers/continuity.story-reviewer.instructions.md",
  },
  {
    slug: "voice",
    name: "Voice",
    at: "reviewers/voice.story-reviewer.ts",
    instructionsAt: "reviewers/voice.story-reviewer.instructions.md",
  },
]

export const REVIEWED = REVIEWERS.map((one) => `${storyReviewer.slug}/${one.slug}`)

export const RECORDERS = [
  {
    slug: "memory",
    name: "Memory",
    at: "recorders/memory.story-recorder.ts",
    instructionsAt: "recorders/memory.story-recorder.instructions.md",
  },
  {
    slug: "cast",
    name: "Cast",
    at: "recorders/cast.story-recorder.ts",
    instructionsAt: "recorders/cast.story-recorder.instructions.md",
  },
]

export const DRAFTED: readonly FileChange[] = [
  { kind: "add", path: "lore/a-hall.lore.ts", content: "cast\n" },
  { kind: "add", path: "lore/the-gate.lore.ts", content: "memory\n" },
]
