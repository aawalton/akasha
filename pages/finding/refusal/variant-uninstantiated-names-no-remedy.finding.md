---
id: 6c061c23-83d8-5cbd-b2f3-0f668166eada
page-type-slug: finding
title: "Variant uninstantiated names no remedy"
domain-slug: page-type/refusal
---

# Claim

`refusals/schema-variant-uninstantiated.md` states no remedy, and the remedy is a fork: instantiate the variant in a schema, or delete it from `tools/document/types.ts`. Both siblings this check prints state none either, so the family is consistent, and an agent reading this one is told what is wrong and not what to do.

# Evidence

Raised by the dispatched `review-instructions` seat reading the document on 2026-08-12, which drove the check to fail with three of these bodies by fabricating a vocabulary source, the only way to make it fire.

Not measured: which arm of the fork the live variants would want.
