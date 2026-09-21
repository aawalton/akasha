import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedOneWonderfulNightLiveTheSoundtrackOvertureNoOneMournsTheWickedLive =
  {
    id: "01a0a6c5-0c2f-7c50-be31-7f751cc01010",
    type: "page-type/track",
    slug: "ariana-grande-wicked-one-wonderful-night-live-the-soundtrack-overture-no-one-mourns-the-wicked-live",
    grade: "C",
    ownLength: 6.910083333333334,
    ownProgress: 6.910083333333334,
    partOfCollections: ["release/ariana-grande-wicked-one-wonderful-night-live-the-soundtrack"],
    position: 1,
    status: "completed",
    unit: "unit/minutes",
    externalIdentity: [
      {
        source: "spotify",
        externalId: "0I75hgf7ihukbrjyKIyiVL",
        externalLink: "https://open.spotify.com/track/0I75hgf7ihukbrjyKIyiVL",
        lastSyncedAt: "2026-09-15",
      },
    ],
    title: "Overture / No One Mourns the Wicked - Live from the Dolby Theatre",
    trackType: "live",
    discNumber: 1,
    explicit: false,
    trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
    trackKey: "overturenoonemournsthewickedlivefromthedolbytheatre|66CXWjxzNUsdJxJ2JdwvnR|414605",
    song: "song/ariana-grande-overture-no-one-mourns-the-wicked",
    carriedBy: [
      {
        release: "release/ariana-grande-wicked-one-wonderful-night-live-the-soundtrack",
        discNumber: 1,
        position: 1,
        externalId: "0I75hgf7ihukbrjyKIyiVL",
        externalLink: "https://open.spotify.com/track/0I75hgf7ihukbrjyKIyiVL",
      },
    ],
  } as const satisfies Track
