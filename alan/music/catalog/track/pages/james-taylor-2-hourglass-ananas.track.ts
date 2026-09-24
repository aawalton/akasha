import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassAnanas = {
  id: "01a0abeb-3a6b-7aad-9293-e276a14c663c",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-ananas",
  ownLength: 5.706666666666667,
  ownProgress: 5.706666666666667,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ananas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "ananas|0vn7UBvSQECKJm2817Yf1P|342400",
  song: "song/james-taylor-ananas",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 5,
      externalId: "6QIH6LDpJwtu6Wt3kkrco2",
      externalLink: "https://open.spotify.com/track/6QIH6LDpJwtu6Wt3kkrco2",
    },
  ],
} as const satisfies Track
