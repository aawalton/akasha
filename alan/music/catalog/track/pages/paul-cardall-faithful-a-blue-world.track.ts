import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulABlueWorld = {
  id: "01a0b4c8-5a08-7fca-8f7b-fbbf0ab9f716",
  type: "page-type/track",
  slug: "paul-cardall-faithful-a-blue-world",
  ownLength: 4.945333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1K0NL2Sxe1acIY8239sZRb",
      externalLink: "https://open.spotify.com/track/1K0NL2Sxe1acIY8239sZRb",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Blue World",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ablueworld|7FQRbf8gbKw8KZQZAJWxH2|296720",
  song: "song/paul-cardall-a-blue-world",
} as const satisfies Track
