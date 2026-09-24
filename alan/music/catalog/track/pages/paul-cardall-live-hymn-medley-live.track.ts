import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveHymnMedleyLive = {
  id: "01a0b4c8-5817-7463-9d0b-3b994ffadde4",
  type: "page-type/track",
  slug: "paul-cardall-live-hymn-medley-live",
  ownLength: 6.893766666666667,
  ownProgress: 6.893766666666667,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hymn Medley - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "hymnmedleylive|7FQRbf8gbKw8KZQZAJWxH2|413626",
  song: "song/paul-cardall-hymn-medley",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 6,
      externalId: "7elrfeozVMW4ykryUqqKUc",
      externalLink: "https://open.spotify.com/track/7elrfeozVMW4ykryUqqKUc",
    },
  ],
} as const satisfies Track
