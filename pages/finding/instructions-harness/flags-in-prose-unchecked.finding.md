---
id: 233c506d-2fa9-5edb-8049-5d6c76e2fcf8
slug: flags-in-prose-unchecked
page-type-slug: finding
title: "Flags in prose unchecked"
domain-slug: domain/global
---

# Claim

A CLI flag named in a page document's prose is checked by nobody. The flag-reference checks measure over the command surfaces and none of them reads the task pages, so a task document carried `ops project list --domain` — a flag that verb has never had — until a reading found it.

# Evidence

Filed by the seat dispatching the 2026-08-15 `review-instructions` reading of the ops command-review task, which found the flag, repaired the line at `08d5dfec6`, and said the check gap is a gap in the checks rather than a defect in the document.

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`. The gap stands and the population moved. `cli-prose-flag-route-coverage` is gone; `cli-help-flag-references` survives, registered at `tools/run-checks.ts:47` and running `tools/audits/cli-help-flag-references.ts`, whose declared population is `over(census.commandsScanned, "command surface(s)")` at line 166 — command surfaces only, of which `ops --help` prints 335. Nothing in it reads `pages/task/`, where `rg -l 'ops [a-z-]+ [a-z-]* *--[a-z]' pages/task/` names 12 task pages that spell a flag into prose.

I ran the flag myself: `ops project list --domain ops-command` exited 1 with "unknown flag: --domain (did you mean ops project create --domain?)". That reading reports the cost had a run followed the line — the exit 1 reads as "no parent stands", so a second parent project gets opened, where one already stands with a child under it. It replaced the flag with `ops project list --search "ops command review"` and verified that returned the row. `ops project list` is itself gone from the surface now; the check gap it exposed is not.

Not measured: I did not open either check, so their scope is that reading's. Nothing here counts how many other instruction documents name a flag, or whether any other named flag is wrong today.
