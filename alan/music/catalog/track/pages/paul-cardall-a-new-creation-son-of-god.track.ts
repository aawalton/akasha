import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationSonOfGod = {
  id: "01a0b4c8-3606-7e68-9260-1671bb812bd4",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-son-of-god",
  ownLength: 4.0531,
  ownProgress: 4.0531,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Son of God",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Patrice Tipoki" }],
  trackKey: "sonofgod|77dRSdJKCKDOen5hjPYO0D,7FQRbf8gbKw8KZQZAJWxH2|243186",
  song: "song/paul-cardall-son-of-god",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 5,
      externalId: "5oo5GpimvkCxTYDrwIPTH9",
      externalLink: "https://open.spotify.com/track/5oo5GpimvkCxTYDrwIPTH9",
    },
  ],
} as const satisfies Track
