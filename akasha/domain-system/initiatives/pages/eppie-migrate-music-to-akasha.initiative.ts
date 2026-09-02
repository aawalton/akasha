import type { Initiative } from "../initiative.page-type.ts"

export const eppieMigrateMusicToAkasha = {
  id: "01a0621e-165f-7f89-87ba-0bbc5ca7562e",
  pageTypeSlug: "initiative",
  slug: "eppie-migrate-music-to-akasha",
  domainSlug: "domain/music",
  personaSlug: "eppie",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement:
        "Music in akasha has the sub-domains and page types its songs, artists and listens need.",
      workingMemory:
        "`akasha/alan/music/music.domain.ts` is open, carrying a definition and no parts yet, and Alan's domain names it. `akasha/temper` is the shape to copy, nesting sub-domains beside their own page types. In the old tree the four page types music-song, music-day, song-listen and heard-music parent to a `domain/music` that hangs off `domain/alan-harness-tracking-source` rather than off Alan. Performance arts is markdown only, and music is what this seat champions until that changes.",
    },
    {
      statement:
        "The Spotify client and the music collection are code in akasha rather than in `collections/`.",
      workingMemory:
        "27 files sit in `collections/music-spotify/src` and its `endpoints` folder, and 15 in `collections/music/src`, being `spotify-reads.ts`, `auth.ts`, `auth-cli.ts` and the `cli`, `eppie`, `lrclib` and `musicbrainz` folders. `pages/domain/spotify.domain.md` carries one rule, Paced Live Sweep, and one design line saying Extended Quota Mode is not pursued.",
    },
    {
      statement:
        "Every song, artist and listen the music keeps is a page in akasha rather than in `pages/`.",
      workingMemory:
        "1,656 song pages sit in `pages/music-song`, 30 rated, beside 1,372 lyrics and 1,340 synced-lyrics attachments; 14 artists; 12 day pages holding 698 listen rows; one heard-music page holding 678 heard-track rows, 29 of which name no Spotify track id though the property is required. The queries turn on five keys: `play-key`, `spotify-track-id`, `title-key`, `played-at`, and `new-music-minutes` summed by persona and date.",
    },
  ],
  constraints: [
    "Every part of this work migrated into akasha lands under `akasha/alan/music`.",
    "The intent stack and its working memory hold where the work is, so a fresh context resumes from the page rather than from what it remembers.",
    "Work never halts on doubt: a finding is filed, a decision is made, and the work goes on.",
    "Changes swarm across as many as twenty agents this initiative's persona spawns and shepherds, and the akasha commands are left to settle what collides.",
    "Every change goes through an akasha command, and a command that cannot do what is needed is enhanced or written rather than bypassed.",
    "The music work is recreated in the new paradigms rather than carried across, and a feature lost in the recreation is filed as a finding.",
    "No directive comes across, and each directive left behind is filed as a finding.",
    "Alan's listening is never lost: a song, a rating or a listen row that cannot be recreated is carried across whole.",
    "A live Spotify sweep is paced and scoped while this runs, an unpaced one banning the account for about a day.",
    "A reminder every fifteen minutes restates these constraints and says to keep going.",
  ],
} as const satisfies Initiative
