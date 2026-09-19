import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisJaiWolfRemix = {
  id: "01a0b9ee-f31b-7023-887c-25870d345673",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-jai-wolf-remix",
  ownLength: 2.9468833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2oF42D2udxtL7Kr6WFFlGb",
      externalLink: "https://open.spotify.com/track/2oF42D2udxtL7Kr6WFFlGb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something Just Like This - Jai Wolf Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "69GGBxA162lTqCwzJG5jLp", artistName: "The Chainsmokers" },
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "24V5UY0nChKpnb1TBPJhCw", artistName: "Jai Wolf" },
  ],
  trackKey:
    "somethingjustlikethisjaiwolfremix|24V5UY0nChKpnb1TBPJhCw,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|176813",
  song: "song/coldplay-something-just-like-this",
} as const satisfies Track
