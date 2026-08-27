---
id: 548a3e6f-2866-59a0-ac5b-c3fd56388fdc
page-type-slug: finding
title: "Fork divergence list not authorship"
domain-slug: domain/global
---

# Claim

The TSTL fork's `CLAUDE.md` divergence list records only structural divergences, not per-file authorship, so a file's absence from it carries no information about whether this team wrote it — and it was wrongly read as evidence of upstream-pristine authorship for two files that `git log --follow` / `git log -S` later showed this team had written.

# Evidence

Project #16086, domain `code-harness`. Gate-integrity audit raised by the #16015 worker; owned by dalla, who holds the suppression gate and nearly ratified a fourth exemption on the premise this row shows unsound. No objective; notes only.

WHAT HAPPENED: the #16015 worker requested a TSTL-fork carve-out for `check-strict-truthiness`, matching three pre-existing ones. Dalla approved it on condition the justification read "upstream files not modified," reasoning from absence off the `CLAUDE.md` divergence list. The worker ran `git log --follow` (plain `git log` stops at #15382's move commit) and inverted that, verified by dalla: `isReferenceType` in `types.ts` was added whole by this team (`12b86a3f51`), with `7cbe04f409` already remediating this file directly above the fired line; `Number.ts`'s `Number*` predicates are also ours (`a4af73d0e2`). No suppression was needed; remediated behaviour-identically instead.

DALLA'S ERROR: reading the divergence list's silence as evidence a file was pristine, though the list records structural divergences only. The discriminating-instrument pattern, committed the same night dalla wrote it up on #15919, after flagging the limit ("could not diff those files against upstream") and using the instrument anyway.

SCOPE, NOT YET DONE: audit the three pre-existing exemptions on the same authorship question — `ts-strict-boolean-expressions.ts:81-85` (Áine-approved), `ts-exhaustive-dispatch.ts:33-38`, `check-exhaustive-dispatch.ts:70`; also `check-no-class.ts` (shape unverified). Excluded: `check-readonly-collections.ts:131` is genuinely narrower (Lua-semantics, not fork-parity). Anything this team wrote should be remediated, not exempted.

SMELL: #9568's commit claims parity preserved for a file whose offending function this team wrote. NOT DONE: state in `CLAUDE.md` that the list is not an authorship inventory. SEPARATE: Rule-of-Three extraction of `isTstlForkPath` — audit authorship first; it may delete copies, not consolidate.
