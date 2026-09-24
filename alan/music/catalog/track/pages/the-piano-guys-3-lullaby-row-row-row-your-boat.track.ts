import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyRowRowRowYourBoat = {
  id: "01a0afa1-dee4-79e7-a733-3406adeb9ff4",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-row-row-row-your-boat",
  ownLength: 1.6733333333333333,
  ownProgress: 1.6733333333333333,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-peaceful-summer-nights",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Row Row Row Your Boat",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "rowrowrowyourboat|0jW6R8CVyVohuUJVcuweDI|100400",
  song: "song/the-piano-guys-row-row-row-your-boat",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 13,
      externalId: "0p9KHrE7ztrxx5YUa9u821",
      externalLink: "https://open.spotify.com/track/0p9KHrE7ztrxx5YUa9u821",
    },
    {
      release: "release/the-piano-guys-peaceful-summer-nights",
      discNumber: 1,
      position: 1,
      externalId: "5hH6pFhbMUlkCOxIlZmcyP",
      externalLink: "https://open.spotify.com/track/5hH6pFhbMUlkCOxIlZmcyP",
    },
  ],
} as const satisfies Track
