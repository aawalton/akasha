import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisDonDiabloRemix = {
  id: "01a0b9ee-f2f9-73b1-b258-ef0cde7a59be",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-don-diablo-remix",
  ownLength: 3.84755,
  ownProgress: 3.84755,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This - Don Diablo Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "The Chainsmokers" },
    { artist: "artist/coldplay" },
    { artistName: "Don Diablo" },
  ],
  trackKey:
    "somethingjustlikethisdondiabloremix|1l2ekx5skC4gJH8djERwh1,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|230853",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-something-just-like-this-remixes",
      discNumber: 1,
      position: 4,
      externalId: "15MTd64KUMG7CF6mOyovsQ",
      externalLink: "https://open.spotify.com/track/15MTd64KUMG7CF6mOyovsQ",
    },
  ],
} as const satisfies Track
