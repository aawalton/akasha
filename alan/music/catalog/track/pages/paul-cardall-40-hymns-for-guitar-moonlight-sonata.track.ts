import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarMoonlightSonata = {
  id: "01a0b4c8-1aee-72de-9343-13da73e6d323",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-moonlight-sonata",
  ownLength: 4.716666666666667,
  ownProgress: 4.716666666666667,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moonlight Sonata",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "moonlightsonata|7FQRbf8gbKw8KZQZAJWxH2|283000",
  song: "song/paul-cardall-moonlight-sonata",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-guitar",
      discNumber: 1,
      position: 19,
      externalId: "1zhEK6t7T5uACpRjmJ6JBu",
      externalLink: "https://open.spotify.com/track/1zhEK6t7T5uACpRjmJ6JBu",
    },
  ],
} as const satisfies Track
