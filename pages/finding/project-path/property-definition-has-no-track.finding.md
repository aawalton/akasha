---
id: 28e99d60-6a8c-52fa-bbfd-46b5f8a2c1ac
page-type-slug: finding
title: "Property definition has no track"
domain-slug: domain/global
---

# Claim

Minting a property-definition is carried by none of the seven tracks. It reaches production through no branch, no CI and no deploy, and is not an instructions landing either, so a row needing one lands part of its work outside its own track and nothing reports it.

# Evidence

Measured 2026-08-01 by the define pass on project #17445, which needed a `instructionsOnly` property-definition for the landing axis and found no track that carries one.

Property-definitions exist only as database rows minted by `ops property-definition create`. `page_create` and `pages_bulk_upsert` refuse the slug by name, so no code path reaches one. The parent row's notes had cited `ciFixPriority` and `ephemeral` as precedents to copy from; neither has a declaration anywhere in `~/code`, which is the same fact arriving as an absence.

The two axes the tracks are built on both answer wrong here. The landing axis asks whether a change is live the moment it commits or reaches production through a branch, CI and a deploy — this is neither: it is live the moment the verb runs, and nothing commits. The shape axis is unaffected, so the row carrying such a mint looks like an ordinary deploy row throughout, and its deploy will show nothing of the part that already landed.

What follows is that verification has no home either. The mint is observable only by query, so a row's own `verification_predeploy` and `verification_postdeploy` rungs both pass without ever touching it, and a hand-back that says the deploy is verified is true and incomplete at once.

The rows now say so in prose — #17453 states that whoever holds it names in the hand-off what was minted and how it was verified, because nothing in the deploy will show it. That is a workaround on one row, not a track.
