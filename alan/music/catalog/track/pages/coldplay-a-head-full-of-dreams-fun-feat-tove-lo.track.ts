import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsFunFeatToveLo = {
  id: "01a0b9ee-d5bf-7b81-b7b0-aae803d53ee3",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-fun-feat-tove-lo",
  ownLength: 4.4588833333333335,
  ownProgress: 4.4588833333333335,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fun (feat. Tove Lo)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "funfeattovelo|4gzpq5DPGxSnKTe4SA8HAU|267533",
  song: "song/coldplay-fun",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 6,
      externalId: "7fJFDK6XjYsXcMKNHESbot",
      externalLink: "https://open.spotify.com/track/7fJFDK6XjYsXcMKNHESbot",
    },
  ],
} as const satisfies Track
