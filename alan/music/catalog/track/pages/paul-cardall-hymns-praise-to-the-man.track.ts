import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsPraiseToTheMan = {
  id: "01a0b4c8-63f1-76aa-8258-9d178ce54eed",
  type: "page-type/track",
  slug: "paul-cardall-hymns-praise-to-the-man",
  ownLength: 2.1791,
  ownProgress: 2.1791,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Praise To The Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "praisetotheman|7FQRbf8gbKw8KZQZAJWxH2|130746",
  song: "song/paul-cardall-praise-to-the-man",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 12,
      externalId: "5vQUtnNhqzycW7dnbcRAWR",
      externalLink: "https://open.spotify.com/track/5vQUtnNhqzycW7dnbcRAWR",
    },
  ],
} as const satisfies Track
