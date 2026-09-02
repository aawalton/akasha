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
        "98 of 99 source page types recreated: 5,670 pages, 108 page types, 2,080 entry files, 20,956 rows — every row checked for declared keys and a unique v7 id, all clean. `temper-completed-month` went on purpose for 119 day pages. Typecheck and the 4,643 tests pass. Holdings alone is still landing, and its inventory chunks are the only audit refusals. Left: move `temper-thing` into `temper-things/` once holdings finishes, the last folder-shape refusal.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Outside akasha on 2026-09-01: 1,777 tracked files name temper, 1,366 under `temper/` (153 packages, 4,484 files). Beside it `tools/lib/temper-addon-data` 201, `tools/commands/temper` 66, `temper-watcher/tray` 10 in Rust, three services. The 6,463 files under `pages/temper-*` must not go while the file-ceiling finding is open, because source holds the only copy of the ~193MB akasha refused.",
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
