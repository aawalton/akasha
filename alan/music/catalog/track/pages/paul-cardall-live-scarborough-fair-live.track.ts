import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveScarboroughFairLive = {
  id: "01a0b4c8-5889-7ec9-bbcc-999b73cc45ee",
  type: "page-type/track",
  slug: "paul-cardall-live-scarborough-fair-live",
  ownLength: 2.8211,
  ownProgress: 2.8211,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Scarborough Fair - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "scarboroughfairlive|7FQRbf8gbKw8KZQZAJWxH2|169266",
  song: "song/paul-cardall-scarborough-fair",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 9,
      externalId: "33fMR35WpgByInrsvZdyL5",
      externalLink: "https://open.spotify.com/track/33fMR35WpgByInrsvZdyL5",
    },
  ],
} as const satisfies Track
