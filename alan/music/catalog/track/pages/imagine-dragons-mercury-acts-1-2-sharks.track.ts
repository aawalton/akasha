import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Sharks = {
  id: "01a0c43f-c4f7-7de2-be62-b292ded7a951",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-sharks",
  ownLength: 3.1813833333333332,
  ownProgress: 3.1813833333333332,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2", "release/imagine-dragons-sharks"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sharks",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "sharks|53XhwfbYqKCa1cC15pYq2q|190883",
  song: "song/imagine-dragons-sharks",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 2,
      position: 3,
      externalId: "7sA2SKTo1QbTSSYn5YvJC4",
      externalLink: "https://open.spotify.com/track/7sA2SKTo1QbTSSYn5YvJC4",
    },
    {
      release: "release/imagine-dragons-sharks",
      discNumber: 1,
      position: 1,
      externalId: "0TyUOnU4H4GLqOcrH0auc8",
      externalLink: "https://open.spotify.com/track/0TyUOnU4H4GLqOcrH0auc8",
    },
  ],
} as const satisfies Track
