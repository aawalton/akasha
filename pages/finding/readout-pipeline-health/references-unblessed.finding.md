---
id: 57ff7cfe-8fc6-5912-a5a3-0d2edf32244e
slug: references-unblessed
page-type-slug: finding
title: "References unblessed"
domain-slug: domain/global
---

# Claim

The pipeline health readout has no blessed reference images. Four render cases exist for it and every one fails for want of a reference to compare against, so nothing in the harness can report that tile drawing wrongly — a case that has never been blessed and a case that regressed are the same red.

# Evidence

Reported on 2026-08-09 by the seat on #18240, which met the four failures while running the render harness for its own change and did not bless them, on the ground that blessing another project's tile is taking a verdict on it. The tile comes from #17550.

Not verified by me: I have not run the render harness, opened the four cases, or read what a blessing costs. Not measured: whether any other readout is in the same state, which is the question this one raises and does not answer.
