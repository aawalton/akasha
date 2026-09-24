import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3MistletoeMistletoe = {
  id: "01a0afa1-f4a1-7329-8838-cfe73fba4986",
  type: "page-type/track",
  slug: "the-piano-guys-3-mistletoe-mistletoe",
  ownLength: 4.78135,
  ownProgress: 4.78135,
  partOfCollections: ["release/the-piano-guys-3-mistletoe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mistletoe",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "mistletoe|0jW6R8CVyVohuUJVcuweDI|286881",
  song: "song/the-piano-guys-mistletoe",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-mistletoe",
      discNumber: 1,
      position: 1,
      externalId: "6NevrElzbORLw5rn3Je0eQ",
      externalLink: "https://open.spotify.com/track/6NevrElzbORLw5rn3Je0eQ",
    },
  ],
} as const satisfies Track
