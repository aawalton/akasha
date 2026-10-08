import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueChapterNarration = {
  id: "01a10dba-d1ea-7dfd-ad68-1fd804892093",
  type: "page-type/initiative",
  slug: "nimue-chapter-narration",
  domain: "domain/narration",
  persona: "persona/nimue",
  intentStack: [
    {
      statement:
        "A chapter whose narration ends is marked read, and the next chapter follows in the stream.",
    },
  ],
  constraints: [
    "The speech workload runs Kokoro on a GTX 1080 Ti on node-02, one inference at a time.",
    "The web pod has 512Mi of memory and makes no audio.",
    "Nothing writes narration audio to disk or to the object store.",
  ],
  createdAt: "2026-10-05T20:21:49.674Z",
  updatedAt: "2026-10-06T15:39:01.000Z",
} as const satisfies Initiative
