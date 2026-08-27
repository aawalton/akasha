---
id: 2a6d3c15-df65-551f-ac0d-4884464046d3
page-type-slug: finding
title: "Per-package branch CI cannot see a defect that is wrong only where two packages meet"
domain-slug: domain/global
---

# Claim

Branch CI is composed of per-package stages, so a defect that is correct on both sides of a seam and wrong only where they meet is invisible to it by construction.

# Evidence

Three defects in one tree, #19428, each of this shape and each found by a person rather than by a stage.

The route's guard named `guardReadout`, a device-secret check for the widget, where its only caller is a browser holding a Supabase auth cookie. The server half's tests injected a device-secret context and passed; the browser half stood a fake fetcher and passed. The first real refusal appears only where the halves meet, and nothing between them tested that.

A server-only module reached the client through the pages route, caught as a bundle fault rather than by either package's own stage.

Two mocks pulled opposite ways across the page query client's rename, each internally consistent.

The tree's own steps were green on every package before each of these was found. What found them was one seat holding both halves at once and asking what happened between them.

The same tree also carried six failures inherited from `main` — a format diagnostic, nine unit tests, two ratchets left above a shrunken list, seventeen missing workspace references, and an unmatched discriminator. The last full run on `main` was seventeen hours earlier at `1c997cc`, so nothing had reported them. A branch taken from a newer base is what surfaced them.
