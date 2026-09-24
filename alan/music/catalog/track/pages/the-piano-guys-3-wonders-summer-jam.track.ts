import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersSummerJam = {
  id: "01a0afa2-1638-7fec-ba8c-de6e091e31de",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-summer-jam",
  ownLength: 3.8971,
  ownProgress: 3.8971,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  title: "Summer Jam",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "summerjam|0jW6R8CVyVohuUJVcuweDI|233826",
  song: "song/the-piano-guys-summer-jam",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 6,
      externalId: "6wufP2zVjNLB1UimwehCEt",
      externalLink: "https://open.spotify.com/track/6wufP2zVjNLB1UimwehCEt",
    },
  ],
} as const satisfies Track
