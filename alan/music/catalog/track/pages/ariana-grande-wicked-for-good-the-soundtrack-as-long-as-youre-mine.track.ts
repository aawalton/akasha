import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrackAsLongAsYoureMine = {
  id: "01a0a6c5-0e3c-745a-912d-03fc9f718f6a",
  type: "page-type/track",
  slug: "ariana-grande-wicked-for-good-the-soundtrack-as-long-as-youre-mine",
  ownLength: 4.10955,
  ownProgress: 4.10955,
  partOfCollections: [
    "release/ariana-grande-wicked-for-good-the-soundtrack",
    "release/ariana-grande-wicked-for-good-the-soundtrack-commentary",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "As Long As You’re Mine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/cynthia-erivo" }, { artist: "artist/jonathan-bailey" }],
  trackKey: "aslongasyouremine|2Je7IdIHe8UvZbLXdapQ26,46UMQ0cW8ToR8egkBRwAxZ|246573",
  song: "song/ariana-grande-as-long-as-youre-mine",
  carriedBy: [
    {
      release: "release/ariana-grande-wicked-for-good-the-soundtrack",
      discNumber: 1,
      position: 7,
      externalId: "59vtqGF0p7RgNjnzC9Zk2p",
      externalLink: "https://open.spotify.com/track/59vtqGF0p7RgNjnzC9Zk2p",
    },
    {
      release: "release/ariana-grande-wicked-for-good-the-soundtrack-commentary",
      discNumber: 1,
      position: 15,
      externalId: "6teApADZl7JnENHdkAQ4Gm",
      externalLink: "https://open.spotify.com/track/6teApADZl7JnENHdkAQ4Gm",
    },
  ],
} as const satisfies Track
