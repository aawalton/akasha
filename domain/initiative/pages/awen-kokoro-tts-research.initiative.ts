import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenKokoroTtsResearch = {
  id: "01a17ea6-14a1-77b1-91ea-2439dc13682c",
  type: "page-type/initiative",
  slug: "awen-kokoro-tts-research",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [{ statement: "The Kokoro TTS page says what local hardware Kokoro needs." }],
  createdAt: "2026-10-27T18:36:15.904Z",
  updatedAt: "2026-10-27T18:40:12.197Z",
} as const satisfies Initiative
