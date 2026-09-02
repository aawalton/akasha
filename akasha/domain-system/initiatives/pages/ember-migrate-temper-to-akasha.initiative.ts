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
        "Six page types are short and only two are temper's: `temper-net-worth-day` at 94 pages and `temper-completed-month` at 6, and a seat has both. The `item`, `game`, `condition` and `collection-type` folders carry other domains' worlds, so they fall outside this initiative. 6,363 temper pages are in akasha against 6,751 source files. One wall is left: the `eso` mine's `items`, 188,484,624 bytes shaped, 22x the entry ceiling, no shard that fits, and three consumers reading it.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "A package moves once its dependencies are in akasha, whether or not the source is gone. Thirty addon packages, six catalog collectors, four ESO libraries and LibGPS all wait on one shared set of ESO declarations; thirteen seats each wrote their own, and the collision answers 245 refusals at audit, so one seat owns deleting all thirteen. The write-time typecheck now compiles every declaration file, so a fourteenth cannot land. Teardown is proven many times over.",
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
