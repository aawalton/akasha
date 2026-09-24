import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisArmnhmrRemix = {
  id: "01a0b9ee-f33d-75ff-842f-e3d59e123567",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-armnhmr-remix",
  ownLength: 3.7386666666666666,
  ownProgress: 3.7386666666666666,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This - ARMNHMR Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "The Chainsmokers" },
    { artist: "artist/coldplay" },
    { artistName: "ARMNHMR" },
  ],
  trackKey:
    "somethingjustlikethisarmnhmrremix|0P2bZXPyjHYRW4guHVAFl1,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|224320",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-something-just-like-this-remixes",
      discNumber: 1,
      position: 6,
      externalId: "2f3dQn9jfUwkgnPreXgByt",
      externalLink: "https://open.spotify.com/track/2f3dQn9jfUwkgnPreXgByt",
    },
  ],
} as const satisfies Track
