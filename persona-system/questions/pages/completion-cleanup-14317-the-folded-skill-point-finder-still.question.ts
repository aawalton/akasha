import type { Question } from "../question.page-type.ts"

export const completionCleanup14317TheFoldedSkillPointFinderStill = {
  id: "019f7140-ac8f-7807-8e08-39cd04305e39",
  pageTypeSlug: "question",
  slug: "completion-cleanup-14317-the-folded-skill-point-finder-still",
  ask: "Completion cleanup (#14317): the folded Skill Point Finder still has its own separate window (USPF_GUI — cross-character skill-point sources view with its own SavedVariables). The native task-HUD also tracks skill points. Retire the separate window, or keep it as a distinct cross-char view?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "Retire the USPF window — the task-HUD is the one skill-point surface",
    "Keep it — distinct cross-character view worth having (it gets renamed/rebranded, fingerprints still go)",
    "Show me both in-game first (defer until after 7/23 when you're verifying)",
  ],
  answer:
    "Keep as a cross character view, rebrand as needed. I expect to expand on this pattern to have more in-game visibility into completion in the future independent of the tasks system, since on demand visibility is diffident than just in time guidance",
  closedAt: "2026-07-17T20:57:59.086Z",
  context: "txt",
} as const satisfies Question
