import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessRewriteTheStars = {
  id: "01a0afa2-0e28-770a-ac0d-0d9cd2d8d17a",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-rewrite-the-stars",
  ownLength: 3.52555,
  ownProgress: 3.52555,
  partOfCollections: ["release/the-piano-guys-3-limitless", "release/the-piano-guys-serenity"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rewrite the Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "rewritethestars|0jW6R8CVyVohuUJVcuweDI|211533",
  song: "song/the-piano-guys-rewrite-the-stars",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 2,
      externalId: "1t4NUQuv33szmm8jeLzsZW",
      externalLink: "https://open.spotify.com/track/1t4NUQuv33szmm8jeLzsZW",
    },
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 4,
      externalId: "3wliVjxGl2X28AQ6h1udXW",
      externalLink: "https://open.spotify.com/track/3wliVjxGl2X28AQ6h1udXW",
    },
  ],
} as const satisfies Track
