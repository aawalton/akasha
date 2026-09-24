import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassYellowAndRose = {
  id: "01a0abeb-3b28-7966-bccc-c6a0bc8e8847",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-yellow-and-rose",
  ownLength: 4.8933333333333335,
  ownProgress: 4.8933333333333335,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yellow and Rose",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "yellowandrose|0vn7UBvSQECKJm2817Yf1P|293600",
  song: "song/james-taylor-yellow-and-rose",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 10,
      externalId: "7pX7MnSkQ2zJ0OhZbJy21C",
      externalLink: "https://open.spotify.com/track/7pX7MnSkQ2zJ0OhZbJy21C",
    },
  ],
} as const satisfies Track
