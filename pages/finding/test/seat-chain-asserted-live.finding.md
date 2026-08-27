---
id: 8446ac8e-a6dd-5631-be91-5225e3627610
page-type-slug: finding
title: "Seat chain print asserted against the live corpus"
domain-slug: domain/test
---

# Claim

`tools/tests/seat-stated.on-demand.test.ts` asserts the governance chains it prints byte for byte against the live instructions corpus, so it goes red whenever any domain anywhere above `seat`, `project`, `task` or `persona` changes a parent.

# Evidence

Measured 2026-08-20. The seat is planted in a fixture, but `EVERY_KEY_PRINTS` names real documents — `page-types/seat.md`, `domains/agent-harness.md`, `page-types/project.md` and their ancestors — and the chain is walked over the live tree.

It went red twice on 2026-08-20 from domain moves unrelated to seats. Inserting `alan-harness-tools` between `alan-harness-agents` and `alan-harness` added one line to the persona chain. Repointing 49 page types from `memory` to `memory-repo` added ten lines across the domain and task chains, `memory-repo` standing under `repo` and drawing the `domain-kind` spine behind it.

Both repairs restored green by transcribing the new output. That is the shape `domains/test.md` names under Assert The Invariant: an assertion about the case at hand rather than the invariant, breaking while nothing is wrong.

The invariant the two tests name in their own titles is that the printed form is stable — "prints byte-for-byte what it printed". A fixture corpus carrying planted ancestors would hold that without pinning it to whatever the live tree holds that hour.
