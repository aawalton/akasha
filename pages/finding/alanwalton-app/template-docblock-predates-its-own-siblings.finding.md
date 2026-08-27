---
id: 0612ccb3-38e4-57f0-a66a-268984b23b8c
slug: template-docblock-predates-its-own-siblings
page-type-slug: finding
title: "Template docblock predates its own siblings"
domain-slug: domain/alanwalton-app
---

# Claim

The canonical voice-fragment template that authors are told to copy names two of its own siblings as work not yet done: `packages/alanwalton/personas/core/src/voice-specs/stub-example.voice.ts` lines 9-10 read "Real fragments (`abby.voice.ts`, `aine.voice.ts`, …) land in the next wave", and both files sit committed in that same directory alongside sixteen more. The sentence is inside the docblock the same file's lines 12-14 instruct an author to copy, so every new fragment carries the claim forward.

# Evidence

Read in `~/code` on 2026-08-08, while emptying `dirty/code/packages-alanwalton-personas-core-docs-voice-manifest.md`.

`git ls-files "packages/alanwalton/personas/core/src/voice-specs/*"` returns nineteen `<slug>.voice.ts` fragments. Eighteen are real personas — abby, aelwyn, aine, ali, amy, aria, aura, ceri, elaine, eppie, erin, ione, iris, lali, mari, nimue, zadi, zeli — each with a committed `refs/<slug>.reference.wav` and `<slug>.centroid.json`. The nineteenth is `stub-example.voice.ts`. I read the listing rather than resting on a count.

The template's own docblock at lines 1-15 opens "STUB / EXAMPLE voice fragment — NOT a real persona", then at lines 9-10 says "Real fragments (`abby.voice.ts`, `aine.voice.ts`, …) land in the next wave, each with a real frozen reference clip and measured centroid." `abby.voice.ts` and `aine.voice.ts` are the two it names, and both are tracked. Lines 12-14 then say "To add a real persona: copy this file to `<slug>.voice.ts`", which is what makes the stale sentence propagate rather than merely sit.

The same phrasing stood in the quarantined head document at `dirty/code/packages-alanwalton-personas-core-docs-voice-manifest.md`, whose closing paragraph read "Real fragments land in the next wave." Two pieces of prose agreeing is not corroboration — the directory listing is what disagrees with both, and it is why the document's paragraph was cut in 4602ac49 rather than kept.

A second, weaker observation from the same listing: `CentroidSchema` at `voice-spec.ts:60-75` offers an `inline` arm holding 192 floats directly, and `rg -n "kind:" *.voice.ts` returns nineteen hits every one of which is `kind: "path"`, `stub-example.voice.ts:33` included. Nothing uses the inline arm, and the head document described the sidecar as "the convention for real fragments" as though the two were split.

Nothing is broken by this: the fragments compile and `check-unit-tests` passes. A docblock is a comment, and no code reads it.
