---
id: 8679aa63-057a-5304-bbd9-895a6e11b76c
slug: solinur-hardcoded-debug-gate
page-type-slug: finding
title: "Solinur hardcoded debug gate"
domain-slug: domain/temper
---

# Claim

`@Solinur` is hardcoded in `lib-data-encode` as a runtime debug gate keyed to the upstream author's account name, and it was deliberately left unfixed by the rename batch that found it because swapping which account the gate admits is a behavior change, not a rename; what the gate does when it fires — and so whether it is dead code to delete or a real predicate to build — has not yet been established. Precedent exists: the residue manifest already retired `@code65536` for TemperCrafting.

# Evidence

From project #16201 (domain: temper). Found by #16187 (batch B) during the rename; not fixed there, deliberately.

`@Solinur` is hardcoded in `lib-data-encode` as a runtime debug gate — the upstream author's account name gating debug behaviour in shipped code.

PRECEDENT NAMED: the residue manifest already retires `@code65536` for TemperCrafting, so author-fingerprint residue is established as in-scope for the identity programme, with a worked example of removing one.

WHY IT IS NOT A RENAME: swapping the string changes who the gate admits — a behavioral edit with a real (if tiny) blast radius, out of contract for a batch scoped to identity-only changes. Batch B was right to surface rather than absorb it.

TO ESTABLISH BEFORE THE FIX IS DECIDED: what the gate actually does when it fires. If it enables debug output for an upstream account no longer in this fleet, the gate is dead code and the Existence Check applies — delete rather than re-point it. If it gates something a Temper operator would want, it needs a real predicate (a setting, a debug flag), not a different hardcoded name.

EXPLICIT WARNING IN NOTES: do not simply substitute a Temper account name for the upstream one — that preserves the defect and changes only whose fingerprint is in the tree.
