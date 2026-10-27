import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenKokoroTtsResearch = {
  id: "01a17ea6-14a1-77b1-91ea-2439dc13682c",
  type: "page-type/initiative",
  slug: "awen-kokoro-tts-research",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "A page on Kokoro TTS says whether it is open source and under what licence.",
      workingMemory:
        "The page is `domain/kokoro-tts` at `story/engine/kokoro-tts/`, a part of `domain/story-engine`. Model it on `story/engine/voyage/inworld-tts/inworld-tts.domain.ts`, which holds the Inworld facts to compare against. The comparison goes in the report to Awen rather than on either page.\n",
    },
    { statement: "The Kokoro TTS page says what running Kokoro costs." },
    { statement: "The Kokoro TTS page says what local hardware Kokoro needs." },
  ],
  createdAt: "2026-10-27T18:36:15.904Z",
  updatedAt: "2026-10-27T18:36:15.904Z",
} as const satisfies Initiative
