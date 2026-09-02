import type { Initiative } from "../initiative.page-type.ts"

export const eppieMigrateMusicToAkasha = {
  id: "01a0621e-165f-7f89-87ba-0bbc5ca7562e",
  pageTypeSlug: "initiative",
  slug: "eppie-migrate-music-to-akasha",
  domainSlug: "domain/performance-arts",
  personaSlug: "eppie",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement:
        "Performance arts is a domain in akasha, and the music work sits under it as its parts.",
      workingMemory:
        "Nothing has moved. Performance arts is only `pages/domain/performance-arts.domain.md`, whose id is a v5 rather than the uuid v7 a page takes, and it holds no parts: the four music page types parent to `domain/music`, which parents to `domain/alan-harness-tracking-source` rather than here. `akasha/temper` is the one subject-matter domain already across, and its nesting of sub-domains beside their own page types is the shape to copy.",
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
        "1,656 song pages sit in `pages/music-song` beside their lyrics and synced-lyrics attachments, 30 of them carrying a rating; 20 artists; 12 day pages holding 698 listen rows between their `listens.jsonl` sidecars, each row naming a Spotify track id and a persona; 2 heard-music pages. `song-listen` keeps no file of its own and is only those rows.",
    },
  ],
  constraints: [
    "Every part of this work migrated into akasha lands under `akasha/performance-arts`.",
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
