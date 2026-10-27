import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenInworldTtsResearch = {
  id: "01a17ea0-90fd-7d5d-a469-2c47b69e941a",
  type: "page-type/initiative",
  slug: "awen-inworld-tts-research",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement:
        "A page on Inworld TTS 1.5 and 2.0 says whether each is open source or proprietary.",
      workingMemory:
        "Voyage's settings say its text to speech uses Inworld 1.5 or 2.0. The page is `domain/inworld-tts`, a part of `domain/voyage` under `story/engine/voyage/`. Akasha already runs local speech models: `infrastructure/inference/pool/service-inferences/qwen3-tts.service-inference.ts` and `moss-tts.service-inference.ts`.\n",
    },
    { statement: "The Inworld TTS page says whether each model can run on local hardware." },
  ],
  createdAt: "2026-10-27T18:30:14.524Z",
  updatedAt: "2026-10-27T18:33:23.867Z",
} as const satisfies Initiative
