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
        "Intent 1 blocks the ablation, not the repoint. The catalogs are already akasha pages — 89 page types, some 4,300 pages — and `temper-cadwell-level` carries `title`, `displayOrder` and a jsonl `cadwellStops`, exactly the `CadwellLevelCatalogEntry` the twin transform asks for. Only ablating `temper/player-completion` waits, on `ALL_OUTPUT_DIRS`. Entries read through the path-shaped calls; the nine keyed writers, `writeRow` among them, all refuse.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "4 packages and 512 files remain under `temper/`: web 357, player-completion 85, scripts 57, catalog-addon 13. Web is 21 edges from movable — 18 naming legacy `@temper/player-completion`, 3 naming `@shared/*` — everything else is `@akasha/*`, npm, or web`s own aliases. Ask git what tests an earlier commit deleted before weighing a twin against the legacy tip: `09f964f5c5` has now eaten tests in six packages.",
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
