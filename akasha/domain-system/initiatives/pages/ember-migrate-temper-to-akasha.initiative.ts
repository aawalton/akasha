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
        "Every temper page type is in akasha, two landed finer than the census read them. The mine's 188MB sweep is 22x the entry ceiling, and the call taken is one entry property spanning numbered files: 24 parts are committed, but the read side is not. `catalog-sidecars.ts:9` skips every part so the addon catalog is silently short, `clearRows` orphaned 13MB, `read-corpus.ts:258` refuses a landing over a part, and akasha's `heldIn` reads a part as a stray.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Typecheck answers zero, from 567, but that is one check of forty: the full audit exits 2 on duplication, so `--check typecheck` is never the answer. An akasha eso-addon still makes no Lua, as `listWorkspaceDirs` throws on `akasha/**` and the resolver wants a literal `addon.json` the grammar bars, so no addon folder goes until that is mended. The shared declaration set answers 11 diagnostics `skipLibCheck` hides, and a check compiling it against itself is being written.",
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
