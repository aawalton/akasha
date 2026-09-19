import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendNeverGettingLaid = {
  id: "01a0b111-1c15-7f75-98b1-014982a1d3dd",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-never-getting-laid",
  ownLength: 3.4701833333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-man-s-best-friend"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1PdUyYYw9sGU0yhLrpeHKt",
      externalLink: "https://open.spotify.com/track/1PdUyYYw9sGU0yhLrpeHKt",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Never Getting Laid",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "nevergettinglaid|74KM79TiuVKeVCqs8QtB0B|208211",
  song: "song/sabrina-carpenter-never-getting-laid",
} as const satisfies Track
