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
        "Every source page type but one is recreated: 98 of 99, 5,670 pages, 108 page types, 2,080 entry files, 20,956 rows. `temper-completed-month` went on purpose, replaced by 119 `temper-completed-day` pages. Typecheck is clean over 21,001 files. Holdings alone is still landing. Left: move `temper-thing` into `temper-things/` once holdings finishes, the last folder-shape refusal. The 15,000-byte ceiling keeps ~193MB out, filed for Alan.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Outside akasha: the `temper/` workspace is 153 packages over 4,484 tracked files; `tools/lib/temper-addon-data` is 201; three services name temper — `temper-watcher`, `temper-watcher-liveness`, `inbox-tracking-poll`. 4,835 tracked files outside `akasha/` and `pages/` name temper. The 5,557 md pages under `pages/temper-*` go once the first intent is met.",
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
