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
        "The addon-data pipeline is whole: twelve sections, 62 of 62 files identical, none absent and none thrown. A throw seeded into the second section used to leave one section reaching the writer and no mapping generator built at all; each generator now fails alone and names itself. Alan's page-type gap stays closed, with 122 companion-skill pages regenerating 119,803 bytes against 119,824.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "124 parts on this domain's page against 64 folders left in `temper/`; typecheck is 1, and it is LibSets' own missing `LibZone` global, the crafting lift having taken the other four. The read record has no expiry: a sibling subagent's startup deletes it for every seat at once, so fanning out is what breaks the write gate. Six dist gates take their denominator from what a build managed to write, so a build that stops early reads green.",
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
