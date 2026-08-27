---
id: 11ede237-a24e-5797-80e4-1de2b52d23c8
page-type-slug: finding
title: "Additive half cannot land alone"
domain-slug: repo/code-repo
---

# Claim

The additive half of a module move cannot land alone in the code repository: an exported symbol that nothing calls yet is refused at branch CI as dead code, so a client and its first caller belong in ONE commit.

# Evidence

Measured on #18836, 2026-08-12, moving the seat-name reading rule into the instructions repository. The plan was one commit per module with the additive half first and the deletion last — the ordering that protects against a deletion landing before its re-points, which is what made the agent packages unloadable under #18771 in a checkout eight seats shared.

Landing the client alone was refused. `check-ast-unused` reported five violations against `packages/agents/shared/seat-name-vocabularies.ts` — `SEAT_NAME_SLOTS`, `SeatNameSlot`, `SeatNameReading`, `SeatNameAnswer` and `readSeatNames`, each "not reached from any entry". The check indexes diagnostics by path and export name and flags a dead export whether or not a caller is planned.

Nothing local says so. The same tree passed the package typecheck with 0 errors, `ops lint-verdict` with 0 errors over 14,195 files, `bun test packages/agents` at 5,825 passing and 0 failing, and all 29 `check-syntax-bundle` scanners clean. Only the branch CI run named it, which costs a full pipeline cycle to learn.

What the ordering was protecting is unaffected: a deletion must still never land before its re-points. The correction is that "additive first" is not a licence for an export landing alone. The split is per-CONSUMER rather than per-module.

The other way past the check is a `// ast-unused: keep` pragma, which is a suppression. `Check Suppression` on `domains/folders/code-repo.md` routes one to Dalla before it is added, and an export whose caller is simply not written yet needs no suppression — it needs its caller in the same commit.

This bears on roughly 22 further modules queued to move out of `packages/agents/shared` on the same initiative.
