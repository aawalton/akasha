import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsBirdsBirdsFeatElisa = {
  id: "01a0c43f-dbec-70bd-852d-cdc0cfc09337",
  type: "page-type/track",
  slug: "imagine-dragons-birds-birds-feat-elisa",
  ownLength: 3.657233333333333,
  ownProgress: 3.657233333333333,
  partOfCollections: ["release/imagine-dragons-birds"],
  status: "completed",
  unit: "unit/minutes",
  title: "Birds (feat. Elisa)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }, { artistName: "Elisa" }],
  trackKey: "birdsfeatelisa|2ARH58Hit3yC6ziGdhma23,53XhwfbYqKCa1cC15pYq2q|219434",
  song: "song/imagine-dragons-birds",
  carriedBy: [
    {
      release: "release/imagine-dragons-birds",
      discNumber: 1,
      position: 1,
      externalId: "2uZVfvOK7MTjBTRICYmpso",
      externalLink: "https://open.spotify.com/track/2uZVfvOK7MTjBTRICYmpso",
    },
  ],
} as const satisfies Track
