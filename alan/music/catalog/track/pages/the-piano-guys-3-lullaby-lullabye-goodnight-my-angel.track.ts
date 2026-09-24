import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyLullabyeGoodnightMyAngel = {
  id: "01a0afa1-de9b-7340-b378-a4f931a54425",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-lullabye-goodnight-my-angel",
  ownLength: 3.229016666666667,
  ownProgress: 3.229016666666667,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-peaceful-summer-nights",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lullabye (Goodnight, My Angel)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "lullabyegoodnightmyangel|0jW6R8CVyVohuUJVcuweDI|193741",
  song: "song/the-piano-guys-lullabye-goodnight-my-angel",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 11,
      externalId: "7fOq6Qb9sDwtFi3RAAoETZ",
      externalLink: "https://open.spotify.com/track/7fOq6Qb9sDwtFi3RAAoETZ",
    },
    {
      release: "release/the-piano-guys-peaceful-summer-nights",
      discNumber: 1,
      position: 15,
      externalId: "66XBQV3eThveyZzIjGmU41",
      externalLink: "https://open.spotify.com/track/66XBQV3eThveyZzIjGmU41",
    },
  ],
} as const satisfies Track
