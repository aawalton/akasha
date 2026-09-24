import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisSomethingJustLikeThis = {
  id: "01a0b9ee-f385-7980-9219-37760b797de6",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-something-just-like-this",
  ownLength: 4.1271,
  ownProgress: 4.1271,
  partOfCollections: ["release/coldplay-something-just-like-this"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "The Chainsmokers" }, { artist: "artist/coldplay" }],
  trackKey: "somethingjustlikethis|4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|247626",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-something-just-like-this",
      discNumber: 1,
      position: 1,
      externalId: "1dNIEtp7AY3oDAKCGg2XkH",
      externalLink: "https://open.spotify.com/track/1dNIEtp7AY3oDAKCGg2XkH",
    },
  ],
} as const satisfies Track
