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
      statement: "The index says what the pages say.",
      workingMemory:
        "Fixed 2026-09-01 in 6baad44f. The import index keys an edge by the path a specifier resolves to, so a manifest moving that landing stranded every importer outside the change. `rereadOver` in `package-reaching` reads the naming as it was, finds the specifiers that moved, and reads their importers off the index for `settlingOver` to file. A withdrawal is read against the naming as it was rather than the one the change leaves. No index test fails and drift is zero, but no move has run since.",
    },
    {
      statement: "A reminder is an akasha page, and the service sending it reads it there.",
      workingMemory:
        "The old `reminder` extends `message`, adds `schedule` written as systemd states a calendar, and holds its text in a body slot. One reminder exists, amy's, at `*:0/15`, with `next-at` uncommitted beside it. An akasha page has no body, so the text becomes a property. `message` is not in akasha and carrying it across is the whole messaging system, so reminder extends `page` and a finding records what that leaves. 450 lines follow: `send-due-reminders`, `reminder-file`, `reminder set|list|drop`.",
    },
    {
      statement:
        "An entry is a page property shape extending `page-property-entry` rather than a page.",
      workingMemory:
        "Settled with Alan. An entry has no slug and no page type of its own; `page-property-entry` extends `page-property`, and each entry shape extends that. The old system holds 67 entry properties over 44 shapes, none of which has a page file; `reference` serves 13 and `temper-metric-effect` 9. 11,740 JSONL files hold 5,653,899 entries, each named `<slug>.<page-type>.<key>.jsonl` beside its page. The old index holds no entry. `append-only` and `uncommitted` are each used once of the 67.",
    },
    {
      statement:
        "A declaration carrying many values says `entries` and keeps each value in a JSONL beside the page.",
    },
    {
      statement:
        "Every entry carries an id, and a write works one out for each entry whose body arrives without it.",
    },
    {
      statement:
        "Temper is a domain in akasha, and everything temper keeps is a page or an entry there.",
      workingMemory:
        "`akasha/temper` holds one file, the domain page. Outside it: the `temper/` workspace of 151 packages over 10,545 files, 99 page types under `pages/temper-*` over 6,464 files, of which 5,557 are pages and 252 are JSONL holding 164,071 entries, plus `tools/lib/temper-addon-data` and two watcher services. 12,252 files name temper repo-wide. No page type of the 99 is defined anywhere; its shape lives in md frontmatter and in whatever reads it, so each is worked out rather than carried across.",
    },
    { statement: "No part of temper is outside akasha." },
    {
      statement: "Every landing names its change kind.",
      workingMemory:
        "Only write and edit run the gate. `calling` reads the `mechanical` boolean off the command page and hands `mechanical` down, which sets NO_GATE. `seat-stating`, `subagent-presence` and the oauth pair in `tools/lib` land through `landedMechanically` in `asking`, the one caller a program lands through. Nothing outside akasha shells out to `akasha write` any more. What is left is the boolean itself, which a relation to a change kind replaces.",
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
