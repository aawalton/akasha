import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisJaiWolfRemix = {
  id: "01a0b9ee-f31b-7023-887c-25870d345673",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-jai-wolf-remix",
  ownLength: 2.9468833333333335,
  ownProgress: 2.9468833333333335,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This - Jai Wolf Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "The Chainsmokers" },
    { artist: "artist/coldplay" },
    { artistName: "Jai Wolf" },
  ],
  trackKey:
    "somethingjustlikethisjaiwolfremix|24V5UY0nChKpnb1TBPJhCw,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|176813",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-something-just-like-this-remixes",
      discNumber: 1,
      position: 5,
      externalId: "2oF42D2udxtL7Kr6WFFlGb",
      externalLink: "https://open.spotify.com/track/2oF42D2udxtL7Kr6WFFlGb",
    },
  ],
} as const satisfies Track
