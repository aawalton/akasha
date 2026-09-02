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
        "Every temper page type is in akasha; two the census read as short are landed finer, `temper-net-worth-day` as net-worth-hours with 3,395 readings equal and `temper-completed-month` as completed-days with 1,425 ids identical. `item`, `game` and `collection-type` are other domains'. Both watcher writers land at those grains, replayed byte for byte; none reaches the snapshot stacks grain. The mine's 188MB sweep is 22x the entry ceiling; the call taken is one entry property spanning numbered files.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "The declarations wall is down: typecheck answers zero, from 567. Three of the thirteen modules were wholly removable, the rest trimmed, and the shared set is self-consistent, so the ESO gate is open and a new addon package lands. But an akasha eso-addon still makes no Lua: `listWorkspaceDirs` throws on `akasha/**` and the resolver wants a literal `addon.json` the grammar bars, so no addon folder goes until that is mended. The seven `-ui` packages keep to `temper/web`, as `@shared/*` bars them.",
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
