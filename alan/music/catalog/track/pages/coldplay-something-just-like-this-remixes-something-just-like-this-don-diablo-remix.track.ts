import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisDonDiabloRemix = {
  id: "01a0b9ee-f2f9-73b1-b258-ef0cde7a59be",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-don-diablo-remix",
  ownLength: 3.84755,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15MTd64KUMG7CF6mOyovsQ",
      externalLink: "https://open.spotify.com/track/15MTd64KUMG7CF6mOyovsQ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something Just Like This - Don Diablo Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "69GGBxA162lTqCwzJG5jLp", artistName: "The Chainsmokers" },
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "1l2ekx5skC4gJH8djERwh1", artistName: "Don Diablo" },
  ],
  trackKey:
    "somethingjustlikethisdondiabloremix|1l2ekx5skC4gJH8djERwh1,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|230853",
  song: "song/coldplay-something-just-like-this",
} as const satisfies Track
