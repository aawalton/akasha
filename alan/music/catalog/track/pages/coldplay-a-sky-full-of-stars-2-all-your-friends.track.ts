import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStars2AllYourFriends = {
  id: "01a0b9ee-f66a-7fae-9b3c-f6cd3c3b6f54",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-2-all-your-friends",
  ownLength: 3.5302166666666666,
  ownProgress: 3.5302166666666666,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "All Your Friends",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "allyourfriends|4gzpq5DPGxSnKTe4SA8HAU|211813",
  song: "song/coldplay-all-your-friends",
  carriedBy: [
    {
      release: "release/coldplay-a-sky-full-of-stars-2",
      discNumber: 1,
      position: 2,
      externalId: "5RcZ84RmZ0TVTZQR3fWHoG",
      externalLink: "https://open.spotify.com/track/5RcZ84RmZ0TVTZQR3fWHoG",
    },
  ],
} as const satisfies Track
