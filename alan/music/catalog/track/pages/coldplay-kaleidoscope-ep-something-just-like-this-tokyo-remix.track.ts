import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpSomethingJustLikeThisTokyoRemix = {
  id: "01a0b9ee-f210-724b-a9a6-c32646a38978",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-something-just-like-this-tokyo-remix",
  ownLength: 4.562433333333333,
  ownProgress: 4.562433333333333,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This - Tokyo Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "The Chainsmokers" }],
  trackKey: "somethingjustlikethistokyoremix|4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|273746",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-kaleidoscope-ep",
      discNumber: 1,
      position: 4,
      externalId: "255wsg35VRYqBK7uBtYOUz",
      externalLink: "https://open.spotify.com/track/255wsg35VRYqBK7uBtYOUz",
    },
  ],
} as const satisfies Track
