---
id: da16e61f-6dee-5a2c-aba7-fde3a64029bc
page-type-slug: finding
title: "Two Design entries record facts about Alan rather than invariants a reader gets wrong"
domain-slug: domain/alan-harness
---

# Claim

Two Design entries on `domains/alan-harness.md` are none of the three kinds `domain-design.md` allows. "Alan changes often." is the warrant for the entry directly under it, which a Design entry does not carry; with that entry standing, no act turns on this one. "Alan's harness has a footprint in several products." names no product, and the tree beneath already carries the fact concretely. Both record a fact about Alan and his setup rather than an invariant a reader gets wrong.

# Evidence

Read off the `review-instructions` reading of `domains/alan-harness.md` finished 2026-08-21, read line by line, bottom to top, 16 entries from `79822b0ef` to `75e4c5a69`. The reading names the concrete carriers beneath: `code-editor` and `status-bar` under `alan-harness-desktop`, `monarch` and `alan-email` under `alan-harness-agents`, the stoplight readouts under `alanwalton-app`. It reports `git show 4d9c4df99` landing the products entry on 2026-08-12 with an empty commit body and no reason recorded.

The reading landed neither cut, both entries standing in a section "Every Changed Line" holds for Alan.

Not measured here: I did not open `domain-design.md` for this, did not run the git show, and did not check whether "Alan changes often." does work on `domains/persons/alan.md`, which carries no Design section today.
