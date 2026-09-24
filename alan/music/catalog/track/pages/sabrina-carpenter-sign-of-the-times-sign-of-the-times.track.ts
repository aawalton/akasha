import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSignOfTheTimesSignOfTheTimes = {
  id: "01a0b111-32ce-78c8-9add-476c104c4a58",
  type: "page-type/track",
  slug: "sabrina-carpenter-sign-of-the-times-sign-of-the-times",
  ownLength: 4.22115,
  ownProgress: 4.22115,
  partOfCollections: ["release/sabrina-carpenter-sign-of-the-times"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sign of the Times",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Jasmine Thompson" }, { artist: "artist/sabrina-carpenter" }],
  trackKey: "signofthetimes|2TL8gYTNgD6nXkyuUdDrMg,74KM79TiuVKeVCqs8QtB0B|253269",
  song: "song/sabrina-carpenter-sign-of-the-times",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-sign-of-the-times",
      discNumber: 1,
      position: 1,
      externalId: "3h0RJYaohnvXg5SmWD1dZF",
      externalLink: "https://open.spotify.com/track/3h0RJYaohnvXg5SmWD1dZF",
    },
  ],
} as const satisfies Track
