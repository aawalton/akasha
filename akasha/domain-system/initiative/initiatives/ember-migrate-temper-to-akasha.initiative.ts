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
        "An entry is the shape of a page property rather than a page, and every entry shape extends `page-property-entry`.",
      workingMemory:
        "Settled with Alan. An entry has no slug and no page type of its own; `page-property-entry` extends `page-property`, and each entry shape extends that. The old system holds 67 entry properties over 44 shapes, none of which has a page file; `reference` serves 13 and `temper-metric-effect` 9. 11,740 JSONL files hold 5,653,899 entries, each named `<slug>.<page-type>.<key>.jsonl` beside its page. The old index holds no entry. `append-only` and `uncommitted` are each used once of the 67.",
    },
    {
      statement:
        "A declaration carrying many says `entries`, and what it carries is kept one to a line in a JSONL beside the page.",
    },
    {
      statement:
        "Every entry carries an id, and a write works one out for each entry whose body arrives without it.",
    },
    {
      statement:
        "Temper is a domain in akasha, and everything temper keeps is a page or an entry there.",
    },
    { statement: "No part of temper is outside akasha." },
    {
      statement: "Every landing names its change kind.",
      workingMemory:
        "Six commands land tracked commits: write, edit, move, refactor, remove and seat. `calling` reads the `mechanical` boolean off the command page and hands `programmatic` down, which sets NO_GATE. `subagent-presence` and `seat-stating` reach `landingAsked` with no command between them and it, so nothing names their kind. The `mechanical` boolean is the stopgap a relation to a change kind replaces, and `programmatic` is the bypass it replaces.",
    },
    {
      statement: "The index says what the pages say.",
      workingMemory:
        "`akasha index refresh --dry-run` reports the index drifted from the pages: 1 file changed and 4 files taken away, where twenty minutes earlier it was 3 taken away. Landings happened in between, so the incremental update inside the landing lock leaks an entry. Nothing was interleaved, so this is no ordering fault. The index is 66MB and a full rebuild costs 2.86s. Callers trust the index, so the root cause is fixed rather than the drift swept.",
    },
  ],
  constraints: [
    "The entries work lands in pages-system rather than under temper.",
    "Every part of temper migrated into akasha lands under `akasha/temper`.",
    "The intent stack and its working memory hold where the work is, so a fresh context resumes from the page rather than from what it remembers.",
    "Work never halts on doubt: a finding is filed, a decision is made, and the work goes on.",
    "Changes swarm across as many as twenty agents, and the akasha commands are left to settle what collides.",
    "Every change goes through an akasha command, and a command that cannot do what is needed is enhanced or written rather than bypassed.",
    "A reminder every fifteen minutes restates these constraints and says to keep going.",
  ],
} as const satisfies Initiative
