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
        "`output-dirs.ts` no longer aborts the generator: 11 consts remain, but `ALL_OUTPUT_DIRS` holds one row, `player-completion`, so the pipeline runs again — and aborts again the moment that package ablates. The render half is landed and byte-identical. 19 rendered tables have no `ADDON_DATA_TARGETS` destination. The registry is 39 rows and nothing reads it yet. `typesFor` does not cross.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "13 packages and 693 files remain under `temper/`, from 38 and 2,291. `web` at 357 crosses last; `scripts` and `player-inventory-management-ui` are gone. Web's remaining completion edges are 21 across 4 files, held by 12 transforms that gained catalog parameters the akasha catalogs answer as pages rather than as tables. `player-completion-addon` at 102 has no twin at all and is seated.",
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
