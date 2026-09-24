import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoAfterTheRainFall = {
  id: "01a0b4c8-3245-74cc-9637-0aa6b4b958e0",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-after-the-rain-fall",
  ownLength: 4.6831,
  ownProgress: 4.6831,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "After the Rain Fall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "aftertherainfall|7FQRbf8gbKw8KZQZAJWxH2|280986",
  song: "song/paul-cardall-after-the-rain-fall",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 8,
      externalId: "4INuKoAd77rfgdGSMuOBRT",
      externalLink: "https://open.spotify.com/track/4INuKoAd77rfgdGSMuOBRT",
    },
  ],
} as const satisfies Track
