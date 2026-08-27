---
id: 233c506d-2fa9-5edb-8049-5d6c76e2fcf8
page-type-slug: finding
title: "Flags in prose unchecked"
domain-slug: domain/global
---

# Claim

A CLI flag named in an instruction document's prose is checked by nobody. `cli-help-flag-references` and `cli-prose-flag-route-coverage` both measure over the 757 command surfaces under `tools/commands/` and neither reads `domains/tasks/**`, so `domains/tasks/ops/review-command.md` carried `ops project list --domain` — a flag that verb has never had — until a reading found it.

# Evidence

Filed by the seat dispatching the 2026-08-15 `review-instructions` reading of `domains/tasks/ops/review-command.md`, which found the flag, repaired the line at `08d5dfec6`, and said the check gap is a gap in the checks rather than a defect in the document.

I ran the flag myself: `ops project list --domain ops-command` exits 1 with "unknown flag: --domain (did you mean ops project create --domain?)". That reading reports the cost had a run followed the line — the exit 1 reads as "no parent stands", so a second parent project gets opened, where #19149 already stands with a child under it. It replaced the flag with `ops project list --search "ops command review"` and verified that returns the row.

It deliberately wrote no seq into the line, `domains/repos/instructions-repo.md` **One-Way Citation** forbidding the instructions repo naming a particular memory document.

Not measured: I did not open either check, so their scope is that reading's. Nothing here counts how many other instruction documents name a flag, or whether any other named flag is wrong today.
