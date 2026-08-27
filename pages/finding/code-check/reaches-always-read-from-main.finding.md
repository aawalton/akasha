---
id: 126e01b4-5399-5d1a-89e8-8f8cea030c6a
slug: reaches-always-read-from-main
page-type-slug: finding
title: "Reaches always read from main"
domain-slug: domain/global
---

# Claim

`check-ast-unused` reads its cross-repository entry set from the instructions repository's `main` and only ever from `main`, so a code branch that renames a module the instructions repository reaches cannot be green until both halves have landed — and the two halves cannot land together.

# Evidence

Established 2026-08-14 while ruling on a check suppression #18824 routed for the seven exports its faucet-to-points-source rename orphaned.

`cloneInstructions` (`packages/infra/checks/src/lib/instructions-clone.ts:36`) clones `--single-branch --branch main`, and its comment records that ref as deliberately not a parameter. The tree is cached under `/ci-storage/instructions/<sha>` keyed by the CODE sha, so the path reads as branch-matched while the content is instructions `main`.

The consumer is all-or-nothing. `resolveRef` (`ast-unused-reach-roots.ts:30`) answers null for a ref resolving to nothing and line 59 throws on it; `check-ast-unused.ts:334` returns that as `entrySet.refusal`, exit 2. One unresolvable reach voids the whole run: the check prints "NO VERDICT ... it certifies nothing" and lists its violations under a verdict it has withdrawn. Pipeline 28002 failed that way on six reaches, and the seven exports it listed are not what exited non-zero.

THE WINDOW CANNOT BE CLOSED FROM EITHER SIDE. Landing the instructions half first points the reaches at modules absent from main, refusing main. Landing the code half first refuses the branch. Naming both does not help: `[A, B].map((ref) => codeModule(ref))` is a shape `tools/reaches.ts` follows, so both publish and one member is then unresolvable in EACH tree, refusing both rather than neither. `codeModule` (`tools/lib/code-import.ts:14`) throws on a miss with no fallback, so the pair does not survive execution either.

IT HAS RECURRED ONCE ALREADY. #19011 hit the same rock from the other face and was answered by taking the check off the composed set entirely (`e2469b1639`, naming #19089 as what would turn it back on); #19089 landed and `9992f60ee4` turned it back on the same day. Making the reach set readable fixed which modules are credited. It gave no reach a way to be in flight.
