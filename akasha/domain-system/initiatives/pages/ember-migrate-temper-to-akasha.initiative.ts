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
        "Temper outside akasha is 3 packages and 502 files: web 360, player-completion 85, scripts 57. The legacy `pages/temper-*` tree is fully mirrored — 5,557 markdown against 5,557 landed pages, 97 of 99 directories matching exactly — and is held rather than ablated, because two rulings conflict and a live capture path still writes there. Test recovery from `09f964f5c5` is done for scripts and for web, and 26 of 37 for player-completion.",
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
