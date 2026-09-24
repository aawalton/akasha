import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassTheWomanInTheSnow = {
  id: "01a0b4c8-60f0-726c-970e-d316a0a7c155",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-the-woman-in-the-snow",
  ownLength: 3.717766666666667,
  ownProgress: 3.717766666666667,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Woman In The Snow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thewomaninthesnow|7FQRbf8gbKw8KZQZAJWxH2|223066",
  song: "song/paul-cardall-the-woman-in-the-snow",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 6,
      externalId: "4M8VhwqKbckxnCHeG71eYO",
      externalLink: "https://open.spotify.com/track/4M8VhwqKbckxnCHeG71eYO",
    },
  ],
} as const satisfies Track
