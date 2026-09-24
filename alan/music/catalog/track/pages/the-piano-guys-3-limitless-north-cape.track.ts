import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessNorthCape = {
  id: "01a0afa2-0f41-71d2-9d19-9cfb1b7bef8d",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-north-cape",
  ownLength: 2.9937,
  ownProgress: 2.9937,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "North Cape",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "northcape|0jW6R8CVyVohuUJVcuweDI|179622",
  song: "song/the-piano-guys-north-cape",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 11,
      externalId: "7LdwWWep99mc0L5c1gY8e7",
      externalLink: "https://open.spotify.com/track/7LdwWWep99mc0L5c1gY8e7",
    },
  ],
} as const satisfies Track
