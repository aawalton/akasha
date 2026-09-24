import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMe = {
  id: "01a0b111-303a-7be0-8c09-d611f94d622a",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me",
  ownLength: 2.986,
  ownProgress: 2.986,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sue Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "sueme|74KM79TiuVKeVCqs8QtB0B|179160",
  song: "song/sabrina-carpenter-sue-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-sue-me-remixes",
      discNumber: 1,
      position: 1,
      externalId: "0EUfhpYpiA7ErIWAU7P4gx",
      externalLink: "https://open.spotify.com/track/0EUfhpYpiA7ErIWAU7P4gx",
    },
  ],
} as const satisfies Track
