---
id: 3b1bd51f-046e-572b-ace8-0302b1ccdd99
page-type-slug: finding
title: "Docref hole unbounded"
domain-slug: domain/pages-system
---

# Claim

A `to: path` hole declares no character bound and cannot be given one, so any list rule a page shape bounds by its slots is bounded by nothing at all. Twenty-six page types compile a `# Tasks` entry that way today.

# Evidence

Measured 2026-08-15, while retiring the typed `.ts` schemas.

`tools/lib/page-template.ts` reads a slot's declaration key by key and returns on the first it finds. `to:` is read before `max:`, so a slot declaring `to: path` returns a `docref` and any `max:` beside it is never reached. Nothing reports the dropped key.

`page-body-shapes/domain.md` writes its `# Tasks` entry as `- **[{task}]({href})** — {guidance}`, with `task: to: path` and `guidance: max: md`. The rule compiles to `maxChars: "slots"`, and the sum of its slots is unbounded because one of them is the docref. Every page type extending `domain` inherits it: 26 of them, one rule each.

The typed `tools/document/schemas/domain.ts` bounded the same entry differently — `asItem(MD, taskEntry)`, a whole-line ceiling of 200 that did not depend on the slots at all.

Nothing is over anything today. 53 task entries stand across the repo; the longest measures 212 plain characters, and it holds against the compiled `role` shape and against the typed `role` schema alike, because `plain()` drops a link's target and counts only its label. The gap is latent rather than realised, and `token-ceiling` still bounds the file the line stands in.

`tools/document/bounds.test.ts` carried the claim "a rule bounded by its slots is bounded by something". It passed over the typed schemas, failed at 28 sites the moment it was pointed at the compiled shapes, and was deleted rather than left red.

Not measured: whether any other shape declares a slot-bounded rule over a hole that is not a docref, and whether `checkContent` treats an unbounded slot sum as no ceiling or as a ceiling it can never reach.
