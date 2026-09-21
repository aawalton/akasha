import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiJonnyRifePulledAKnifeJonnyRifePulledAKnife = {
  id: "01a0b112-95b7-7e50-863e-59670b821944",
  type: "page-type/track",
  slug: "vinny-marchi-jonny-rife-pulled-a-knife-jonny-rife-pulled-a-knife",
  ownLength: 3.0166666666666666,
  ownProgress: 3.0166666666666666,
  partOfCollections: [
    "release/vinny-marchi-jonny-rife-pulled-a-knife",
    "release/vinny-marchi-tales-of-the-lesbian-hunter",
  ],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1s0sieFucHsh8RGshCbX9j",
      externalLink: "https://open.spotify.com/track/1s0sieFucHsh8RGshCbX9j",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jonny Rife Pulled a Knife",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "jonnyrifepulledaknife|5USAMqcbMAzF3HBmeD5pJF|181000",
  song: "song/vinny-marchi-jonny-rife-pulled-a-knife",
  carriedBy: [
    {
      release: "release/vinny-marchi-jonny-rife-pulled-a-knife",
      discNumber: 1,
      position: 1,
      externalId: "1s0sieFucHsh8RGshCbX9j",
      externalLink: "https://open.spotify.com/track/1s0sieFucHsh8RGshCbX9j",
    },
    {
      release: "release/vinny-marchi-tales-of-the-lesbian-hunter",
      discNumber: 1,
      position: 13,
      externalId: "2RM5EdNddpjmgUHQ5rpDBs",
      externalLink: "https://open.spotify.com/track/2RM5EdNddpjmgUHQ5rpDBs",
    },
  ],
} as const satisfies Track
