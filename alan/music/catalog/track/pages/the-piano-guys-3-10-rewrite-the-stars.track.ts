import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310RewriteTheStars = {
  id: "01a0afa2-0d10-7708-b6d4-0f566c548920",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-rewrite-the-stars",
  ownLength: 3.504,
  ownProgress: 3.504,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-movie-soundtracks",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Rewrite the Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "rewritethestars|0jW6R8CVyVohuUJVcuweDI|210240",
  song: "song/the-piano-guys-rewrite-the-stars",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 9,
      externalId: "6y3fZqqhznBstwpi2RECob",
      externalLink: "https://open.spotify.com/track/6y3fZqqhznBstwpi2RECob",
    },
    {
      release: "release/the-piano-guys-3-classical-movie-soundtracks",
      discNumber: 1,
      position: 11,
      externalId: "3CLNIC8J4ThMSpbpuHoaHV",
      externalLink: "https://open.spotify.com/track/3CLNIC8J4ThMSpbpuHoaHV",
    },
  ],
} as const satisfies Track
