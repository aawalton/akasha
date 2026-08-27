---
id: acf05920-68c2-5dac-8d56-d6ee6be09355
slug: residue-blind-to-comments
page-type-slug: finding
title: "Residue blind to comments"
domain-slug: domain/instrument
---

# Claim

`ops deletion-residue` reports a clean run over the code repository for residue that sits in source comments, because nothing in the estate declares it reads the `repo-source-comments` carrier.

Comments are where most prose describing a deleted mechanism lives, so this is the carrier the verb's own purpose points at. A deletion whose residue is entirely comments is indistinguishable, in the verb's output, from one that left nothing behind.

# Evidence

Measured 2026-08-06 against `~/code` on project #17952, which clears citations of the retired surface `domains/identity.md`.

`ops deletion-residue "domains/identity.md"` reported, over the four carriers it reads: `instructions-surfaces` 0 over 1936 surfaces, `instructions-prose` 1 over 1936 files, `repo-markdown-prose` 0 over 18 files, `pages-row-text` 0 over 42 rows. It reported `repo-source-comments` as `UNCOVERED` — "no instrument in the estate declares it reads this carrier".

A literal search over the same tree at the same moment found 75 lines across 56 files naming that path, over 16,418 files searched. Every one is a comment or a help string, so every one sits on the uncovered carrier. The verb's zero and the repository's 75 are both correct.

Two standing decisions produce this, each documented where it was taken.

`packages/infra/checks/src/lib/deletion-residue-scans.ts` states "FOUR OF EIGHT IS THE DESIGN", keeping `repo-path-literals` as a deliberate standing `UNMEASURED` arm so the report has an observable reading for *something declares this and I did not look*. That reasoning covers `repo-path-literals` and does not reach `repo-source-comments`, which no instrument claims at all.

`packages/infra/checks/src/checks/check-repo-paths.ts` states "A FOURTH SURFACE WAS REMOVED HERE AND SHOULD NOT COME BACK." The removed arm read exactly this carrier — comments, and string text its AST walk could not reach — through the estate's citation grammar. On the reading that retired it, the arm produced 1,124 findings against 41 from the three surviving surfaces, none of them the defect the gate was built for, and it was tolerable only against a frozen count.

So the gap is deliberate at the gate that dropped the arm, and unclaimed rather than deliberate at the residue verb.
