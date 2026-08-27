---
id: e0b60b7b-837c-5353-9c3f-ee7ca2bd8b71
slug: holes-key-is-opt-in
page-type-slug: finding
title: "Holes key is opt in"
domain-slug: page-type/refusal
---

# Claim

A refusal document that declares no `holes:` key still conforms: the schema reports ok over four parts, the scan being opt-in by design. So the key is not what makes a refusal well formed. It is the only thing holding the call site, and no type reaches that — a document dropping it loses its binding to the instrument that prints it while passing every check.

# Evidence

Measured by a dispatched `review-instructions` seat reading `refusals/hook-probe-settings-unreadable.md` on 2026-08-11, which ran `tools/document/check.ts` against the body with the key removed and got a pass. The same seat confirmed the key does work when present: check.ts refuses a declared hole the body never marks, render.ts refuses a surplus value as loudly as a missing one, and `refusals-bound` pairs 126 documents against 33 instruments over 159 documents.

A later reading, on 2026-08-12, named the consequence: a body carrying a mark with no `holes:` key passes every gate, so the literal brace characters reach a stopped agent. The scan reads only documents that declare the key, and the pairing check reads the same declaration.

Not measured: how many live refusal documents declare no `holes:` key, and whether any of them carries a mark in its body.
