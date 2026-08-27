---
id: 07a51a14-41a0-5a4e-9a79-51b67ea4cbda
page-type-slug: finding
title: "Disabled list and refusal spell differently"
domain-slug: page-type/refusal
---

# Claim

`refusals/disabled-hook-registered.md` and `refusals/disabled-hook-unresolved.md` fill `{path}` with a repository-rooted path, while `domains/lists/disabled-hooks.md` — the document they send the reader to — bullets bare script names, so a reader searching that list for the string the refusal printed finds nothing.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/disabled-hook-registered.md` dispatched from `review-documents`. The reading kept the line and flagged the shape; the list was read here.

`domains/lists/disabled-hooks.md` holds one member today: "**block-interactive-stall.sh** — Alan's, 2026-08-10, until an attended turn-end can be judged without refusing him mid-turn." The handle is the bare script name.

The refusals fill `{path}` from the check, and `tools/document/schemas/refusal.ts` demands every path a refusal names be spelled from the repository root, so the two spellings cannot both be used in one place without one of them breaking a rule.

The reading kept it deliberately: the rooted path is the handle the rest of `tools/checks/hooks-registered.ts` uses, and it locates the two files the reader must edit, where a bare name locates neither.

It reaches two documents rather than one, so whoever settles it settles both.

Not measured: whether any reader has actually searched the list and missed, or how other list documents in the corpus spell a handle that a refusal also prints.
