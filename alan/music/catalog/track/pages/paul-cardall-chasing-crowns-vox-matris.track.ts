import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsVoxMatris = {
  id: "01a0b4c8-2267-7701-acc8-30d07eb4fd09",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-vox-matris",
  ownLength: 3.4,
  ownProgress: 3.4,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Vox Matris",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "voxmatris|7FQRbf8gbKw8KZQZAJWxH2|204000",
  song: "song/paul-cardall-vox-matris",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 13,
      externalId: "6nOU97dwMTIdACrvQxF0DI",
      externalLink: "https://open.spotify.com/track/6nOU97dwMTIdACrvQxF0DI",
    },
  ],
} as const satisfies Track
