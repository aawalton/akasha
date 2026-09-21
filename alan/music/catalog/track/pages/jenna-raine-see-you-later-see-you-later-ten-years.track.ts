import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineSeeYouLaterSeeYouLaterTenYears = {
  id: "01a0c621-23ee-7bcd-b710-0513ff1c71a9",
  type: "page-type/track",
  slug: "jenna-raine-see-you-later-see-you-later-ten-years",
  ownLength: 3.136,
  ownProgress: 3.136,
  partOfCollections: [
    "release/jenna-raine-see-you-later",
    "release/jenna-raine-see-you-later-ten-years",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "see you later (ten years)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "seeyoulatertenyears|3aHe9rMa5HFTjXHw8tEz0A|188160",
  song: "song/jenna-raine-see-you-later-ten-years",
  carriedBy: [
    {
      release: "release/jenna-raine-see-you-later",
      discNumber: 1,
      position: 1,
      externalId: "5V0qObpWLqN86djnBUrHJX",
      externalLink: "https://open.spotify.com/track/5V0qObpWLqN86djnBUrHJX",
    },
    {
      release: "release/jenna-raine-see-you-later-ten-years",
      discNumber: 1,
      position: 1,
      externalId: "7FKkswFflI5Txc3Y4gH0IB",
      externalLink: "https://open.spotify.com/track/7FKkswFflI5Txc3Y4gH0IB",
    },
  ],
} as const satisfies Track
