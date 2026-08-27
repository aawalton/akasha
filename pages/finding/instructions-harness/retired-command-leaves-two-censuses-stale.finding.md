---
id: 8df1956a-c12f-5408-9926-72ba926aba8f
slug: retired-command-leaves-two-censuses-stale
page-type-slug: finding
title: "Retiring a command leaves two censuses stale and only one has a route back"
domain-slug: domain/global
---

# Claim

`run-checks` fails on `verdict-coverage` and `cli-prose-flag-route-coverage` after a command is retired. The first names its own remedy and has a worked precedent. The second says to regenerate a census that nothing in the repository can generate.

# Evidence

Seen at 2026-08-17 20:40. `run-checks` exits 1 with those two failures and no others.

Commit `704f6b2b1` retired the boot digest and the persona ping and watch commands fourteen minutes earlier, removing seven commands and their documents. The command list went from 788 to 781. Both failures name exactly the seven that left.

`verdict-coverage` reports them as entries under `pendingClassification` naming commands no longer carried, and states the remedy itself: remove the entry, or declare the command. Commit `13a20468c` is the worked precedent, doing exactly that for two retired `awen` commands, touching `tools/lib/verdict-coverage-pending.txt` and nothing else.

`cli-prose-flag-route-coverage` reports `tools/lib/prose-flags-by-command.json` and `tools/lib/prose-flag-routes.json` as STALE, covering 153 of the 150 command-flag pairs now declaring prose, and says to regenerate them from the command list they were taken from.

Nothing regenerates them. A sweep of the whole repository for either filename returns two lines, both in `tools/lib/cli-prose-flag-route-coverage.ts`, and both are the path constants the check reads them through. There is no writer, no `--fix`, and no command that emits either file. So the remedy names an act the corpus does not offer, and whoever repairs it composes the census by hand against 781 commands.

The pairing is what makes this worth recording rather than either half alone. Retiring a command is routine and its census fallout is not stated where the retiring agent will meet it, so the two checks fail together every time and the repair is only half available.

I did not land the `verdict-coverage` half. Writing to that file requires a reading on record for each coined word among the 716 command names it lists, taken one refusal at a time, and a half repair leaves `run-checks` red either way.
