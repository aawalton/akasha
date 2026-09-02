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
        "Player-completion must NOT be ablated: 12 modules are live in the legacy with no akasha twin and no importer, so an importer-based readiness check finds the island closed and licenses removal. 26 of 37 deleted tests are recreated, 365 pass, 0 fail; the other 11 prove modules that have not crossed. Web edges cleared at `e603fbf255`. Lore-library now counts 6,590 books where the legacy counted 211 collections, a product change nothing recorded.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "`09f964f5c5` is a pure deletion of 2,271 test files and 279,625 lines repo-wide: the tree went from 2,533 tests to 262 and holds 578 now. Its message describes ablating task pages and the diff holds none of that. It hit all 3 remaining packages — player-completion 37, scripts 27, web 13. No ablation may rest on twin-against-legacy parity until those are recovered. Player-completion recovery is in flight.",
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
