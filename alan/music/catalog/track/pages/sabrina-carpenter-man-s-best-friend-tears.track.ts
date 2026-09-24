import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendTears = {
  id: "01a0b111-1b5f-7b9b-ae61-c7773dc9a6ba",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-tears",
  ownLength: 2.6697166666666665,
  ownProgress: 2.6697166666666665,
  partOfCollections: [
    "release/sabrina-carpenter-man-s-best-friend",
    "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Tears",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "tears|74KM79TiuVKeVCqs8QtB0B|160183",
  song: "song/sabrina-carpenter-tears",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-man-s-best-friend",
      discNumber: 1,
      position: 2,
      externalId: "42VUCXerQ5qTr4Qp6PhKo4",
      externalLink: "https://open.spotify.com/track/42VUCXerQ5qTr4Qp6PhKo4",
    },
    {
      release: "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
      discNumber: 1,
      position: 2,
      externalId: "5P9vEHtAeviz31Flyv6enq",
      externalLink: "https://open.spotify.com/track/5P9vEHtAeviz31Flyv6enq",
    },
  ],
} as const satisfies Track
