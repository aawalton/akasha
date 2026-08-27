---
id: 5d9c2611-ecf8-52b3-8776-08fb522b0b69
slug: chapter-progress-key-is-camelcase-and-a-kebab-sweep-zeroes-it
page-type-slug: finding
title: "The chapter progress key is camelCase in all three layers and a kebab sweep would silently zero Alan's reading"
domain-slug: domain/alan-harness
---

# Claim

`ownProgress` is spelled camelCase in the property document, in every chapter file, and in the constant the reconciler queries with. All three agree, so the sum answers correctly today, while kebab is settled fleet-wide elsewhere.

Kebabizing any one of the three layers would not fail. The sum returns null over a non-empty corpus, and until 2026-08-20 that was written onto Alan's record as nought words read. The direction and this cluster's correct spelling point opposite ways.

# Evidence

Measured on 2026-08-20 by running against the live page query service on port 8787, not by reading.

The three layers, each read first-hand:

- `instructions:properties/collection-own-progress.md` declares `key: ownProgress`.
- Every chapter file under `stories:` spells `ownProgress`. A search for `own-progress` across the stories repository returns no file.
- `packages/alanwalton/nova-words-read/src/aggregate.ts:8` sets `CHAPTER_PROGRESS_KEY = "ownProgress"`.

Four spellings put through `askComposed` with `function: sum` against `story-chapter-royal-road`:

    ownProgress       n=17709  value=20316978  over=6426  absent=null
    own-progress      n=17709  value=null      over=0     absent=null
    progress          n=17709  value=null      over=0     absent=null
    totallyBogusKey   n=17709  value=null      over=0     absent=null

The corpus size is identical in all four. `absent` stays null in all four, so it does not discriminate a key the reader cannot see from one it can. The only difference is `value`, and a null there was previously read as zero.

What that cost: `words-read-snapshot` on `memory:pages/daily-tracking/2026-08-17.daily-tracking.md`, `2026-08-18.md` and `2026-08-19.md` each stood at 0 while the corpus held 35,501,681 words across 18,537 chapters. The mechanism was the same class of unreadable source, reached through a different route. Those three days were repaired at commit `cf46f650415a6330556cd14ff863f0db4ad4c282`.

The reconciler now refuses a null sum over a non-empty corpus rather than writing it down, landed at `32ecc11489` in the code repository. That makes this failure loud where it used to be silent, but it does not make the spelling safe: a kebab sweep still stops Alan's reading from being counted, it simply says so now instead of recording a zero.
