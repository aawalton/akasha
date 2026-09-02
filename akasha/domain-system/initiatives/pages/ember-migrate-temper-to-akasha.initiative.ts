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
        "All 13 generated tables render byte-identical from akasha pages, a seeded fault proving the probe sees — so the generate refusal is dead, but 10 tables have no akasha module to land in. Ruling: build no gate-write route; a table lands when an akasha consumer needs it, and once web repoints its 3 files these have none, so they go with the package. Next: empty `ALL_OUTPUT_DIRS`, then ablate. Largest table is 1,199,592 bytes, 80x the ceiling.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "4 packages, 512 files: web 357, player-completion 85, scripts 57, catalog-addon 13. Web`s shared edges are cleared; 18 legacy completion edges remain in 3 files and wait on an `/api/ask` route, a fourth member of a family web already serves three of. A fourth tie nobody counted: `@shared/utils-test` via a bunfig preload, a manifest row and a tsconfig reference. The watcher is 6 files from whole, at 532 tests.",
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
