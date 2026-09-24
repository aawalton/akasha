import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungSunOnTheMoon = {
  id: "01a0abeb-4135-7597-9bc5-d10b3bb0e47e",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-sun-on-the-moon",
  ownLength: 4.16,
  ownProgress: 4.16,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sun On the Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "sunonthemoon|0vn7UBvSQECKJm2817Yf1P|249600",
  song: "song/james-taylor-sun-on-the-moon",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 6,
      externalId: "5f92CdAUMKkxn1Bo7CBs53",
      externalLink: "https://open.spotify.com/track/5f92CdAUMKkxn1Bo7CBs53",
    },
  ],
} as const satisfies Track
