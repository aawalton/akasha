---
id: dcbce323-0ad1-59da-a8b2-25dcfded0041
slug: allowlist-rationale-corrected-not-widened
page-type-slug: finding
title: "Allowlist rationale corrected not widened"
domain-slug: domain/global
---

# Claim

The file-length allowlist entry in packages/infra/checks/src/lib/file-length-core.ts for docs/claude-code-system-prompt.md carried a rationale string citing the 2.1.122 upstream dump though the document had been re-captured three times since (2.1.177, 2.1.198, and 2.1.219 under #16252), and dalla approved correcting the citation to 2.1.219 as maintenance of the existing, unwidened suppression rather than a new decision.

# Evidence

Project #16271, domain `code-harness`, status someday_maybe, tag author:nimue, owner nimue No objective written; title carries claim: correct the stale rationale on the baseline-doc file-length allowlist entry — cites the 2.1.122 dump, three captures out of date.

DALLA-APPROVED 2026-07-25, gate holder, quoted verbatim: "Approved, as the gate holder. Update the entry to cite 2.1.219... this is not adding, removing, or widening a carve-out. The suppression stays exactly as scoped; only its recorded justification is corrected to match the artefact it describes. That is maintenance of an existing decision, not a new one."

THE CHANGE: packages/infra/checks/src/lib/file-length-core.ts carries a file-length allowlist entry for docs/claude-code-system-prompt.md whose reason string still cites the "2.1.122" dump. That doc has been re-captured three times since — 2.1.177, 2.1.198, and 2.1.219 (landed under #16252). Update the reason to cite 2.1.219.

SCOPE IS EXACTLY ONE STRING: do not widen, narrow, add, or remove any allowlist entry. Carve-out unchanged, remains warranted — the doc is a verbatim upstream dump that must not be split, genuinely exceeding the cap for a genuine reason.

WHY NOT DONE INLINE: worker-16252 noticed it mid-project, deliberately left it, correctly reading that modifying a check-suppression allowlist entry is Dalla-gated and a stale string wasn't worth that round-trip mid-flight. This project completed it afterward.

WHAT THIS DOES NOT FIX: correcting the string resets the clock without changing the mechanism — stale again next capture, same route, same silence, because an allowlist entry durably records a decision while its condition survives only as prose nothing watches. Structural problem is #16176 (dalla's); filer recorded this as a live specimen. This row is maintenance; #16176 is the cure.

TRIVIALITY DID NOT WAIVE THE PROJECT REQUIREMENT: file-length-core.ts is git-tracked, needing a row and worktree regardless of being one string.
