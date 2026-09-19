import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3MistletoeMistletoe = {
  id: "01a0afa1-f4a1-7329-8838-cfe73fba4986",
  type: "page-type/track",
  slug: "the-piano-guys-3-mistletoe-mistletoe",
  ownLength: 4.78135,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-mistletoe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NevrElzbORLw5rn3Je0eQ",
      externalLink: "https://open.spotify.com/track/6NevrElzbORLw5rn3Je0eQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Mistletoe",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "mistletoe|0jW6R8CVyVohuUJVcuweDI|286881",
  song: "song/the-piano-guys-mistletoe",
} as const satisfies Track
