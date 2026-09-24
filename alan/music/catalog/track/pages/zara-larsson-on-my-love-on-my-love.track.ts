import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveOnMyLove = {
  id: "01a0aa7c-3965-73e6-b914-03eb55548da0",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-on-my-love",
  ownLength: 3.7151833333333335,
  ownProgress: 3.7151833333333335,
  partOfCollections: ["release/zara-larsson-on-my-love", "release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "On My Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "David Guetta" }],
  trackKey: "onmylove|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg|222911",
  song: "song/zara-larsson-on-my-love",
  carriedBy: [
    {
      release: "release/zara-larsson-on-my-love",
      discNumber: 1,
      position: 1,
      externalId: "0dxp7DyPJEo6JhtnjUtBnN",
      externalLink: "https://open.spotify.com/track/0dxp7DyPJEo6JhtnjUtBnN",
    },
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 3,
      externalId: "1ewzs8xG9P7wSZhpp8VCuy",
      externalLink: "https://open.spotify.com/track/1ewzs8xG9P7wSZhpp8VCuy",
    },
  ],
} as const satisfies Track
