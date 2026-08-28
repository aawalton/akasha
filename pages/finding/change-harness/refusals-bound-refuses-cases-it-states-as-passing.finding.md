---
id: 3bda11cc-00d0-4c11-a1dc-29095f799d04
slug: refusals-bound-refuses-cases-it-states-as-passing
page-type-slug: finding
title: "Refusals bound refuses cases it states as passing"
domain-slug: domain/change-harness
---

# Claim

`tools/tests/refusals-bound.test.ts` stands red on main: 12 of its 19 cases fail, and every one of them is a case asserting `pass`. The audit refuses pairs the suite states as well formed. Nothing runs this file automatically, it carrying no `on-demand` suffix but sitting outside the named suites, so it can stand red without anyone seeing it.

The failures come in two shapes. Five throw out of `tools/lib/refusal.ts:25` before reaching an assertion, and seven reach one and read `fail` where `pass` was expected. The five that throw are exactly the five cases that never call the suite's own `ownWords()` helper, so the audit's own refusal documents are not in the temporary root it is pointed at; the audit then needs to print one and cannot.

The message those five print misdirects. `tools/lib/refusal.ts:23` is `pageFileIn(instructionsRoot, dir, slug) ?? `${dir}/${slug}.md``, so where the document is absent it falls back to a path carrying no page-type suffix and reports `pages/refusal/refusal-slug-not-literal.md is not there`. No file of that name has ever stood; the document is `refusal-slug-not-literal.refusal.md`, and a reader who checks the named path finds nothing and concludes the page is missing rather than that the root is wrong. This is not a suffix-resolution defect — `pageFileIn` resolves the suffix correctly against a root that holds the file, and `placeDirOf("refusal")` answers `pages/refusal` — it is a fallback that names a candidate never looked for.

Why the seven others refuse is not settled here.

# Evidence

Found while establishing whether a change to the read record had broken this suite; it had not, and the suite was already red. Measured 2026-08-28 against akasha at `fdf390a31`, and again in a worktree at `a45426a87`, the commit before that change: 7 pass, 12 fail, 19 cases, at both. Two consecutive runs at the head gave the same 12, so the failures are not timing.

`placeDirOf("refusal")` returns `pages/refusal`, run directly. `pages/refusal/refusal-slug-not-literal.refusal.md` stands on disk. The five throwing cases are at lines 72, 89, 94, 113 and 135, and the ten `ownWords()` calls sit at lines 78, 84, 102, 108, 122, 129, 142, 153, 161, 168, 181, 187, 193 and 199 — none of them in those five.
