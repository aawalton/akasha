---
page-type-slug: finding
title: "Eight of nine patch checks can be woken"
domain-slug: domain/checks-system
---

# Claim

Eight of the nine checks gating a patch were shown a change they must refuse, and refused it. One was not: `inbound-import-resolves` cannot be woken, and nothing distinguishes it from a check returning nothing on every change.

Its candidate set is empty by construction. No file in the one other repository contains the string it searches for.

# Evidence

Run 2026-08-27 22:27 to 22:36 MDT, from `6ded69246`; the tree moved to `d4aaa7da1` during it and no intervening commit touched a check.

Each probe was a change composed to violate one check's Definition, put to `ops write --dry-run`, with the verbatim refusal recorded and attributed. Each target also took an innocuous change immediately before or after and passed all nine. An identical body is not a control: the gate answers `no line differs from what stands, so no check had anything to judge`.

Woken: `typecheck` (TS2322), `file-length` (35,990 bytes over 15,000), `import-resolves` (a subpath a package does not answer), `export-declared-here` (a re-export), `read-before-write` (the same bytes refused before a read and passing after), `page-named-as-stated` (slug against file stem), `relation-resolves` (a parent naming nothing), `category-rule-acts` (a rule that never lands). Every refusal named one check, and it was the one aimed at.

`inbound-import-resolves` could not be woken. It finds importers with `git grep -l --fixed-strings -- "akasha/" '*.ts'` in each non-akasha root. The one other root holds 5,583 tracked `.ts` files and none contains that string; the only file in the repository that does is excluded by the `*.ts` pathspec. So the candidate set is empty on every change. The remaining route is a pending write in another repository, and a call naming paths in two repositories is refused because a call lands in one.

Found on the way: `export-declared-here` does not do what its Definition states. `export { probeNeverDeclaredAnywhere }`, a name declared nowhere and imported from nowhere, passed. The check flags forwarding and re-export of an imported name. A genuinely undeclared export is not judged.

Not measured: whether `inbound-import-resolves` would work given a candidate. Only that nothing today can tell.
