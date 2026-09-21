import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310BeginAgain = {
  id: "01a0afa2-0cc2-70ca-a138-d9a48cdf1e6e",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-begin-again",
  ownLength: 4.0917666666666666,
  ownProgress: 4.0917666666666666,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 7,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5voYhW2rWkcbFDHceCHVWq",
      externalLink: "https://open.spotify.com/track/5voYhW2rWkcbFDHceCHVWq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Begin Again",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|245506",
  song: "song/taylor-swift-begin-again",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 7,
      externalId: "5voYhW2rWkcbFDHceCHVWq",
      externalLink: "https://open.spotify.com/track/5voYhW2rWkcbFDHceCHVWq",
    },
  ],
} as const satisfies Track
