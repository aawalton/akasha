import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasChristmasPast = {
  id: "01a0b4c8-344d-7596-8d93-62462e85a485",
  type: "page-type/track",
  slug: "paul-cardall-christmas-christmas-past",
  ownLength: 4.335016666666666,
  ownProgress: 4.335016666666666,
  partOfCollections: ["release/paul-cardall-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Christmas Past",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "christmaspast|7FQRbf8gbKw8KZQZAJWxH2|260101",
  song: "song/paul-cardall-christmas-past",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 6,
      externalId: "5GUFRGn6QwJu2p2chIcXGG",
      externalLink: "https://open.spotify.com/track/5GUFRGn6QwJu2p2chIcXGG",
    },
  ],
} as const satisfies Track
