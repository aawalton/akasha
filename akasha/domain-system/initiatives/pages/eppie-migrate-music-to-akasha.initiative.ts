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
      statement: "Alan's listening is captured again, onto the pages the new system keeps.",
      workingMemory:
        "`akasha music-capture` is built and tested and has never been run, so nothing has been captured since an agent deleted the old capture in `2669aed6` on 1 September. The arithmetic came back out of `2669aed6^` into `module/play-row`, the priming rule with it. Running it the first time is Alan's call, not an agent's. 360 tests pass. The one leg no test reaches is the commit a real capture makes.",
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
