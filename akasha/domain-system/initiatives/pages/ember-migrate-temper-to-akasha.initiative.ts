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
        "Akasha writes one entry file per property, so the old `.partN` split is a stray and the 8,388,608-byte ceiling holds the whole. Of 252 source jsonl, 227 had landed overnight and 1 more did. Three walls need Alan: the 24-file item sweep concatenates to 188,484,624 bytes, 22x over; 381MB of inventory chunks and 22 completion captures are each one document rather than rows, so the entry ceiling does not reach them. Nothing under `pages/` is deleted.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "The level-0 wave is landing, and `akasha/temper` holds 20 parts now, all 66 commands and the Rust tray among them. The gate for some thirty addon packages was ESO's globals, which no akasha file could name. `page-type/type-declaration` carries `file-property/ambient-types` whose section is `d`, so a `.d.ts` keeps the name a compiler reads, and a seat is landing the 41 files. `eso-addon`, `eso-interface` and `lua-module` were made too. The order is forced: packages, then repoint, then teardown.",
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
