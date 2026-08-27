---
id: ba1e9384-9c61-5e20-b0a9-46e35050d72b
page-type-slug: finding
title: "A reader stops at the first document that could plausibly hold the answer"
domain-slug: domain/context-push
---

# Claim

A reader stops at the first document that could plausibly hold the answer, and does not walk an intact trail to the one that does.

Nothing is broken in these cases. No pointer is missing and no line reads as complete. The reader arrives at a document that owns the general subject, finds it silent on the particular question, and treats that silence as the answer rather than as a reason to go one level down.

# Evidence

One observed instance and one testimony, 2026-08-24.

I proposed a check that would land red and ratchet down. `pages/domain/check.md:30` carries as a Condition "Every check lands at zero violations", which refuses a ratchet outright. I had read `pages/domain/instrument.md`, because my question was how an instrument should behave, and `instrument.md` plausibly owns that. It is silent on the threshold a check lands at. I took the silence for an absence and proposed the ratchet. Alan refused it in one line.

The trail was intact and two hops long: `instrument.md` names `instrument-kind` in its sequence, and `instrument-kind` is the parent of `check`. Nothing pointed away and nothing was missing.

The testimony is the domain's owner, who caught the citation. She had `check.md` in context only because it went past her in a post-compaction batch after a hook flagged `Check` as a coined word — an incidental push, not navigation. Her account: coming at the question cold she would have opened `instrument.md`, found nothing, and likely agreed a line was needed. This is counterfactual and I am recording it as testimony, not as a second instance.

The mechanism she names is the part worth keeping. `pages/domain/global.md` carries under **Grounding** the aid "Stop looking once you can make the call." In both accounts that directive was obeyed, not broken — the call simply felt makeable a level too early. So this is not answered by telling a reader to look harder, and a remedy shaped that way would be arguing against a line the system already stands behind.

Not measured. Population is one observed, and the observer is the author of this finding, which is the weakest possible source. I did not test whether the trail's length matters, whether a parent document stating that a child holds the answer would have moved either reader, or how often a general document is silent on a particular a child binds. No survey was run for other pairs standing in this relation.
