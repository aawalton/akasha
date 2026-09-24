import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsHeIsRisen = {
  id: "01a0b4c8-6412-7e1e-a48b-ee7141a22a23",
  type: "page-type/track",
  slug: "paul-cardall-hymns-he-is-risen",
  ownLength: 2.5888833333333334,
  ownProgress: 2.5888833333333334,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "He Is Risen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "heisrisen|7FQRbf8gbKw8KZQZAJWxH2|155333",
  song: "song/paul-cardall-he-is-risen",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 13,
      externalId: "3wo5Om3qK3li3qn8JFRS7O",
      externalLink: "https://open.spotify.com/track/3wo5Om3qK3li3qn8JFRS7O",
    },
  ],
} as const satisfies Track
