import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillYouAreTheReason = {
  id: "01a0afa1-e1a5-7df4-be2e-3a350f798cca",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-you-are-the-reason",
  ownLength: 3.9205,
  ownProgress: 3.9205,
  partOfCollections: [
    "release/the-piano-guys-3-chill",
    "release/the-piano-guys-3-classical-love-romance",
    "release/the-piano-guys-3-wedding-season",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "You Are The Reason",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Dallas String Quartet" }],
  trackKey: "youarethereason|0jW6R8CVyVohuUJVcuweDI,5vvlfKQdn6amTImsjy9Si5|235230",
  song: "song/the-piano-guys-you-are-the-reason",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 10,
      externalId: "39kcQDf6iV6RG7sq2shJBk",
      externalLink: "https://open.spotify.com/track/39kcQDf6iV6RG7sq2shJBk",
    },
    {
      release: "release/the-piano-guys-3-classical-love-romance",
      discNumber: 1,
      position: 8,
      externalId: "3VWrExAhooCiHKcvGeKnZy",
      externalLink: "https://open.spotify.com/track/3VWrExAhooCiHKcvGeKnZy",
    },
    {
      release: "release/the-piano-guys-3-wedding-season",
      discNumber: 1,
      position: 15,
      externalId: "1oUzdnQof2tsyTAzFtc6qa",
      externalLink: "https://open.spotify.com/track/1oUzdnQof2tsyTAzFtc6qa",
    },
  ],
} as const satisfies Track
