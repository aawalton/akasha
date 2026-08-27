---
id: a13a0eb8-4d8f-53fb-a91f-6cee2a6ebcb0
page-type-slug: finding
title: "Move block chords unverified"
domain-slug: domain/design-system
---

# Claim

The design-system standard's L0 Reserved-chords table asserts which chords macOS claims for move-block operations, and those specific assertions have not been verified against real macOS behaviour.

# Evidence

Parked during #15803/#15856 and filed now because a prose-only follow-up never reaches a dispatch surface. The standard's L0 Reserved table asserts which chords macOS claims; the move-block chords are the ones the filer was least certain of. If the table is wrong it silently misleads every future binder, since the doc is the spec agents read -- so this is doc-correctness, not polish. Resolution requires checking real macOS behaviour; Alan's machine is the only Mac available, making this a likely manual-verification ask rather than something resolvable from Linux. Described as small. Project #16106, status someday_maybe, live-on: deploy, domain design-system.
