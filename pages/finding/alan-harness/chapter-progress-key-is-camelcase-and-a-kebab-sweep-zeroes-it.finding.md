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

- `pages/page-property-definition/collection-own-progress.page-property-definition.md:6` declares `key: ownProgress`.
- Every chapter file spells `ownProgress`. Re-measured 2026-08-27: 6,426 pages under `pages/story-chapter-royal-road/` carry `ownProgress:` and 0 pages anywhere carry `own-progress:`.
- `packages/alanwalton/nova-words-read/src/aggregate.ts:8` set `CHAPTER_PROGRESS_KEY = "ownProgress"`; that file is gone and the key now stands as a bare string literal, at `collections/litrpg/src/nova/catalog.ts:14-15,45,55` and `collections/litrpg/src/nova/offline-sync.ts:105,112-117`.

Four spellings put through `askComposed` with `function: sum` against `story-chapter-royal-road`:

    ownProgress       n=17709  value=20316978  over=6426  absent=null
    own-progress      n=17709  value=null      over=0     absent=null
    progress          n=17709  value=null      over=0     absent=null
    totallyBogusKey   n=17709  value=null      over=0     absent=null

The corpus size is identical in all four. `absent` stays null in all four, so it does not discriminate a key the reader cannot see from one it can. The only difference is `value`, and a null there was previously read as zero.

What that cost: `words-read-snapshot` on `pages/daily-tracking/2026-08-17.daily-tracking.md`, `2026-08-18` and `2026-08-19` each stood at 0 while the corpus held 35,501,681 words across 18,537 chapters. The mechanism was the same class of unreadable source, reached through a different route. Those three days were repaired at commit `cf46f650415a6330556cd14ff863f0db4ad4c282`.

The reconciler refused a null sum over a non-empty corpus rather than writing it down, landed at `32ecc11489` in the code repository. Re-measured 2026-08-27: nothing under `tools/`, `services/`, `readouts/` or `collections/` writes `words-read-snapshot` at all, so that guard went with the reconciler. The spelling is not safe either way: a kebab sweep still stops Alan's reading from being counted, and the sibling property `pages/page-property-definition/daily-tracking-words-read-snapshot.page-property-definition.md:6` declares the kebab `words-read-snapshot` beside it.
