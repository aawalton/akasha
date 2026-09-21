import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const eppieMusicImprovements = {
  id: "01a0c430-3f69-7205-aa28-81d030972f66",
  type: "page-type/initiative",
  slug: "eppie-music-improvements",
  domain: "domain/music",
  persona: "persona/eppie",
  intentStack: [
    {
      statement: "Alan grades the track he just heard as readily as the one playing.",
      workingMemory:
        "Alan sends a bare grade while he listens, and the player has often moved on by the time the grade is read. It has cost a wrong grade once tonight and a reconstruction twice. `akasha music rate --now-playing` covers the track playing. What is left is the track before it, read from `recentlyPlayed`, whose first entry is the previous track while something plays and the last one heard when nothing does. Matching is by `carriedBy[].externalId`, as `--now-playing` matches.",
    },
  ],
} as const satisfies Initiative
