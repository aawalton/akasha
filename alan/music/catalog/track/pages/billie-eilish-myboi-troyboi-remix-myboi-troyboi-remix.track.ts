import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishMyboiTroyboiRemixMyboiTroyboiRemix = {
  id: "01a0b638-eaf6-7764-b143-153ca0b580fd",
  type: "page-type/track",
  slug: "billie-eilish-myboi-troyboi-remix-myboi-troyboi-remix",
  ownLength: 3.521733333333333,
  ownProgress: 3.521733333333333,
  partOfCollections: ["release/billie-eilish-myboi-troyboi-remix"],
  status: "completed",
  unit: "unit/minutes",
  title: "MyBoi - TroyBoi Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "TroyBoi" }],
  trackKey: "myboitroyboiremix|0tvpihdAsKiNnP6sWS3jUI,6qqNVTkY8uBg9cP3Jd7DAH|211304",
  song: "song/billie-eilish-myboi",
  carriedBy: [
    {
      release: "release/billie-eilish-myboi-troyboi-remix",
      discNumber: 1,
      position: 1,
      externalId: "1T3E8z6VMXSsACrBSQHTkN",
      externalLink: "https://open.spotify.com/track/1T3E8z6VMXSsACrBSQHTkN",
    },
  ],
} as const satisfies Track
