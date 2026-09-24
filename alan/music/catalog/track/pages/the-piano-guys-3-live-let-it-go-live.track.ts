import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveLetItGoLive = {
  id: "01a0afa2-130f-7a9b-8cda-23f17f7e975a",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-let-it-go-live",
  ownLength: 4.2184333333333335,
  ownProgress: 4.2184333333333335,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Let It Go (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "letitgolive|0jW6R8CVyVohuUJVcuweDI|253106",
  song: "song/the-piano-guys-let-it-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 2,
      externalId: "5ovrNcHReZB4EVbbtlShrY",
      externalLink: "https://open.spotify.com/track/5ovrNcHReZB4EVbbtlShrY",
    },
  ],
} as const satisfies Track
