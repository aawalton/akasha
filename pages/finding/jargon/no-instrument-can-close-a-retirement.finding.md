---
id: fd76d4d2-213f-5ee3-b533-3c4fa1d6e9c2
slug: no-instrument-can-close-a-retirement
page-type-slug: finding
title: "No instrument can close a retirement"
domain-slug: barred-meaning/jargon
---

# Claim

No instrument in this system can say whether a retirement is finished. `tools/retired-words.ts` matches substrings, so it counts `credit` as `red` and `useState` as `estate`; the whole-word search every seat reaches for instead uses `\b`, which cannot see a match beside an underscore and so misses `ESTATE_COST_NOTE` and `poi_estate_*`. One over-reports and the other under-reports, neither classifies by sense, and the objective that says a retired word is gone from the code repo rests on both.

# Evidence

Four independent corrections in one night, each made by the delivering seat rather than by the record.

- #18049, `pass`. Recorded as the tool reporting 170 `red` sites across 77 documents when the true whole-word count was two.
- #18082, `door`. Recorded as roughly 54 lines over 17 files; actually 104 over the same 17 — the file count right, the line count half.
- #18074, `floor`. Recorded as "about twenty-eight comments" plus one module; actually 172 across 40 files, in six packages the record never named.
- #18075, `estate`. Recorded as 395 over 231 files; the seat's `\b` search gave 506 over 239 and was itself a floor, `ESTATE_COST_NOTE` never matching because `_` is a word character. At `[^a-zA-Z]` boundaries the deployed residue is 91, and my own recount agreed only after I made the same boundary correction.

The last matters most: both readings were wrong in opposite directions, and neither party noticed until a delegate read a file rather than searching it.

RUN TONIGHT, after three sweeps landed: the tool reports 29 retired words "still written somewhere" — `red` at 74 live-document sites, `cut` at 33, `pin` at 31, `pass` at 24. Its own header says sites are candidates and never violations, and that an irregular form sharing no substring with its slug is invisible to it. So a clean run cannot be told from a blind one, nor a dirty run from a false positive.

A THIRD BLINDNESS, found verifying #18075: ripgrep skips dot-directories, so every `rg` measurement over a tree is blind to `.config` and below. Two live sites hid there through a whole sweep and its verification; `git grep` over tracked paths is not fooled. Separately `rg -E` is `--encoding`, not extended-regex, and fails to stderr, so a suppressed stderr reads as clean.

WHERE THIS STANDS ON 2026-08-27. `tools/retired-words.ts` is gone and nothing replaced it: no tracked TypeScript file reads the retirement vocabulary, and no `ops` command counts its sites. Retired words are `pages/barred-meaning/*.barred-meaning.md` now, 62 of them, and the claim's title is truer than when it was filed — there is no instrument at all, rather than two that disagree. The third blindness survives verbatim: `rg -E` is still `--encoding`, which this run hit as `error parsing flag -E: grep config error: unknown encoding`.

WHAT I DID NOT MEASURE. I attempted no sense-classifying count across both repos, so I cannot say how much of the twenty-nine is genuinely swept. I did not check whether each figure came from the tool or by hand; some were delegate reports recorded as fact, a different fault.
