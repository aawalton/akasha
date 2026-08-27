---
id: 0b1a44f4-2015-5779-94c9-4a1532132618
page-type-slug: finding
title: "Illustration ships ungated"
domain-slug: domain/narrative-production
---

# Claim

Illustration ships with no gate over it. `ops story prerender-image` generates a chapter cover and sets the chapter's `cover` url on a head-check alone, so an off-tone cover reaches the reader the same way a good one does.

# Evidence

`packages/stories/cli/src/story/prerender-image.ts` is registered in `registry.ts` as "Generate & cache a landscape cover image for a chapter (Z-Image-Turbo) in the object store and set the chapter's `cover` url; idempotent head-check skip." Its only stated skip is that head-check: "a head-check on the stable object key skips a chapter whose cover already exists". Grepping the file for `lint|verify|score|check` returns two lines, one a comment about a fast-fail input pre-check and one the head-check. Its `exits` are 2 (input/data) and 3 (object store unavailable or generation failure); there is no lint exit.

Audio is in a different state, which is what makes this a separate observation from `no-instrument-holds-the-ear`. `prerender-audio --verify` is a "per-segment generate-and-verify gate: render each segment, transcribe just that segment, score its WER against its known text, and re-render (bounded retries) any segment over --threshold — so the concatenated chapter is clean by construction", exiting 4 when a segment cannot come clean, and `lint-audio` stands over the result. Illustration has neither.

Searched `~/memory/findings/` for `prerender-image|cover image|illustration|Z-Image` (Grep tool, multiline, case-insensitive): no matches.
