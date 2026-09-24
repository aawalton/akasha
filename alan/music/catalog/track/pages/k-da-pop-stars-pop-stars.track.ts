import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kDaPopStarsPopStars = {
  id: "01a0c957-ffcd-729b-8677-cdfd5ae93b7d",
  type: "page-type/track",
  slug: "k-da-pop-stars-pop-stars",
  ownLength: 3.185,
  ownProgress: 3.185,
  partOfCollections: ["release/k-da-pop-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "POP/STARS",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/k-da" },
    { artistName: "Madison Beer" },
    { artistName: "i-dle" },
    { artistName: "Jaira Burns" },
    { artistName: "League of Legends" },
  ],
  trackKey:
    "popstars|0tRFWXqKBBQcu5oFVOgVzX,2AfmfGFbe0A0WsTYm0SDTx,2kRfqPViCqYdSGhYSM9R0Q,47mIJdHORyRerp4os813jD,4gOc8TsQed9eqnqJct2c5v|191100",
  song: "song/k-da-pop-stars",
  carriedBy: [
    {
      release: "release/k-da-pop-stars",
      discNumber: 1,
      position: 1,
      externalId: "3em2uN4cCWHcCXhjMzJ8ps",
      externalLink: "https://open.spotify.com/track/3em2uN4cCWHcCXhjMzJ8ps",
    },
  ],
} as const satisfies Track
