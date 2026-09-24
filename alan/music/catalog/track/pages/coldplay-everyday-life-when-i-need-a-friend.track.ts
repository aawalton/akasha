import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeWhenINeedAFriend = {
  id: "01a0b9ee-cfec-70c0-af3f-fc7ee700e1fd",
  type: "page-type/track",
  slug: "coldplay-everyday-life-when-i-need-a-friend",
  ownLength: 2.5833333333333335,
  ownProgress: 2.5833333333333335,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "When I Need A Friend",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "whenineedafriend|4gzpq5DPGxSnKTe4SA8HAU|155000",
  song: "song/coldplay-when-i-need-a-friend",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 8,
      externalId: "0UvUivL70eDwhTWBd8S38I",
      externalLink: "https://open.spotify.com/track/0UvUivL70eDwhTWBd8S38I",
    },
  ],
} as const satisfies Track
