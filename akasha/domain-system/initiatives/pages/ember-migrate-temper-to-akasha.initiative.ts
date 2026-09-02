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
        "Alan's page-type gap is closed: `temper-companion-skill` gained 53 property pages and two entry shapes, and its 122 pages hold all 436 effects and 27 cast conditions, regenerating to 119,803 bytes against 119,824 on disk. Addon-data's invocation is settled — its entry is called, never loaded — and 11 of its 12 sections emit byte-identical; only skills throws, on grimoire order. Alan took the companion sections out of that pipeline. A bridge decoding no json drifted 1,636 rows.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "110 packages in `akasha/temper`, 93 in `temper/`, but no name rule tells a duplicate from a gap — `game-characters-skills` landed as `temper-character-skills` — so a content census is running. Every teardown is unsafe: copy-metadata swaps 3,137 bytes of keybinds for 22 when the file is not where akasha holds it, exposing six addons. Typecheck went 45 to 1, all one defect: a library's private copy of a game global against a narrower shared one.",
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
