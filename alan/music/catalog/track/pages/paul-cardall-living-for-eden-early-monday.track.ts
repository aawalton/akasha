import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenEarlyMonday = {
  id: "01a0b4c8-495b-7cda-b592-3acee89b040f",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-early-monday",
  ownLength: 3.566,
  ownProgress: 3.566,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Early Monday",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "earlymonday|7FQRbf8gbKw8KZQZAJWxH2|213960",
  song: "song/paul-cardall-early-monday",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 3,
      externalId: "3O6XdRfu7EPes8FRC0IdOu",
      externalLink: "https://open.spotify.com/track/3O6XdRfu7EPes8FRC0IdOu",
    },
  ],
} as const satisfies Track
