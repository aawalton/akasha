---
id: 4329e72d-6c8d-5366-8d50-dc0ad1183a27
page-type-slug: finding
title: "Rendered holes unbounded"
domain-slug: page-type/refusal
---

# Claim

Nothing bounds what a refusal hole renders to. The `claimants` hole on `refusals/persona-champion-claimed-twice.md` is a join over every document naming a persona, so a persona named by forty documents renders forty paths into one paragraph. `holes:` caps how many holes a body carries and the section caps the source paragraph, but neither reaches the rendered value, and `token-ceiling` measures the document at 233 bytes and cannot see the output.

# Evidence

Found by the dispatched `review-instructions` seat reading `refusals/persona-champion-claimed-twice.md` on 2026-08-12, which ran the fault in a fixture repository and rendered the body rather than reading the template.

No line-level act reaches it: the seat named the two remedies as a cap in `tools/checks/domain-edges.ts` or a ceiling on rendered output, both code, and both resting on a judgment about what a stopped reader should be shown.

Not measured: how many other refusal holes are fed a joined list, and what the largest one renders to on the live corpus.
