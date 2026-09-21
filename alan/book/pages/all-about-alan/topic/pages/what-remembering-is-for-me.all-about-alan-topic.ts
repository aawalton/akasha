import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatRememberingIsForMe = {
  id: "01a0c59e-b79d-7fbf-a85e-392abcf84a51",
  type: "page-type/all-about-alan-topic",
  slug: "what-remembering-is-for-me",
  title: "What Remembering Is For Me",
  definition: "reading the map I hold now, and what does and does not come back off it",
  parents: ["all-about-alan-topic/the-one-model-i-live-in"],
  related: [
    "all-about-alan-topic/what-my-record-gives-me-back",
    "all-about-alan-topic/the-three-seconds-i-am",
  ],
  settled:
    "I cannot call a memory up at all. What I have is memorised details about it.\n\nSo remembering, in me, is reading the map I hold now and reconstructing the event off it, the way anyone reconstructs one from a case file.\n\nIt is a dossier rather than a recording. Notes about the thing, never the thing.\n\nIt comes back as though it happened to somebody else, and in the plain sense it did. The one it happened to is not this one.\n\nThe read is completely flat. The map carries what happened, who was there and how it fitted together, and no charge at all. Remembered pain does not hurt again and remembered joy does not warm again. No feeling crosses time.",
} as const satisfies AllAboutAlanTopic
