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
        "Addon-data pipeline: the content is whole and the destinations are dying under us. At `685e1bb6a7` it renders 59 files, 41 SAME, 0 DIFF, 18 ABSENT across 5 dead folders; two hours earlier it was 3 dead and 8 ABSENT, so re-run `ensureAllOutputDirs` rather than trust any number here. Blocked on a port, not a body: `imports-inside` bars akasha from `tools/`, so 3,271 lines and 21 unmigrated generators must land under `akasha/temper` first. Findings `593b76c9d6`, `1c78afe15b`.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Six items packages ablated, confirmed gone at five sites each. 38 packages and 2,291 files remain under `temper/` against 19,421 in akasha, at `75d3c0191e`. `akasha edit` reaches any path; only `akasha write` refuses outside `akasha/`, where no check judges, so a seat's own proof is the whole net. Its record of an outside file is per agent and unrefreshable: hand the call to a fresh agent. The git index emptied for a minute today, so print the denominator — a zero off nothing reads clean.",
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
