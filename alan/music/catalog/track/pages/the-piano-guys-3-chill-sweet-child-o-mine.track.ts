import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillSweetChildOMine = {
  id: "01a0afa1-e0f1-7434-aa1a-81f61c322c87",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-sweet-child-o-mine",
  ownLength: 4.329166666666667,
  ownProgress: 4.329166666666667,
  partOfCollections: [
    "release/the-piano-guys-3-chill",
    "release/the-piano-guys-3-sweet-child-o-mine",
    "release/the-piano-guys-3-wedding-season",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Child o' Mine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "sweetchildomine|0jW6R8CVyVohuUJVcuweDI|259750",
  song: "song/the-piano-guys-sweet-child-o-mine",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 5,
      externalId: "0nmLUsH7krNeaz7KC8Qxih",
      externalLink: "https://open.spotify.com/track/0nmLUsH7krNeaz7KC8Qxih",
    },
    {
      release: "release/the-piano-guys-3-sweet-child-o-mine",
      discNumber: 1,
      position: 1,
      externalId: "3flxSlglVHYQavVlqqL6JO",
      externalLink: "https://open.spotify.com/track/3flxSlglVHYQavVlqqL6JO",
    },
    {
      release: "release/the-piano-guys-3-wedding-season",
      discNumber: 1,
      position: 19,
      externalId: "4UgC41unZZbIlLTCGtChqX",
      externalLink: "https://open.spotify.com/track/4UgC41unZZbIlLTCGtChqX",
    },
  ],
} as const satisfies Track
