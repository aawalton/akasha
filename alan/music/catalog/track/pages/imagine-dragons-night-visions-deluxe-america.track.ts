import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeAmerica = {
  id: "01a0c43f-d8aa-713b-990a-e52a7a14bc8d",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-america",
  ownLength: 4.544666666666667,
  ownProgress: 4.544666666666667,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "America",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "america|53XhwfbYqKCa1cC15pYq2q|272680",
  song: "song/imagine-dragons-america",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "0Hl7Z3TIEgY0JSbQNDM4ZA",
      externalLink: "https://open.spotify.com/track/0Hl7Z3TIEgY0JSbQNDM4ZA",
    },
  ],
} as const satisfies Track
