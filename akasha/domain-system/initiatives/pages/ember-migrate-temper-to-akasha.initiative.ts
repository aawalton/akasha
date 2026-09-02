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
        "The inventory chunks are no wall. Rejoined they are 151 captures, each landed as one `stacks` entry file beside its `temper-inventory-snapshot` page, the largest 2,832,763 bytes of 8,388,608, and every row round-trips to its source. 674,612 rows, 408MB. Two walls need Alan: the 24-file item sweep concatenates to 188,484,624 bytes, 22x over, and 22 completion captures are one document rather than rows. Nothing under `pages/` is deleted.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "A package moves once its dependencies are in akasha, whether or not the source is gone. Three hubs gate most of the wave and a seat has each: `catalog-core` (7 dependents), `shared-capture-host` (6), `shared-formula-framework` (4). Thirty addon packages wait on one shared set of ESO declarations; thirteen seats each wrote their own, and the collision answers 245 refusals at audit, so one seat owns deleting all thirteen. No `type-declaration` page has landed. Teardown is proven twice.",
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
