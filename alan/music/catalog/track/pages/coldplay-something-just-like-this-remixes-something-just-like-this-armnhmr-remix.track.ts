import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisArmnhmrRemix = {
  id: "01a0b9ee-f33d-75ff-842f-e3d59e123567",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-armnhmr-remix",
  ownLength: 3.7386666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2f3dQn9jfUwkgnPreXgByt",
      externalLink: "https://open.spotify.com/track/2f3dQn9jfUwkgnPreXgByt",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something Just Like This - ARMNHMR Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "69GGBxA162lTqCwzJG5jLp", artistName: "The Chainsmokers" },
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "0P2bZXPyjHYRW4guHVAFl1", artistName: "ARMNHMR" },
  ],
  trackKey:
    "somethingjustlikethisarmnhmrremix|0P2bZXPyjHYRW4guHVAFl1,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|224320",
  song: "song/coldplay-something-just-like-this",
} as const satisfies Track
