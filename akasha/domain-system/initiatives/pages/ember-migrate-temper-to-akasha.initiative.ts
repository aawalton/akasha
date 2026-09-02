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
        "Every temper page type is in akasha; the two the folder census read as short are landed at a finer grain, `temper-net-worth-day` as net-worth-hours with 3,395 readings proven equal and `temper-completed-month` as completed-days with 1,425 ids identical. `item`, `game`, `condition` and `collection-type` are other domains'. Both watcher writers now land at those grains, replayed byte for byte; no writer reaches the snapshot stacks grain. One wall: the `eso` mine's items, 22x the entry ceiling.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "66 packages are in akasha and 109 folders remain, though the census overstates it and a seat is measuring which already landed under a new name. The ESO shared set landed: 100 declaration pages, 6,854 names, clean. The thirteen per-package `declare global` modules are trimmed rather than deleted, since 142 of their names are not in the shared set; that is the 567-refusal wall, and three seats hold it. The pure-logic spine under `game-characters-equipment` and `shared-narrow` needs none of it.",
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
