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
        "The web server passes a narration's playlist and pieces through to Alan once he is signed in.",
    },
    {
      statement: "Narration shows its chapter in Now Playing with working controls.",
    },
    {
      statement:
        "A chapter whose narration ends is marked read, and the next chapter follows in the stream.",
    },
    {
      statement: "A narration that fails shows Alan the error.",
    },
    {
      statement: "Narration keeps playing on Alan's iPhone with the screen locked.",
    },
  ],
  constraints: [
    "The speech workload runs Kokoro on a GTX 1080 Ti on node-02, one inference at a time.",
    "The web pod has 512Mi of memory and makes no audio.",
    "Nothing writes narration audio to disk or to the object store.",
  ],
} as const satisfies Initiative
