import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixesOnMyLoveFelixJaehnRemix = {
  id: "01a0aa7c-2c3f-7876-a1fc-c2cc8324414c",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-the-remixes-on-my-love-felix-jaehn-remix",
  ownLength: 3.5,
  ownProgress: 3.5,
  partOfCollections: ["release/zara-larsson-on-my-love-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "On My Love - Felix Jaehn Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artist: "artist/zara-larsson" },
    { artistName: "David Guetta" },
    { artistName: "felix jaehn" },
  ],
  trackKey:
    "onmylovefelixjaehnremix|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg,4bL2B6hmLlMWnUEZnorEtG|210000",
  song: "song/zara-larsson-on-my-love",
  carriedBy: [
    {
      release: "release/zara-larsson-on-my-love-the-remixes",
      discNumber: 1,
      position: 2,
      externalId: "3eLkxnSFU8L4fPhScVfNe2",
      externalLink: "https://open.spotify.com/track/3eLkxnSFU8L4fPhScVfNe2",
    },
  ],
} as const satisfies Track
