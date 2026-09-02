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
        "Alan's page-type gap is closed and proven: `temper-companion-skill` gained 53 property pages and two entry shapes, and its 122 pages regenerate 119,803 bytes against 119,824 on disk. The addon-data pipeline is 11 of 12 byte-identical, and the twelfth hides three more — `writes-skills.ts` builds five generator calls in one eager array, so the grimoire throw takes scribed-skill, skill and skill-point down before they run, while the section printed 1/1 byte-identical.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "A content census settled what no name rule could, 93 rows at `scratchpad/ember/PARITY.md`: 49 folders are landed and duplicated, 13 part-landed, 19 outside, 12 outside this migration, and 14 of the 19 are landable today. `shared-interface-hud-addon` is the leverage, since landed packages name TemperHud where akasha holds no such addon. Of teardowns, 38 clear content and none is proven safe. Typecheck is zero over 17,274 roots; the tree holds 99 refusals.",
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
