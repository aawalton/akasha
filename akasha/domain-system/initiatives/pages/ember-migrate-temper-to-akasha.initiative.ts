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
        "Addon-data still exits 70 before any of its fourteen sections: `readCatalogSidecars` throws above its own parser, so that path is dead and being deleted. `temper-set` settled: the reader is order-independent, 537 rows reordered at 707 of 707 rendered identity, and `bonus-effects` gained the `buff-id` its pages lacked. The pattern is filed: a drifted generator fails loudly on a renamed field and silently on a moved one. Four instances, and five companion generators went stale under a repoint.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Parity: 93 packages in `akasha/temper` and 93 left in `temper/`. `game-collections-addon` proved to be five clusters with no edges between them, so they land at once, two in and three in flight, `lorebooks` the long pole at 1.68 MB. Equipment measured 8 of its 39 modules already recreated in akasha, with six functions the recreation lost being restored. Only `TemperCombat.xml` is still over the markup ceiling at 164,528 bytes. The audit is 70 to 73 refusals over 29,400 files, typecheck zero.",
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
