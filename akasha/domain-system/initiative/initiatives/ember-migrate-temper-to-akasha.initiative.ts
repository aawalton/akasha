import type { Initiative } from "../initiative.page-type.ts"

export const emberMigrateTemperToAkasha = {
  id: "01a05d98-bb3e-723e-bb49-4b57786306a0",
  pageTypeSlug: "initiative",
  slug: "ember-migrate-temper-to-akasha",
  domainSlug: "domain/akasha-migration",
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
  ],
  constraints: ["The entries work lands in pages-system rather than under temper."],
} as const satisfies Initiative
