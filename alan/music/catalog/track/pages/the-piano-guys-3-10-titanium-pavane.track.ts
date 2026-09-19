import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310TitaniumPavane = {
  id: "01a0afa2-0c2b-73ff-a4cc-f0d13debac18",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-titanium-pavane",
  ownLength: 4.804683333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2pRQWVXpdZ6BpQ106o7yma",
      externalLink: "https://open.spotify.com/track/2pRQWVXpdZ6BpQ106o7yma",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Titanium / Pavane",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "titaniumpavane|0jW6R8CVyVohuUJVcuweDI|288281",
  song: "song/the-piano-guys-titanium-pavane",
} as const satisfies Track
