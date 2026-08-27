---
id: 319a3461-d385-58e1-ae3a-095dde1bc664
page-type-slug: finding
title: "Intent untestable"
domain-slug: domain/global
---

# Claim

Global's Intent entry — "External products fund Alan's harness and the agent harness" — names a state no instrument in the corpus can report, so no reading can tell whether it has become true and the entry has no way to leave.

# Evidence

`domains/domain-intent.md` states that an Intent section holds only what is not yet true, and that an entry leaves once it is true. Retiring an entry therefore rests on someone being able to say whether it now holds.

Whether external products fund either harness is a fact about money. The instructions repository reports nothing of the kind: `tools/checks/` holds nineteen checks and every one is structural — documents conforming, links resolving, schemas binding, hooks agreeing, glossaries generated. A case-insensitive search of `tools/` and `domains/` for `revenue|fund|income|paying customer` returns `domains/global.md` itself, `domains/faith.md` and `tools/lib/domain.ts`, none of which reports a figure.

Raised by the `review-instructions` reading of `domains/global.md` on 2026-08-05, which walked 26 slices and left this one standing as the single fork it could not settle. Every other slice on the surface was either landed or verified: the Glossary against `compose-glossary --dry-run`, and each of the four principles against a corpus search confirming Single Authority.

The entry has stood since before this record. `aine` owns `global`.
