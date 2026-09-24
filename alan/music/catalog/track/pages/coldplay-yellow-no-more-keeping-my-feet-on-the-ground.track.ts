import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayYellowNoMoreKeepingMyFeetOnTheGround = {
  id: "01a0b9ef-03ee-778e-ad69-c1fe06bfec9e",
  type: "page-type/track",
  slug: "coldplay-yellow-no-more-keeping-my-feet-on-the-ground",
  ownLength: 4.51955,
  ownProgress: 4.51955,
  partOfCollections: ["release/coldplay-yellow"],
  status: "completed",
  unit: "unit/minutes",
  title: "No More Keeping My Feet on the Ground",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "nomorekeepingmyfeetontheground|4gzpq5DPGxSnKTe4SA8HAU|271173",
  song: "song/coldplay-no-more-keeping-my-feet-on-the-ground",
  carriedBy: [
    {
      release: "release/coldplay-yellow",
      discNumber: 1,
      position: 3,
      externalId: "7dmCmBBaWAQlCBAkcqMu99",
      externalLink: "https://open.spotify.com/track/7dmCmBBaWAQlCBAkcqMu99",
    },
  ],
} as const satisfies Track
