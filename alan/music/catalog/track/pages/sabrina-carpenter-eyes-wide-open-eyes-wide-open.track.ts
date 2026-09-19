import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenEyesWideOpen = {
  id: "01a0b111-2854-7e62-8ac4-60989117d414",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-eyes-wide-open",
  ownLength: 3.212,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4pbrp5dxpqjfaf4GiS6YuO",
      externalLink: "https://open.spotify.com/track/4pbrp5dxpqjfaf4GiS6YuO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eyes Wide Open",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "eyeswideopen|74KM79TiuVKeVCqs8QtB0B|192720",
  song: "song/sabrina-carpenter-eyes-wide-open",
} as const satisfies Track
