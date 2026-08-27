---
id: e5695991-f82c-5f8d-8d96-5806d4274234
slug: voice-names-two-unrelated-crafts
page-type-slug: finding
title: "Voice names two unrelated crafts"
domain-slug: task/create-persona-voice
---

# Claim

`voice` names two unrelated crafts. `pages/task/create-persona-voice.task.md` is entirely about a persona's WRITTEN prose voice and mentions audio, ECAPA, centroid, WAV, spoken and TTS zero times. This system also runs a SPOKEN voice craft — reference clips, a 192-float speaker centroid, `ops persona set-voice`. It has no task, and the live task's name reads as though it covers it. Two readers took the task for that carrier on its name alone tonight.

# Evidence

Read first-hand from `~/instructions` on 2026-08-08.

`grep -ci 'ecapa|centroid|wav|audio|spoken|tts'` over `pages/task/create-persona-voice.task.md` returns 0. Its Definition is "rewriting one persona's file into a voice only she has", and its Sequence works on her file, her spec and her anchor image throughout.

The spoken craft is live and separate. `ops persona set-voice` writes a persona row's `voice*` fields; `alanwalton/personas-core/src/voice-spec.ts` requires a `reference` clip and a `centroid` pinned to `ECAPA_CENTROID_DIM = 192`; nineteen committed voice fragments stand. A seat searched `domains/`, `tools/`, `notices/` and `settings/` for `ecapa|centroid|tts|spoken voice|wav|synthes` and read every hit back one at a time: each is waved hair in an appearance section or "synthesised" in a test docblock. Nothing live is about synthesized voice, and `ops enforcement list` names no voice mechanism.

Two independent readers hit this tonight. A seat emptying `packages-alanwalton-personas-docs-persona-voice-design.md` reported it nearly took the live task for a carrier on its name alone. A delegate measuring procedures without tasks reached the same point from the other direction.

`pages/domain/global.domain.md`'s Ubiquitous Naming binds the opposite failure — one concept under two spellings, where "a second spelling reads as a second thing". This is the inverse, and worse in one respect: a second spelling is caught when both are met, whereas one spelling over two things is caught only by reading the body, so a reader who stops at the name never learns there was anything to find.

`pages/finding/create-persona-voice/scene-and-conduct-name-one-thing.finding.md` is the same family on the same document and a different instance, and I opened it before filing. A separate finding on the Voice principle's reach rather than its name was closed on 2026-08-15, leaving this one about the name alone.

If a spoken-voice task is written, one of the two names has to move first.
