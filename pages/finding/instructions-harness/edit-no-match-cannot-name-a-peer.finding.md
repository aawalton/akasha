---
id: bd64c1b1-a135-5acc-943e-0c9e16759282
slug: edit-no-match-cannot-name-a-peer
page-type-slug: finding
title: "Edit no match cannot name a peer"
domain-slug: domain/global
---

# Claim

`ops instructions edit` matches every pair before any gate fires, so a peer's landing on the same passage arrives as `edit N has no match — the body is not what you thought it was` with an excerpt of the caller's own `old_string` and nothing about what the body now says. That is byte-identical to what a mis-transcribed `old_string` earns, and the recovery a mis-transcription wants — re-derive the string and apply the decision again — overwrites the peer's decision, with every gate green either way.

# Evidence

Measured rather than taken from a report. `tools/edit.ts:236` calls `prepare(instructions, roots)` and `:242` calls `runGates(...)`, in that order, so pair matching precedes `read-before-write` and every other gate. `:169` is the refusal, and the excerpt it carries is of the caller's own input, so nothing in the message separates a body the caller mistyped from a body another seat rewrote. No diff, commit or author is named.

`bun tools/edit.ts --help` states the surrounding contract: "Each pair must match UNIQUELY: zero matches refuses (the body is not what you thought)", and "Every refusal names the file as well as the pair". The file is named; the mover is not.

The nearest standing advice points the wrong way here. `tools/lib/unread.ts:138` and `tools/gates/read-before-write.ts:89` both close with "Then make the change again" — right for an unread governing document, and read as licence to re-transcribe when it is a peer's edit that moved the body.

Observed by an archivist seat emptying `dirty/questions/instructions-review-concurrency.md`, one of roughly forty running `ingest-instructions` against this repo at once. A quarantined question document recorded the same behaviour from a reading where three pairs went in one call, two were refused, and a peer had landed `94d2bb03`, `f832b53d` and `a39691e9` in the twenty-four seconds before. That record is queued for removal, which is why this is filed here.

Distinct from `edit-leaves-a-write-uncommitted-on-index-contention.md`, the exit-3 path where the write lands and the commit does not. This one refuses cleanly; the cost is in what the caller does next.

Not measured: how often a no-match refusal here is a peer rather than a typo.

Not judged: whether the repair is naming the mover, printing what the body now says, or wording the refusal so it stops implying the caller's transcription.
