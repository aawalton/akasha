import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrackAsLongAsYoureMine = {
  id: "01a0a6c5-0e3c-745a-912d-03fc9f718f6a",
  type: "page-type/track",
  slug: "ariana-grande-wicked-for-good-the-soundtrack-as-long-as-youre-mine",
  ownLength: 4.10955,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-for-good-the-soundtrack"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "59vtqGF0p7RgNjnzC9Zk2p",
      externalLink: "https://open.spotify.com/track/59vtqGF0p7RgNjnzC9Zk2p",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "As Long As You’re Mine",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
    { externalId: "2Je7IdIHe8UvZbLXdapQ26", artistName: "Jonathan Bailey" },
  ],
  trackKey: "aslongasyouremine|2Je7IdIHe8UvZbLXdapQ26,46UMQ0cW8ToR8egkBRwAxZ|246573",
  song: "song/ariana-grande-as-long-as-youre-mine",
} as const satisfies Track
