---
id: 4b6eff03-2ae8-501b-be80-efebaf67bfbc
slug: verbs-retired-without-a-record
page-type-slug: finding
title: "Verbs retired without a record"
domain-slug: domain/ops-cli
---

# Claim

Seven `ops` verbs stopped answering with no record anywhere that they were retired or renamed, and nothing in the repository can detect that. `tools/commands-retired.txt` is kept by hand, so a verb that stops being declared leaves no trace — and the dispatcher answers an unknown verb with its whole command list rather than a refusal, so the loss renders as ordinary help output. Only a captured baseline of every verb's help finds these, and no such baseline stands anywhere durable.

# Evidence

A sweep rendered `--help` for all 762 verbs held in a baseline captured at instructions `3e2323eb8`, against the tree at `c33a7c828`. Every one rendered something. 62 helps had moved, and 16 verbs no longer answer at all.

Nine of the sixteen are recorded in `tools/commands-retired.txt` — `agent interactive-census`, `agent interactive-verdict`, `inbox-tracking restart`, `inbox-tracking start`, `inbox-tracking stop`, `loki kernel-selftest`, `voice restart`, `voice start`, `voice stop`.

Seven are recorded nowhere:

- `persona faucet apply`, `backfill`, `check`, `replay` and `rescore`, all renamed to `persona points-source <same verb>`, which answer today.
- `check-enricher-barrel`, renamed to `check-deriver-barrel` at `8c30bed1c`, whose message says the barrel command follows the code's rename.
- `instructions review-checks`, whose tool was removed at `79ec7229a` with `tools/run-checks.ts` standing in its place.

Every one was deliberate and every one has a live successor. Nothing here is a verb lost by accident — what is missing is the record a caller would need to find the successor.

That matters because a caller naming a retired verb does not fail loudly. The dispatcher prints its command list and exits, which is how `move-to-local-daemons.ts` has gone on spawning `ops voice restart` on every deploy since `45a18d080` while the deploy's own verdicts pass.

Two things kept this invisible. A rename hides best: the namespace still answers, the sibling verbs still answer, and only the exact retired spelling is gone. And `tools/commands-retired.txt` is written by whoever remembers to write it, so it records the retirements somebody thought to record and is silent about the rest by construction — it cannot report its own gaps.

The sweep that found these is `verb-surface-diff.sh` with a baseline of 762 captured renders. Both stand under `/var/tmp`, which is scratch, so the only instrument that sees this class is one nothing preserves.
