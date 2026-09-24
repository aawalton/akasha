import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsAdventureOfALifetime = {
  id: "01a0b9ee-d59b-7e84-9f41-d7caffaeb7b6",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-adventure-of-a-lifetime",
  ownLength: 4.396433333333333,
  ownProgress: 4.396433333333333,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Adventure of a Lifetime",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "adventureofalifetime|4gzpq5DPGxSnKTe4SA8HAU|263786",
  song: "song/coldplay-adventure-of-a-lifetime",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 5,
      externalId: "69uxyAqqPIsUyTO8txoP2M",
      externalLink: "https://open.spotify.com/track/69uxyAqqPIsUyTO8txoP2M",
    },
  ],
} as const satisfies Track
