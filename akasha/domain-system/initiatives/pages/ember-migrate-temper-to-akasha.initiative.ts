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
        "`ALL_OUTPUT_DIRS` is empty and the completion writes are deleted, proved by a recording writer at 0 writes aimed there with a seeded fault still throwing. `player-completion` is ready to ablate once web`s 3 edges clear; its 13 generated files stay on disk until then to keep `codegen-type-identity-drift` green. The catalog pages are not stranded — the capture writes them and the store answers them. Ruling: the 13 renderers and 9 tiers go, the pages stay.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "3 packages, 502 files: web 360, player-completion 85, scripts 57 — catalog-addon recreated and ablated with its 10 lost tests recovered. `/api/ask` and a catalogs hook are landed and typecheck-clean, so the last 18 legacy completion edges across 3 files are now mechanical: 13 call sites to thread catalogs through. `player-completion` is ready to ablate the moment they clear; its write target is already gone. The watcher is 6 files from whole.",
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
