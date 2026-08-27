---
id: fc47d0fd-a9e1-5f2c-b9fb-ebc51a38f20f
page-type-slug: finding
title: "Eleven alert conditions build their words as they fire, so no document can hold their text"
domain-slug: page-type/alert
---

# Claim

Eleven alert conditions build their words as they fire, so their text cannot stand on a document until the document can hold a hole.

# Evidence

Five kill-alert causes — `adopt-fail`, `oauth-terminal`, `rc-boot-dark-suspected`, `rc-degraded-suspected` and `revive-suppressed` — and six devops-monitor wedge classes — `child-crashloop`, `dispatcher-liveness`, `landed-no-main-pipeline`, `seat-derivation-coverage`, `subscriber-lag` and `supersede-cycle` — each have a document under `domains/alerts/` carrying no summary and no description.

Each composes its text at the moment it fires. A wedge class returns an evidence object and renders from it: `classifySubscriberLag` hands `decideSubscriberLag` a snapshot and gets back a verdict whose evidence names what was observed, such as the subscriber count and the grace seconds that applied. A kill-alert cause does the same through `tools/lib/kill-alert-content.ts`.

So the seventy conditions that moved to their documents moved because their words were already fixed. These eleven are not the same case. Half of each sentence does not exist until the thing happens, and a document holding only the fixed half would deliver an alert that says less than the code does today.

The shape that fits is one this repository already has. A refusal document holds settled prose with named holes and is filled at the moment of use, and `refusalText` fills it. What is unsettled is whether an alert document should carry a second large property of that kind beside `description`, or whether an alert's description should itself become a refusal-shaped body, and which of the eleven would then still need a hole at all.
