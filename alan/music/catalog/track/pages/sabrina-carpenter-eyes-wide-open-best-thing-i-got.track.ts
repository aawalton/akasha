import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenBestThingIGot = {
  id: "01a0b111-29bd-7272-af22-ec68aca572dd",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-best-thing-i-got",
  ownLength: 3.3213333333333335,
  ownProgress: 3.3213333333333335,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "Best Thing I Got",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "bestthingigot|74KM79TiuVKeVCqs8QtB0B|199280",
  song: "song/sabrina-carpenter-best-thing-i-got",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 12,
      externalId: "66g4mn8jSks0Hu1zEcc81G",
      externalLink: "https://open.spotify.com/track/66g4mn8jSks0Hu1zEcc81G",
    },
  ],
} as const satisfies Track
