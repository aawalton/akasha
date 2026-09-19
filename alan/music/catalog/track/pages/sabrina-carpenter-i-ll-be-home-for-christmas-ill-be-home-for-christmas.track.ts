import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterILlBeHomeForChristmasIllBeHomeForChristmas = {
  id: "01a0b111-33ef-762a-adfe-0c28e3d1bcbe",
  type: "page-type/track",
  slug: "sabrina-carpenter-i-ll-be-home-for-christmas-ill-be-home-for-christmas",
  ownLength: 3.5855333333333332,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-i-ll-be-home-for-christmas"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4xrSZaNoi4OisFTGYlhPYu",
      externalLink: "https://open.spotify.com/track/4xrSZaNoi4OisFTGYlhPYu",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I'll Be Home For Christmas",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6KxBixTtWRYyojmIvlFvjD", artistName: "Ali Brustofski" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "5uLFfLEAeIwKrgRtpfKAzq", artistName: "Danielle Lowe" },
  ],
  trackKey:
    "illbehomeforchristmas|5uLFfLEAeIwKrgRtpfKAzq,6KxBixTtWRYyojmIvlFvjD,74KM79TiuVKeVCqs8QtB0B|215132",
  song: "song/sabrina-carpenter-ill-be-home-for-christmas",
} as const satisfies Track
