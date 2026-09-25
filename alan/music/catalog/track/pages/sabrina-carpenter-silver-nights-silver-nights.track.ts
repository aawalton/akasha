import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSilverNightsSilverNights = {
  id: "01a0b111-3393-78d4-8dab-c3ac448935a6",
  type: "page-type/track",
  slug: "sabrina-carpenter-silver-nights-silver-nights",
  ownLength: 2.442,
  ownProgress: 2.442,
  partOfCollections: ["release/sabrina-carpenter-silver-nights"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silver Nights",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "silvernights|74KM79TiuVKeVCqs8QtB0B|146520",
  song: "song/sabrina-carpenter-silver-nights",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-silver-nights",
      discNumber: 1,
      position: 1,
      externalId: "4hBJ3HHSLgaKcMOxWxrKm0",
      externalLink: "https://open.spotify.com/track/4hBJ3HHSLgaKcMOxWxrKm0",
    },
  ],
} as const satisfies Track
