---
id: 48e30127-b631-5613-b21c-f37ee20697e9
slug: remediation-doc-nullable-flip
page-type-slug: finding
title: "Remediation doc nullable flip"
domain-slug: domain/global
---

# Claim

The repo's strict-boolean remediation doc's mechanical rewrite table (`if (count)` → `if (count !== 0)`) flips runtime behavior on nullable numeric shapes: in TSTL that compiles to `count ~= 0`, and in Lua `nil ~= 0` is true, so the rewrite enters a branch the original skipped — live at `game/collections/addon/src/item-browser/ui/list.ts:444`, which types as `number | undefined` under a correctly-configured (strict) program.

# Evidence

Project #16040 (domain `code-harness`, parent #15872 "Temper readiness audit"), owner ember, created 2026-07-25. No objective written; full capture. Found by #16015's worker remediating against the repo's own strict-boolean table.

**The defect.** For a numeric truthiness test the doc prescribes `if (count) -> if (count !== 0)`. In TSTL that compiles to `count ~= 0`; in Lua `nil ~= 0` is TRUE. `if count then` skips on nil; the rewrite enters — silently flipping the nil case in what looks like compliance.

**Live, not hypothetical.** Under a strict program, `game/collections/addon/src/item-browser/ui/list.ts:444` types as `number | undefined`, not `number`. A doc-driven remediation there would ship a live behavior change, defended as following the documented rule.

**Why worse than an ordinary doc bug.** A mechanical table is trusted in proportion to how mechanical it looks, which removes the reader who would catch the nil case. It compounds with #16035: the non-strict program hides the nullability that makes the rewrite unsafe, so fixing #16035 makes this doc more dangerous, not less; sequencing was flagged.

**Correct criterion.** The rewrite must compile to Lua with truth values identical to the current code. For a nullable site, the faithful form is `x !== undefined`, not the doc's `x !== 0`, correct only for a non-nullable numeric. The doc should split its table by nullability and require a nullability check, not blind substitution.

**Scope.** #16015 handles its own 18 sites correctly by hand. This row is the doc fix plus a check of every site already remediated under the bad guidance — undone at capture, needing #16035 first since a flipped nil case looks identical to a correct rewrite by diff alone.

**Evidence grade.** Mechanism-verified: Lua semantics is definitional; the type at `list.ts:444` was observed in a built program. Not verified in-game; no historical remediation yet checked, so a claim the table was followed unsafely before is unverified.
