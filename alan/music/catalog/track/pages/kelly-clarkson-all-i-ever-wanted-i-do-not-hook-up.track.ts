import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedIDoNotHookUp = {
  id: "01a0a5ae-c7a4-76b4-bfef-76f760154fd7",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-i-do-not-hook-up",
  ownLength: 3.3391,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2I5CPUnMIKjEXeg61OI9uV",
      externalLink: "https://open.spotify.com/track/2I5CPUnMIKjEXeg61OI9uV",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Do Not Hook Up",
} as const satisfies Track
