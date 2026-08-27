---
id: 584ff186-39ee-54ea-82af-b052c5062363
page-type-slug: finding
title: "Mirror unreadable covers one arm"
domain-slug: page-type/refusal
---

# Claim

The consequence clause on `refusals/prompt-shape-mirror-unreadable.md` covers one arm of the check. When the mirror cannot be read the check returns early, so the canonical arm is never reached either, and the body does not say so. The sibling `halt-writer-unreadable.md` spells exactly this for its own second arm.

# Evidence

Found by the dispatched `review-instructions` seat reading the document on 2026-08-12, which negative-controlled the check with a throwing reader and confirmed the unreadable run gathered no canonical findings although that checkout is present and readable.

It left the clause out because it changes nothing the reader does: the act either way is to make the mirror readable, and both arms resume when it is. That is a judgment about whether a refusal carries anything past the next act.

Also observed, and not settled: the check's header calls its canonical arm "the only instrument left watching that file". The deleted guard's source is gone, but a unit test still exercises the module — its behaviour, not its prefix values against this repository's declaration.

Not measured: whether the early return has ever hidden a canonical drift in practice.
