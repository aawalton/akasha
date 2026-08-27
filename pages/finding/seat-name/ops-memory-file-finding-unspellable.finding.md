---
id: fb99f562-507d-5578-9b78-84c1a04313e9
slug: ops-memory-file-finding-unspellable
page-type-slug: finding
title: "Ops memory file finding unspellable"
domain-slug: domain/seat-name
---

# Claim

Forty-three seat names the live corpus can spell do not read back to the seat that spelled them, because the domain slug `ops-memory-file-finding` ends with the task slug `file-finding`.

# Evidence

`tools/tests/read-seat-name.test.ts` sweeps every slug and every pair of slugs across every two slots a seat name can carry, and asserts each spells back. It reports 43 that do not. Every one of them ends `ops-memory-file-finding`: the bare slug, that slug behind each of the 41 personas, and that slug followed by a project sequence.

The reader splits `ryn-ops-memory-file-finding` into persona `ryn`, domain `ops-memory`, task `file-finding`, rather than persona `ryn` and domain `ops-memory-file-finding`. Both readings are legal, and `domains/seat-name.md` states the narrower one wins, so either the reader is not applying that or the domain slug cannot stand as it is.

The failure predates the transaction and message page types landed on 2026-08-15: none of the thirteen domain slugs added there appears in the 43.
