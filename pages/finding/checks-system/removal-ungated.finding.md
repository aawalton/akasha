---
page-type-slug: finding
title: "A removal reaches disk with no check having run over it"
domain-slug: checks-system
---

# Claim

A removal reaches disk without any check having run over it. `ops write` gates a write by the checks akasha declares, but `read-before-write` returns early where the change set carries no written path, and a call whose only paths are removals carries none. So the one act that cannot be undone is the one act nothing judges.

What a removal escapes is not a formality. Read-before-write exists because a writer who has not read the current file may be landing on top of somebody else's work. A remover who has not read the file is destroying work they cannot describe, and the file is gone at the moment the question could have been asked. Every other write leaves the prior text in git and in the reader's hands; a removal leaves it in git alone, findable only by someone who already knows it existed.

The gap is invisible from the output. A gated write reports the count of checks that weighed it, and a removal reports `0 akasha check(s)` in the same shape and the same green. Nothing distinguishes a change no check applied to from a change every check passed.

# Evidence

`ops write --dry-run --remove <path>` reports `0 akasha check(s) over 1 changed file(s)`, against the same call with a written path reporting one or more. The cause is in the `read-before-write` check, which returns before judging where the written-path list is empty; a call made only of `--remove` entries never reaches its body.

Measured on 2026-08-27 while removing four hook pages and their code from akasha. The eight files were read through `ops read` before the removal regardless, so nothing was lost, and that reading was the remover's own choice rather than anything the tooling required.

A second instance the same evening, reported by nimue.seat: fourteen package pages removed under an explicit instruction to read each one first because the act was irreversible. That reading, and a search of `code-editor` for each page before deletion, were both the seat's judgement. The search came back clean, so nothing was lost there either. Neither guard was the tooling's.

Not measured: whether any check other than `read-before-write` would have applied to a removal had it been reached, so the size of what a removal escapes is unknown beyond that one check. Not measured: whether removals through routes other than `ops write` — `ops rm`, `ops mv` — are gated differently. Not measured: how many removals have landed ungated historically, which git could answer and nothing here asked.
