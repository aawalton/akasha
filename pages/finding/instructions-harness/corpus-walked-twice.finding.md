---
id: 50808930-f91f-5263-b94d-44dbe71f3483
slug: corpus-walked-twice
page-type-slug: finding
title: "Corpus walked twice"
domain-slug: domain/global
---

# Claim

Two walks in `tools/lib/` read the same four corpus vocabularies, and `seat-vocabulary.ts` warns in its own header against exactly that.

# Evidence

`lib/seat-vocabulary.ts` holds `vocabularyOf(root)`, globbing `**/*.md` for role, persona, task and domain names. `lib/corpus.ts`, landed 2026-08-11 under project #18770, walks the same four to hand back whole records rather than names alone, because the readers it replaces in the code repository read fields off each document.

The header of `seat-vocabulary.ts` states the risk itself: a second parser reading the same key would be the drift that file exists to catch.

The two AGREE TODAY, measured 2026-08-11 by running both over the live tree and comparing sets: role 14, persona 41, task 38, domain 435, with no member in one and not the other. They agree by coincidence of a gate rather than by construction — `vocabularyOf` takes every name from the file STEM, where `corpus.ts` takes a declared `domain-slug:` for personas and domains and the stem only for roles and tasks. `gates/domain-slug-stem.ts` binds slug to stem, so the two readings coincide on every conformant document and would part on a non-conformant one.

Collapsing them is not free and that is why this is filed rather than done. `vocabularyOf` is called inside `land()` before every write this repository accepts, and that call is not wrapped: `readCorpus` throws on a dead read where `vocabularyOf` returns empty arrays, so re-pointing it moves an empty-corpus reading from a silent pass to a refusal on the write path of every seat in the fleet.
