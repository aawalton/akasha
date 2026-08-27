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

The evidence is one notes file in the books repository, located by its path and, failing that, by its name anywhere in that tree.

Two files of that name refuse, which of them is the record not being guessable.

Matching is case-insensitive and unanchored, so an incidental occurrence of a token counts as named.

It reads the tokens alone and never the figures beside them.

# Help

Every entry in `RECOVERY_RATES` that Alan's own notes on his recovery never name. Each rate credits capacity-hours per hour to the Health bar, so a token the notes do not carry is a rate being applied to his ledger that his own record of his body does not support. This was `check-recovery-rate-notes-coverage` in the code repository, and it could not stay one: the rate table is code, but the text it is judged against is `all-about-alan/chapters/notes/recovery-rates.md` in the BOOKS repository, reached through `BOOKS_ROOT`. A verdict of that shape moves with a tree no code diff shows — and it did, when `21aee47` in books renamed the file into `chapters/` and left the check refusing on every branch that woke it, with nothing in the code repo to blame or to fix. As an audit it reports and never refuses on a finding: an undocumented rate may want the note written or may want the rate dropped from the table, and only a reading tells which, so the call stays a person's. It refuses at exit 3 where it could not look at all — no books checkout, no notes file anywhere in that tree, or a notes file that reads empty — because a notes file that was never opened must not print like one in which every rate happened to be named. The notes are located at the path above and, failing that, by filename anywhere under the books root, so a move reports where it read rather than refusing; two files of that name refuse, since which is the record cannot be guessed. The reading is a MISSING ENTRY only: it never compares the numbers a note states against the numbers the table holds, which no automatic reading of prose could settle. Matching is case-insensitive and unanchored, so an incidental occurrence of a token counts as documented — the bound, stated (--books-root, --json)
