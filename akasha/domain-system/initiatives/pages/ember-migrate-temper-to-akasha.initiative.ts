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
        "Every temper page type is in akasha, two landed finer than the census read them. The mine's 188MB sweep is 22x the entry ceiling, and the call taken is one entry property spanning numbered files. Akasha holds a part now and the spelling sits in one place, but the consumer side is still losing data: `catalog-sidecars.ts:9` matches `[a-z-]+`, so every part fails and the addon catalog is silently short. `clearRows` orphaned 13MB, and `read-corpus.ts:258` refuses a landing over a part.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "85 packages are in `akasha/temper`. What remains is mostly four addons: 4.3MB over 658 modules, 97.6% hand-written, so the generated-output ruling reaches 0.33% and there is no shortcut. Eight XML files are over the 15,000 ceiling, `TemperCombat.xml` at eleven times it. An akasha eso-addon still makes no Lua. Typecheck answers zero, from 567, but that is one check of forty and the full audit exits 2, so `--check typecheck` is never the answer.",
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
