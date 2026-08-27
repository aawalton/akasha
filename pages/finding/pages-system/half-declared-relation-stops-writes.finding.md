---
id: bc6b0791-0e1d-5360-a89d-1f144cdac3bd
slug: half-declared-relation-stops-writes
page-type-slug: finding
title: "Half declared relation stops writes"
domain-slug: domain/pages-system
---

# Claim

Retiring one half of a page-type relation attribute breaks every write to both page types, and nothing warns before or during the change.

# Evidence

Reported by #17626's seat and recorded here on its account, with the outcome verified by the lead.

`claimedAgent` on the project page type was the back property of the agent page type's `claimedProjects`. Retiring `claimedAgent` alone left the pair half-declared, and every write to an agent row then failed with `_page_relation_props: ... but it is not declared`. The fleet could not write an agent row for roughly two minutes.

The seat caught it on its own `ops project finish` rather than from any warning, and restored the pair by also deleting `claimedProjects` and `releasedProjects`. The lead confirmed the end state: property definitions `Claimed Agent`, `Claimed Projects` and `Unclaimed Exploration` are all soft-deleted, and `Capability Claimed` is unrelated and stands.

Nothing announced the coupling. The retirement of a single attribute reads as a local change to one page type, and the failure surfaces on the OTHER page type, on writes that have nothing to do with the attribute removed.

The blast radius is what makes this worth a record rather than a note. Agent-row writes are how seats are minted, named, claimed and released, so a half-declared relation stops the fleet rather than degrading it, and it does so on the next write rather than at the moment of the change.

Verified separately by the lead, and NOT a hazard: 6,230 project rows still carry the now-undeclared `claimedAgent` attribute as legacy data, and a write to such a row succeeds. `ops project revise` on #17625, which carries it, landed and was reverted. So leftover undeclared DATA is tolerated; it is the half-declared RELATION that breaks.

Not verified: whether any tooling can detect a half-declared relation before the write that fails, and whether other relation pairs stand in the same shape.
