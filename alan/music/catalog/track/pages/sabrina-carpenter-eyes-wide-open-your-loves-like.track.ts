import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenYourLovesLike = {
  id: "01a0b111-28f0-72f9-a1d9-e2d060007fe2",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-your-loves-like",
  ownLength: 3.4846666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1fVnTuUKlhkFqZ6HXV56s6",
      externalLink: "https://open.spotify.com/track/1fVnTuUKlhkFqZ6HXV56s6",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Your Love's Like",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "yourloveslike|74KM79TiuVKeVCqs8QtB0B|209080",
  song: "song/sabrina-carpenter-your-loves-like",
} as const satisfies Track
