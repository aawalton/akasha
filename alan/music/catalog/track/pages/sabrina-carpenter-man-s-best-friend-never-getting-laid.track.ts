import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendNeverGettingLaid = {
  id: "01a0b111-1c15-7f75-98b1-014982a1d3dd",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-never-getting-laid",
  ownLength: 3.4701833333333334,
  ownProgress: 3.4701833333333334,
  partOfCollections: [
    "release/sabrina-carpenter-man-s-best-friend",
    "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Never Getting Laid",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "nevergettinglaid|74KM79TiuVKeVCqs8QtB0B|208211",
  song: "song/sabrina-carpenter-never-getting-laid",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-man-s-best-friend",
      discNumber: 1,
      position: 7,
      externalId: "1PdUyYYw9sGU0yhLrpeHKt",
      externalLink: "https://open.spotify.com/track/1PdUyYYw9sGU0yhLrpeHKt",
    },
    {
      release: "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
      discNumber: 1,
      position: 7,
      externalId: "5wIQSTbtONKXUjxMeXDyGL",
      externalLink: "https://open.spotify.com/track/5wIQSTbtONKXUjxMeXDyGL",
    },
  ],
} as const satisfies Track
