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
        "All 8 clusters landed and the audit shows no temper refusal. 6,363 pages, 2,773 entry files, 20,956 rows, every row checked for declared keys and a unique v7 id. 97 of 99 source page types land one for one; `completed-month` became 119 day pages and `net-worth-day` became 787 hour pages, both to fit the ceiling. Blocked on the ceiling alone: 570MB of captures stays out, filed for Alan.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Eight seats work the level-0 wave: 48 `temper/` packages carrying no `@temper/` edge, each movable alone. Landed: watcher-tray, temper-watcher, temper-dungeons, temper-explain, temper-upstream-data, temper-addon-build, temper-inventory-automation. `eso-addon`, `eso-interface` and `lua-module` page types made for the addons, and `rust-module` gained the name Cargo reads. `bun install` linked all seven. The order is forced: packages first, then the `tools/lib` code importing them.",
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
