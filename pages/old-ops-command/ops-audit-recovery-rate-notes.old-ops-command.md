---
id: 936d5254-e559-5f87-a082-439ba6a8faad
page-type-slug: old-ops-command
title: "Ops audit recovery-rate-notes"
slug: ops-audit-recovery-rate-notes
domain-parent-slug: domain/ops-audit
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/audit/recovery-rate-notes.ts
path: audit recovery-rate-notes
---

# Definition

- **Ops audit recovery-rate-notes** — every recovery rate Alan's own notes on his recovery never name.

# Design

The evidence is one notes file in akasha, found by its path or, failing that, by its name anywhere in that tree.

Two files of that name refuse, which of them is the record not being guessable.

Matching is case-insensitive and unanchored, so an incidental occurrence of a token counts as named.

It reads the tokens alone and never the figures beside them.

# Help

Every entry in `RECOVERY_RATES` that Alan's own notes on his recovery never name. Each rate credits capacity-hours per hour to the Health bar, so a token the notes do not carry is a rate being applied to his ledger that his own record of his body does not support. This was `check-recovery-rate-notes-coverage`, and it could not stay one: the rate table is code and the text it is judged against is prose, and the two then stood in separate repositories, so the verdict moved with a tree no code diff showed — and it did, when a rename in books left the check refusing on every branch that woke it, with nothing in the tree under test to blame or to fix. Both stand in akasha now: the table at `tools/lib/daily-tracking/recovery-rates.ts`, the notes at `pages/book-chapter/all-about-alan/notes/recovery-rates.book-chapter.md`, and the root read defaults to akasha. As an audit it reports and never refuses on a finding: an undocumented rate may want the note written or may want the rate dropped from the table, and only a reading tells which, so the call stays a person's. It refuses at exit 3 where it could not look at all — no checkout at the root named, no notes file anywhere in that tree, or a notes file that reads empty — because a notes file that was never opened must not print like one in which every rate happened to be named. The notes are located at the path above and, failing that, by filename anywhere under that root, so a move reports where it read rather than refusing; two files of that name refuse, since which is the record cannot be guessed. The reading is a MISSING ENTRY only: it never compares the numbers a note states against the numbers the table holds, which no automatic reading of prose could settle. Matching is case-insensitive and unanchored, so an incidental occurrence of a token counts as documented — the bound, stated (--books-root, --json)
