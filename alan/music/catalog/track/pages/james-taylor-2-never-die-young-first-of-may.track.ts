import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungFirstOfMay = {
  id: "01a0abeb-41a6-7d07-9126-939925d0d460",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-first-of-may",
  ownLength: 4.02,
  ownProgress: 4.02,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "First of May",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "firstofmay|0vn7UBvSQECKJm2817Yf1P|241200",
  song: "song/james-taylor-first-of-may",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 10,
      externalId: "08lmf4weog2lDvgOfPMuEu",
      externalLink: "https://open.spotify.com/track/08lmf4weog2lDvgOfPMuEu",
    },
  ],
} as const satisfies Track
