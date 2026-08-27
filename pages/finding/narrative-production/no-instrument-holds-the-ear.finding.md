---
id: 1778e182-31e3-5b54-98aa-d864f6a691ab
slug: no-instrument-holds-the-ear
page-type-slug: finding
title: "No instrument holds the ear"
domain-slug: domain/narrative-production
---

# Claim

Nothing measures whether narrated audio meets Alan's ear. `lint-audio` is the only lint in the story CLI, and it is a round-trip TEXT-RECOVERY gate: green says the words came back, never that the prosody did.

# Evidence

`packages/stories/cli/src/story/` holds one lint, `lint-audio.ts`, beside `enqueue-narration.ts`, `prerender-audio.ts` and `prerender-image.ts`; `src/lib/` holds `audio-lint.ts` and `audio-lint-core.ts` and nothing prosodic. Its own help calls it "Round-trip TEXT-RECOVERY linter" detecting "the GROSS generation-failure classes — dropped segments, TTS repeats/hallucination, truncation, garble — not pronunciation nits".

`AUDIO_LINT_DEFAULT_THRESHOLD = 0.35` at `audio-lint-core.ts:46` is set from a measured WER distribution with clean segments at or under 0.12 and gross failures at 0.92-0.95, chosen inside that gap so it flags "never the clean or boundary-noise tiers". A chapter that is intelligible and badly read scores clean and exits 0.

The gap has already shipped once in the other direction: the `MAX_SEGMENT_INSERTIONS` docblock records that a 30-88-word echo block scored WER 0.16-0.31 and "survived the per-segment gate into the shipped Apology/Crito renders" (#15102). That repair was defect-shaped and closed one insertion class; no comparable gate stands over prosody.

Searched `~/memory/findings/` for `prosod|lint-audio|narration|the ear`, multiline, case-insensitive, via the Grep tool: 15 files, none about this instrument. There is no `findings/narrative-production/` directory.
