import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21SomeoneLikeYou = {
  id: "01a0d52b-c25a-7115-a06b-574795090fd6",
  type: "page-type/track",
  slug: "adele-21-someone-like-you",
  ownLength: 4.754,
  ownProgress: 4.754,
  partOfCollections: ["release/adele-21"],
  status: "completed",
  unit: "unit/minutes",
  title: "Someone Like You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "someonelikeyou|4dpARuHxo51G3z768sgnrY|285240",
  song: "song/adele-someone-like-you",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 11,
      externalId: "1zwMYTA5nlNjZxYrvBB2pV",
      externalLink: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV",
    },
  ],
} as const satisfies Track
