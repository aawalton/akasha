import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassWithoutYou = {
  id: "01a0b4c8-60ae-7c7d-9f51-9700a502baa0",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-without-you",
  ownLength: 3.4257166666666667,
  ownProgress: 3.4257166666666667,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Without You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "withoutyou|7FQRbf8gbKw8KZQZAJWxH2|205543",
  song: "song/paul-cardall-without-you",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 4,
      externalId: "3q9msLV4WwZoghu0Bm3YUg",
      externalLink: "https://open.spotify.com/track/3q9msLV4WwZoghu0Bm3YUg",
    },
  ],
} as const satisfies Track
