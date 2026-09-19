import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndRemixesYesAndFelixJaehnRemix = {
  id: "01a0a6c5-35ca-777d-b3ac-dac5609c0c8c",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-remixes-yes-and-felix-jaehn-remix",
  ownLength: 3.9231666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6R5licKQW6P3UD64RWtKxb",
      externalLink: "https://open.spotify.com/track/6R5licKQW6P3UD64RWtKxb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - Felix Jaehn Remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4bL2B6hmLlMWnUEZnorEtG", artistName: "felix jaehn" },
  ],
  trackKey: "yesandfelixjaehnremix|4bL2B6hmLlMWnUEZnorEtG,66CXWjxzNUsdJxJ2JdwvnR|235390",
  song: "song/ariana-grande-yes-and",
} as const satisfies Track
