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
        "Addon-data's render half is landed and proven byte-identical, and both open calls are made. `typesFor` does not cross: the render module declares the shape it coerces to, and that coercion turns out to matter for one declared type in 225. The registry widened 4 rows to 38 by deriving destinations from exports rather than choosing them, leaving 19 rendered tables with none. A seat holds the read half — `pages-bridge`, then `addon-data-pages` at 421 lines and `catalog-sidecars` at 255.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "20 packages and 987 files remain under `temper/`, from 38 and 2,291. `web` at 358 is a third of it and has a seat. Nine ablation reference sites now, the ninth being a path composed from a fragment, which `akasha remove` cannot see and no search for the package finds. A surgical one-row workspaces edit was overwritten eight seconds later by a sibling rewriting the whole list, with no git conflict, so re-read a shared list at the end rather than trusting the edit.",
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
