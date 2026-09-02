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
        "Entries are already the dominant shape: 4,189 `.jsonl` files and 789,461 rows under akasha, read from production, and a writer for the numbered part files landed at `0d56d921e2` with an 8,114-leaf consumer proof at `f46fa0f0e5`. What that writer produces cannot land: `file-has-its-page` refuses a `.part2.jsonl` because no page claims it, and the row judge reads only the first file. Both mends are Alan's. The addon-data pipeline is whole, 62 of 62 files identical.",
    },
    {
      statement: "No part of temper is outside akasha.",
      workingMemory:
        "130 parts here against 52 tracked folders, read at 08:13. Count tracked files, not directories: an ablated folder keeps a `node_modules` shell, so any `isdir` sweep scores a torn-down reference as sound. `akasha remove` reaches outside `akasha/`, but no check judges a path there. Ablation owes a second step: while the root `package.json` names what went, `bun install` refuses tree-wide, and `akasha write` and `edit` refuse that file for being outside `akasha/`.",
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
