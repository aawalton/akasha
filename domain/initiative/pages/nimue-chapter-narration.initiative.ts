import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueChapterNarration = {
  id: "01a10dba-d1ea-7dfd-ad68-1fd804892093",
  type: "page-type/initiative",
  slug: "nimue-chapter-narration",
  domain: "domain/narration",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "Every kind of window in a chapter is spoken as plain sentences.",
    },
    {
      statement:
        "The speech workload serves a narration as a growing HLS playlist of one AAC stream.",
    },
    {
      statement:
        "The first narration after the speech workload starts waits no longer than any other.",
      workingMemory:
        "Measured on 2026-10-05 through a port-forward: the first request after idle took 2.93s, and later sentences took 0.08s to 0.18s.",
    },
    {
      statement:
        "The web server passes a narration's playlist and pieces through to Alan once he is signed in.",
    },
    {
      statement: "Every chapter page's triple-dot menu has a Play Audio item.",
    },
    {
      statement: "A player bar in the app's layout plays narration across pages.",
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
    {
      statement: "The iOS app carries no on-device Kokoro plugin.",
    },
  ],
  constraints: [
    "The speech workload runs Kokoro on a GTX 1080 Ti on node-02, one inference at a time.",
    "The web pod has 512Mi of memory and makes no audio.",
    "Nothing writes narration audio to disk or to the object store.",
  ],
} as const satisfies Initiative
