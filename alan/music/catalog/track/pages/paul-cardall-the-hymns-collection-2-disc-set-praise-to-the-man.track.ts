import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetPraiseToTheMan = {
  id: "01a0b4c8-4e28-753a-9c9e-3a3825086232",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-praise-to-the-man",
  ownLength: 2.213,
  ownProgress: 2.213,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  status: "completed",
  unit: "unit/minutes",
  title: "Praise to the Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "praisetotheman|7FQRbf8gbKw8KZQZAJWxH2|132780",
  song: "song/paul-cardall-praise-to-the-man",
  carriedBy: [
    {
      release: "release/paul-cardall-the-hymns-collection-2-disc-set",
      discNumber: 1,
      position: 12,
      externalId: "5f3pOEdP6IuaOd3Ek9XejT",
      externalLink: "https://open.spotify.com/track/5f3pOEdP6IuaOd3Ek9XejT",
    },
  ],
} as const satisfies Track
