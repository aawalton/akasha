---
id: a908f336-bbe5-5f75-b7e9-2760fc08ba93
slug: exit-codes-are-a-scheme-no-document-states
page-type-slug: finding
title: "Exit codes are a scheme no document states"
domain-slug: page-type/old-ops-command
---

# Claim

The ops surface runs a stable four-code exit scheme — 0 success, 1 input error, 2 not found or bad data, 3 operational error — and no document in the corpus states it.

# Evidence

Measured 2026-08-15, running `review-command` on `ops ali coverage`.

717 command files stand under `tools/commands/`. 443 declare an `exits:` list. Across them `code: 0` appears 245 times, `code: 1` 232, `code: 2` 221, `code: 3` 228, `code: 4` 9, and `code: 128` once. The four low codes are within 11% of each other, so this is one scheme rather than a habit some verbs picked up.

The meanings agree as well. On code 1 the exact string "input error" is spelled 117 times of 232; on code 3, "operational error" 98 times of 228. Code 2 is the not-found slot: "data error" 24 times, and the rest name the particular thing that was missing — "persona not found", "no buy rule with that id", "rule with the given id was not found".

The agreement is enforced by shared code, not by an instruction. `tools/lib/code-errors.ts` supplies `inputError` and `operationalError`, and every one of the six `ali` verbs funnels its throws through them. A verb whose author does not reach for those helpers has nothing to read that would tell them the scheme.

Searching `domains/*.md`, `page-types/*.md` and `properties/` for any statement of an exit code returns nothing. `page-types/ops-command.md` states what a command declares about itself and does not reach exit codes; `domains/command.md` carries one Design line about repeating problems.

This matters now rather than later because the help block is migrating into the command documents, which turns `exits` from a code literal into schema.

Not measured: whether the 9 uses of code 4 and the single 128 are deliberate, and what the 274 files declaring no `exits:` list do instead.
