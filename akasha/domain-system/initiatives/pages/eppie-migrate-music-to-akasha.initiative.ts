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
      statement: "The music commands are akasha commands rather than ops commands.",
      workingMemory:
        "Eight commands sit in `tools/commands/music/`, dispatched by `tools/ops/cli.ts` through the registry in `tools/ops/declared.ts`. `next.ts`, `rate.ts` and `collections/music/src/musicbrainz/import.ts` are the last three readers of the old `pages/`, so the old copies go once these move. `next` gives back a slug while `rate --id` takes a page id, so the loop cannot feed one to the other. Alan has said the behaviour may change rather than being carried across as it was.",
    },
    {
      statement:
        "Every song, artist and listen the music keeps is a page in akasha rather than in `pages/`.",
      workingMemory:
        "1,656 songs, 14 artists and 649 heard tracks are pages under `akasha/alan/music`, and 698 listens are rows on the twelve ESO days they were played in. Every field and every attachment byte was compared against the source and matched: 23,184 song field comparisons and 4,863,694 attachment bytes. What is left is deleting `pages/music-song`, `pages/artist`, `pages/music-day` and `pages/heard-music`, which waits on the three files still reading them.",
    },
    {
      statement: "Alan's listening is captured again, onto the pages the new system keeps.",
      workingMemory:
        "The capture was not given up on: an agent overreached and deleted it in `2669aed6` on 1 September. Its five files and 475 lines come back out of `2669aed6^:collections/music/src/listening/` rather than being written again. `capture.ts` holds the drain from `getRecentlyPlayed`, and `play-row.ts` the arithmetic, including the rule that a priming run scores no first listen.",
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
