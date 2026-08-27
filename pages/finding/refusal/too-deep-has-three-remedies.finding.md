---
id: 2e6e959d-80ea-548f-b23f-f8f31c6df169
slug: too-deep-has-three-remedies
page-type-slug: finding
title: "Too deep has three remedies"
domain-slug: page-type/refusal
---

# Claim

`refusals/finding-too-deep.md` has three available remedies and no instrument choosing between them, and the verb its nearest sibling names refuses this case outright — `rehome-finding` requires a path exactly one folder deep, which a too-deep finding is not.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/finding-too-deep.md` dispatched from `review-documents`. The reading named the three and declined to choose; the verb's guard was read here.

`tools/rehome-finding.ts` fails any path whose `segments.length !== 3`, with "one lives at `findings/<domain>/<name>.md`, exactly one folder deep, and this moves nothing else". So the remedy added to `refusals/finding-misfiled.md` in this same pass cannot be reused here.

The three the reading named: flatten it with `ops instructions mv`; re-home it, since wanting a sub-folder may mean the finding belongs to a different domain; or treat the refusal as the moment the sub-folder question is due, which is what `checks/findings-sorted.ts` says it exists to surface.

They are not interchangeable. Flattening quietly is how the third signal would be lost, so naming the cheapest act would suppress the one the check exists for.

The same reading repaired the body's second sentence, which used `cluster` for a grouping of findings where `domains/cluster.md` declares it as "a named set of machines that takes work as one" — the only instruction outside `dirty/` using it in another sense, against eight domains using it in the declared one.

A second instance of the same shape: `refusals/halt-reason-unwritten.md` names no act because which one clears it turns on which of two causes holds, and no instrument says which. So this is a class rather than one document — a body whose remedy depends on a cause the printer does not establish.

Not measured: whether the sub-folder question is live for anyone today, or whether any finding currently sits too deep — `findings-sorted` passes over 1791 findings in 206 folders.
