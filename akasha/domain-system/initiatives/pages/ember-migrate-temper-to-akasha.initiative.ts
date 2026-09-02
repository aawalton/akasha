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
        "Addon-data pipeline: the content is whole and only the destinations are dead. Driven with a comparing writer at `91c542fe84` it renders 59 files, 51 SAME, 0 DIFF, 8 ABSENT, and the 8 aim at the three ablated folders. The guard is 14 rows and 3 orphans, not 15 and 2. Blocked on a port rather than a body: `imports-inside` bars akasha from `tools/`, so 3,271 lines and 21 unmigrated generators must land under `akasha/temper` first. Findings `7bd0f5c6fc` and `1c78afe15b`.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "Ablation is the bottleneck, not recreation. `akasha edit` reaches any repository path since `01d263ef66`, and only `akasha write` still refuses outside `akasha/` — where no check judges anything, so a seat's own proof is the whole safety net. `akasha edit` holds a per-agent record of each outside file it wrote and refuses once a sibling touches it, with nothing able to refresh it; hand the call to a fresh agent. Landed akasha code imports `@temper/` three times in two files, all `game-codec`.",
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
