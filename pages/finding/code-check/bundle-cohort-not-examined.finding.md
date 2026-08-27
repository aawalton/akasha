---
id: 9bcd64c8-dd46-5007-b7c4-e3a622495c65
slug: bundle-cohort-not-examined
page-type-slug: finding
title: "Bundle cohort not examined"
domain-slug: domain/global
---

# Claim

The population `check-syntax-bundle` reports is not the population any of its scanners
examined. A file whose read fails drops out of the denominator silently, and a file a
scanner's `preFileSkip` excluded stays in it.

The gate satisfies the first half of Population — it states a size and refuses an empty
cohort — while the number it states overstates coverage in one direction and understates
the tree in the other. Both losses are invisible in a green run.

# Evidence

Run 2026-08-07 against the code repo while ingesting
`dirty/knowledge/readonly-collections.md`, whose own version ("the bundle declares no
population at all") is false today and was cut. `check-syntax-bundle.ts` is the gating
step; the standalones are local-debug only.

**Failed reads leave no trace.** The loop is
`for await (const { rel, source } of iterateTsFiles(...)) { scanned.push(rel); ... }`.
`iterateTsFiles` in `lib/ts-file-iteration.ts` wraps `readFileSync` in
`try { ... } catch { continue }`, its docblock stating: "Failed reads skip silently —
which is the legacy per-check behavior, and the reason a caller that wants its
population counted uses `listTsFiles` with `examineFileCohort` instead."

The bundle does want its population counted — it passes `members: scanned` to
`examineCohort`. But `scanned` is appended only after a successful yield, so an
unreadable file is absent from numerator and denominator alike, reading as though it
were never in the tree rather than as a member that could not be examined.

**Skipped files inflate it.** `scanned.push(rel)` runs before the per-entry loop; the
skip is inside it, `if (entry.preFileSkip?.(rel) === true) continue`. A file excluded
from a scanner still counts toward the cohort printed beside that scanner's verdict.
For `readonly-collections`, whose `preFileSkip` is `isTstlAddonPath`, the whole TSTL
tree counts as scanned while this scanner never opened it.

**Why green hides both.** The summary reads "OK — all N scanners clean over M TS
file(s)". M is identical for every scanner though each has its own skip set, and omits
whatever could not be opened. The file's comment says two denominators exist because
"a count adjacent to a claim reads as the count OF that claim" — the same defect, one
level down at the per-scanner claim.

**The empty cohort is handled.** Lines 168-190 refuse a whole-tree run that scanned
zero, naming Population. That guard fires only at zero.
