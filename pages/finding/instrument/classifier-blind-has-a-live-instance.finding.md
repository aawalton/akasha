---
id: 00e818a3-d6c5-5d38-89f3-e573f5866c3c
page-type-slug: finding
title: "Classifier blind has a live instance"
domain-slug: domain/instrument
---

# Claim

`check-verdict-emitter-chokepoint` exits 0 over a config where four of seven entries name deleted files, because `reconcileChokepoint` files an entry naming nothing under `resolved` — rendered only in the success message — and its ratchet compares cardinality, not membership. Its docblock claims exit 1 for this exact case. It is a live instance of the `classifier blind` cause that `four-causes-of-a-misleading-zero` records as having no carrier: full denominator, numerator in a bucket named clean.

# Evidence

Found 2026-08-14 hunting censuses of the `ops` command set rotted by the 19011 deletion branch, `f7dfc1ec51`. Not inferred: the branch corpus was materialised with `git archive` and the real check run over it. Exit 0, the four dead entries printed inside the success body as a ratchet note.

`verdict-emitter-chokepoint.config.json:5-8` names `deletion-residue.ts`, `enforcement-list.ts`, `enforcement-new-rule.ts` and `irreversible-list.ts`, all under `packages/infra/checks/src/checks/` and all deleted by that branch. The config is byte-identical on `main` and the branch, so the rot is the corpus moving, not the file changing.

Two mechanisms suppress it, both in `packages/infra/checks/src/lib/verdict-emitter-chokepoint.ts`:

- `reconcileChokepoint` loops `for (const [file] of bypass) { if (corpus.has(file)) continue; resolved.push({ kind: "not-in-corpus", file }) }`. Nothing reaches `violations`, and `resolved` renders only in the success message.
- `export const BYPASS_SIZE = 7` at line 84 is compared against `bypass.size`, still 7. The list holds its declared size while four members point at nothing. An equality ratchet of this idiom measures cardinality, never membership.

The docblock on `check-verdict-emitter-chokepoint.ts` states, in its exit-code block, `1 — ... an entry names no corpus member`. The code returns 0. An auditor reading the documented contract concludes the class is covered, which is the condition under which nobody looks again.

Why it matters past this file: three sibling censuses found on the same branch all reddened CI, each rotting in a dimension its instrument measures. This one rots in a dimension its instrument classifies as non-violating, so no CI run will surface it. Green CI is not evidence this class is clear.

Filed rather than repaired because the repair is a ruling — whether `not-in-corpus` should be a violation across this whole family of checkers — and changing it reddens a branch already carrying seven failures.
