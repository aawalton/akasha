import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonEndOfTimeKungsRemixEndOfTimeKungsRemix = {
  id: "01a0aa7c-3a75-7bad-a8a9-a2236651f977",
  type: "page-type/track",
  slug: "zara-larsson-end-of-time-kungs-remix-end-of-time-kungs-remix",
  ownLength: 2.5815,
  ownProgress: 2.5815,
  partOfCollections: [
    "release/zara-larsson-end-of-time-kungs-remix",
    "release/zara-larsson-end-of-time-the-remixes",
  ],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uHbz1fT6rOo1yZFvIAO0M",
      externalLink: "https://open.spotify.com/track/6uHbz1fT6rOo1yZFvIAO0M",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "End Of Time - Kungs Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "7keGfmQR4X5w0two1xKZ7d", artistName: "Kungs" },
  ],
  trackKey: "endoftimekungsremix|1Xylc3o4UrD53lo9CvFvVg,7keGfmQR4X5w0two1xKZ7d|154890",
  song: "song/zara-larsson-end-of-time",
  carriedBy: [
    {
      release: "release/zara-larsson-end-of-time-kungs-remix",
      discNumber: 1,
      position: 1,
      externalId: "6uHbz1fT6rOo1yZFvIAO0M",
      externalLink: "https://open.spotify.com/track/6uHbz1fT6rOo1yZFvIAO0M",
    },
    {
      release: "release/zara-larsson-end-of-time-the-remixes",
      discNumber: 1,
      position: 3,
      externalId: "3M0F5j3w18mNOEKhp0x5Au",
      externalLink: "https://open.spotify.com/track/3M0F5j3w18mNOEKhp0x5Au",
    },
  ],
} as const satisfies Track
