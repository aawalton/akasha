import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMeDaveAudeRemix = {
  id: "01a0b111-30af-72bc-85de-e655e70b522a",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me-dave-aude-remix",
  ownLength: 3.828116666666667,
  ownProgress: 3.828116666666667,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sue Me - Dave Audé Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }, { artistName: "Dave Audé" }],
  trackKey: "suemedaveauderemix|1vWImodgVqIgTUkekGEfR9,74KM79TiuVKeVCqs8QtB0B|229687",
  song: "song/sabrina-carpenter-sue-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-sue-me-remixes",
      discNumber: 1,
      position: 5,
      externalId: "3WjGTNxFlIDjo9mjmToKf3",
      externalLink: "https://open.spotify.com/track/3WjGTNxFlIDjo9mjmToKf3",
    },
  ],
} as const satisfies Track
