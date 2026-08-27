---
id: 7283b30c-4253-598c-a34d-22cd5c3107ef
page-type-slug: finding
title: "Pinned test ambiguous chosen or observed"
domain-slug: domain/test
---

# Claim

A pinned test is ambiguous between recording a behaviour its author deliberately evaluated and chose, and one it merely encountered and fixed in place: the artifact is identical either way, so deliberateness is read into every pin for free, and a pin of an unevaluated encounter is harder to reverse than the unpinned behaviour would have been because reversing it now reads as overriding a judgment nobody made.

# Evidence

Project #16538 (domain test, status someday_maybe). Generalised from a live reversal in #16493's tree, reported by project-16493, on 2026-07-27.

Instance: #16494 pinned an ordering between two error checks in `decide-ladder-transition.ts`. A later child, holding an enumeration the first one never had, found the ordering produced a sink — rows on the other species' ladder could not move at all, including to be closed, because the unlocatable-`from` refusal fired before the abandon check. Existence Check decided it and the pin was reversed. #16494 was not careless: it believed it was choosing which of two error messages was more useful, not creating a sink, and had no way to see that from where it stood.

General defect: pinning behaviour CHOSEN is a different act from pinning behaviour OBSERVED, and the artifact is identical either way. The reader cannot distinguish the two. A pin of an unevaluated encounter is a decision nobody made, wearing the costume of one, and is harder to reverse than the unpinned behaviour would have been.

Why a domain project: every pinned test in the repo carries this ambiguity. Related to the probe-vs-pin finding already in `findings.md` (that one is about a pin that stopped running; this one about a pin that never carried its warrant). Not yet diagnosed: whether the remedy is a convention on the test, a structural one, or narrower than "every pinned test." Nothing here has been counted — one observed instance plus the shape of the artifact, a hypothesis not a census.

RE-HOMED to thea (code-quality) on 2026-07-27 by athena-intake: the fix is a test-authoring convention, no agent surface touched; testing doctrine is code-quality's remit, not agent-harness's.

Row captured but never defined; moved off the retired `notes` attribute on 2026-08-15.
