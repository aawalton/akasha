import type { Initiative } from "../initiative.page-type.ts"

export const emberMigrateTemperToAkasha = {
  id: "01a05d98-bb3e-723e-bb49-4b57786306a0",
  pageTypeSlug: "initiative",
  slug: "ember-migrate-temper-to-akasha",
  domainSlug: "domain/temper",
  personaSlug: "ember",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement:
        "Temper is a domain in akasha, and everything temper keeps is a page or an entry there.",
      workingMemory:
        "The parts mend is in flight: `catalog-sidecars.ts` matches any part locator now, uncommitted under its seat. A worse fault sits beneath it. `temper-set`'s pages cannot express a buff its file carries, lost in the first migration rather than by generator drift, so `bonus-effects` gains a `buff-id`. 537 of 707 rows also differ only in icon key order, which would bury that one datum inside a regeneration diff, so the file is normalised first and the generator left alone.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "90 packages are in `akasha/temper` and 97 remain in `temper/`. Housing landed whole and the twelve catalog generators with it. Companions-core is half landed: 100 files remain, none over the ceiling, so it is volume rather than a wall. Seven of fourteen addon-data sections throw, which is why six of eight generators hold only synthetic proof; one seat now has both. Typecheck answers zero over 28,973 files, but the full audit is the number that counts.",
    },
  ],
  constraints: [
    "The entries work lands in pages-system rather than under temper.",
    "Every part of temper migrated into akasha lands under `akasha/temper`.",
    "The intent stack and its working memory hold where the work is, so a fresh context resumes from the page rather than from what it remembers.",
    "Work never halts on doubt: a finding is filed, a decision is made, and the work goes on.",
    "Changes swarm across as many as twenty agents this initiative's persona spawns and shepherds, and the akasha commands are left to settle what collides.",
    "Every change goes through an akasha command, and a command that cannot do what is needed is enhanced or written rather than bypassed.",
    "A reminder every fifteen minutes restates these constraints and says to keep going.",
    "Temper is recreated in the new paradigms rather than carried across, and a feature lost in the recreation is filed as a finding.",
    "No directive comes across, and each directive left behind is filed as a finding.",
    "Temper is allowed to break until this initiative is done.",
  ],
} as const satisfies Initiative
