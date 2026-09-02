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
        "The addon-data pipeline is whole at last: twelve sections, 48 files, 47 byte-identical, and the 48th differs by one banner line because the generator moved and the pipeline had never run. The eager array that hid three generators behind one throw is fixed, so a throw names one file rather than stopping four. Alan's page-type gap stays closed: 122 companion-skill pages regenerate 119,803 bytes against 119,824.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Typecheck broke from zero to 53 over nine packages: `craft-decl-controls` gives the merged `Control` its own data type, so every neighbour's control subtype is refused. Taking it out gives 84, all inside crafting, and that is the repair. The Lua wall is down: 13 of 16 landed addons build a bundle, three fail on TS90002 of their own, one stops at the XML copy. Alan approved both checks and ruled no ESO library vendored, so all of them migrate.",
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
