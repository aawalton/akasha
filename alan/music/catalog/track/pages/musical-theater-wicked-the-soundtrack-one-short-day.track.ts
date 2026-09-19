import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrackOneShortDay = {
  id: "01a0a6c5-1293-70ae-8867-a5d22b01e0f5",
  type: "page-type/track",
  slug: "musical-theater-wicked-the-soundtrack-one-short-day",
  ownLength: 6.544466666666667,
  ownProgress: 0,
  partOfCollections: ["release/musical-theater-wicked-the-soundtrack"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4jNerIJa2IOeL5gVDvMNLW",
      externalLink: "https://open.spotify.com/track/4jNerIJa2IOeL5gVDvMNLW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Short Day",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "3DgcBA7P0ji5co7Z1Gfp2Q", artistName: "Kristin Chenoweth" },
    { externalId: "73Np75Wv2tju61Eo9Zw4IR", artistName: "Idina Menzel" },
    { externalId: "26el8XoLgjuWJJBXCVdHjX", artistName: "Michael McCorry Rose" },
  ],
  trackKey:
    "oneshortday|26el8XoLgjuWJJBXCVdHjX,3DgcBA7P0ji5co7Z1Gfp2Q,46UMQ0cW8ToR8egkBRwAxZ,66CXWjxzNUsdJxJ2JdwvnR,73Np75Wv2tju61Eo9Zw4IR|392668",
  song: "song/cynthia-erivo-one-short-day",
} as const satisfies Track
