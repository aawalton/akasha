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
        "The addon-data generator aborts before it writes anything: `output-dirs.ts` holds 12 rows, 11 naming a package with no tracked files, and `assertOutputDirParentsExist` throws on the first of them, reached from `generate.ts:15`. Clearing that outranks finishing the read half, because every differential proof downstream needs the pipeline to run. The render half is landed and byte-identical. The registry is 39 rows and nothing reads it yet. `typesFor` does not cross.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "17 packages and 899 files remain under `temper/`, from 38 and 2,291, and every one has a seat. `web` at 358 crosses last by ruling: 1,842 of its 2,718 edges already name `@akasha` and the rest wait on the interface packages. A dangling export row in one akasha manifest refuses every write in the repository rather than only its own package's, so retry rather than reach into another lane. A glob whose last match is ablated is orphaned and comes out with it.",
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
