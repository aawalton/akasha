---
id: 2e882bce-45c7-5862-9123-5ef33d4396ce
slug: persona-add-verbs-declare-exit-1-and-exit-2
page-type-slug: finding
title: "Persona add verbs declare exit 1 and exit 2"
domain-slug: domain/ops-cli
---

# Claim

`ops persona ping add` and `ops persona watch add` each declare exit 1 for a bad flag value and in fact exit 2. The refusals are raised as data errors, not input errors, so the value a caller can fix reports as a row that is not what was asked for.

# Evidence

Found 2026-08-13 by the seat moving the `persona` faucet, ping, totals and watch verb bodies into the instructions repository, reading `ping-add.ts` and `watch-add.ts` before transcribing them.

`ping add` declares `1  input error — missing flag or non-numeric --project`. A non-numeric `--project` raises `DataError`, which `exitCodeForThrowable` classifies as exit 2. Measured: `ops persona ping add athena --project notanumber` exits 2, printing `--project must be a positive integer seq, got "notanumber"`.

`watch add` declares `1  input error — missing required flag or bad --mechanism`. A `--mechanism` the enum refuses raises `DataError` the same way. Measured: `ops persona watch add athena --label x --target y --mechanism nonsense` exits 2, printing `invalid --mechanism "nonsense" (expected event | wall-clock | message)`.

The other half of each declared line is correct: a genuinely missing required flag is caught by the parser and does exit 1. So one declared code covers two refusals that exit differently, and only the parser's half matches.

What makes it worth filing rather than fixing in place: the bodies were moved byte-identical in behaviour, and the help blocks were left exactly as found, because a repair made while moving a body cannot be told from the move. Both ends therefore still agree with each other and both are wrong in the same way. Which side should move is a judgement — the exits could be redeclared as 2, or the raisers changed to input errors — and changing the raiser changes what a caller's script sees.
