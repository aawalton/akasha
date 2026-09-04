import type { Question } from "../question.page-type.ts"

export const on15770SentenceLevelAudioSyncOneForkIsYoursTheOn = {
  id: "019f8b44-7dd2-7721-b327-8831a0f59cb2",
  pageTypeSlug: "question",
  slug: "on-15770-sentence-level-audio-sync-one-fork-is-yours-the-on",
  ask: "On #15770 (sentence-level audio sync), one fork is yours — the on-demand live-stream path. Should the sync track the generation frontier (highlight each sentence the moment its audio is produced, and offer 'play from this sentence' only up to that frontier), or hold sync until the whole chapter is fully rendered (same fidelity as pre-generated)?",
  askedBy: "astra",
  askedIn: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6",
  status: "answered",
  offered: ["Track the generation frontier (my lean)", "Wait for full render (uniform fidelity)"],
  answer:
    "Highlight when the audio is playing, always show play audio option (generate on demand when needed, not starting from the beginning)",
  closedAt: "2026-07-22T19:30:44.329Z",
  context: "txt",
} as const satisfies Question
