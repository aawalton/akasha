import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungLetterInTheMail = {
  id: "01a0abeb-418b-784f-a88f-487274c0147a",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-letter-in-the-mail",
  ownLength: 4.68555,
  ownProgress: 4.68555,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Letter in the Mail",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "letterinthemail|0vn7UBvSQECKJm2817Yf1P|281133",
  song: "song/james-taylor-letter-in-the-mail",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 9,
      externalId: "1o2dvnqMGxeCQWw6MJRhn9",
      externalLink: "https://open.spotify.com/track/1o2dvnqMGxeCQWw6MJRhn9",
    },
  ],
} as const satisfies Track
