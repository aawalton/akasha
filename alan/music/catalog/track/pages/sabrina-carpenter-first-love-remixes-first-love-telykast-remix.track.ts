import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFirstLoveRemixesFirstLoveTelykastRemix = {
  id: "01a0b111-3210-7c45-94ce-3e72942d22bd",
  type: "page-type/track",
  slug: "sabrina-carpenter-first-love-remixes-first-love-telykast-remix",
  ownLength: 3.5368333333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-first-love-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5qJuG66jfxUgzfl6l195FO",
      externalLink: "https://open.spotify.com/track/5qJuG66jfxUgzfl6l195FO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "First Love - TELYKast Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3hyEbRtp617pNCuuQjyOmc", artistName: "Lost Kings" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "7vWC03wqXwUqjPON8hc1tz", artistName: "TELYKAST" },
  ],
  trackKey:
    "firstlovetelykastremix|3hyEbRtp617pNCuuQjyOmc,74KM79TiuVKeVCqs8QtB0B,7vWC03wqXwUqjPON8hc1tz|212210",
  song: "song/sabrina-carpenter-first-love",
} as const satisfies Track
