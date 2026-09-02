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
        "Addon-data pipeline is blocked on a port, not a body: `imports-inside` bars akasha from `tools/`. At `ff0eb0b54d` `tools/lib/temper-addon-data` holds 83 files, 29 already pure `@akasha` re-export shims; 54 files and 3,101 lines of orchestration remain, led by `addon-data-pages` at 421 and `catalog-sidecars` at 253. The `code/` generators are migrated — a folder-scoped census called 15 absent and widening found all 15. Findings `593b76c9d6`, `1c78afe15b`.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "26 packages and 1,107 files remain under `temper/`, from 38 and 2,291. `web` at 358 is a third of what is left and now has a seat. Absence is no longer the blind spot; a path named only as a string is. Three porters write into folders that are gone, and one package showed 4 of its 42 references to an import census. `imports-inside` is blind to a specifier a manifest names only by a wildcard export, so a green check proves nothing.",
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
