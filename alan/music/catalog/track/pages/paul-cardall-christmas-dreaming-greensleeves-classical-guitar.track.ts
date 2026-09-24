import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasDreamingGreensleevesClassicalGuitar = {
  id: "01a0b4c8-6847-7aa7-a234-c69e34945d53",
  type: "page-type/track",
  slug: "paul-cardall-christmas-dreaming-greensleeves-classical-guitar",
  ownLength: 3.1160833333333335,
  ownProgress: 3.1160833333333335,
  partOfCollections: ["release/paul-cardall-christmas-dreaming"],
  status: "completed",
  unit: "unit/minutes",
  title: "Greensleeves - Classical Guitar",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Mak Grgic" }, { artist: "artist/paul-cardall" }],
  trackKey: "greensleevesclassicalguitar|2pzgrbowKM8SGmdK3YMcGq,7FQRbf8gbKw8KZQZAJWxH2|186965",
  song: "song/paul-cardall-greensleeves-classical-guitar",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas-dreaming",
      discNumber: 1,
      position: 2,
      externalId: "48S0eiHKHZ9UghvRTnCCKB",
      externalLink: "https://open.spotify.com/track/48S0eiHKHZ9UghvRTnCCKB",
    },
  ],
} as const satisfies Track
