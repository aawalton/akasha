---
id: 04012b24-d672-57f0-a761-03efe0039266
page-type-slug: finding
title: "Persona domain reads conflation"
domain-slug: domain/agent-harness
---

# Claim

`readsOnLoad` on a persona row conflates persona-specific reads with domain-level boot reads: of 71 entries measured, 30 are domain paths parked on the persona dimension for lack of a domain-level carrier. A full-corpus classification of the `conduct` property across all 40 personas (329 passages) found only 6% register-bearing content against 90% for `portrait` on the same authors and sessions — evidence of a missing dimension rather than drift.

# Evidence

Project #17313, domain `agent-harness`, status someday_maybe, live-on commit. Captured, not defined.

The gap: `readsOnLoad` on a persona row conflates persona reads with domain boot reads. Of 71 entries measured: 7 role-side, 1 universal-persona seam, 30 domain paths — boot reads for a domain, parked on the persona dimension for want of a carrier.

Why relocating cannot fix it: the destination is a domain's skill, owned by its lead, with Alan. Relocating the 30 paths means authoring into ~14 domains without their leads — negotiations no single tree can hold. That is the tell: the dimension is missing, not the filing wrong.

Shape that removes the class: one boot-reads carrier per domain, curated by its lead, read by any seat bound there regardless of persona. This also settles what relocation cannot: a persona-less domain's seats read nothing today, its only carrier a persona row it lacks.

Held at exploration: whether domains want a boot-reads carrier at all, or a domain's skill already IS that carrier and the 30 entries duplicate existing routing — comparing the 30 paths against what skills route to would decide it.

Corroborated by a second measure: #17274 classified 137 `conduct` passages across 20 of 40 personas: DOMAIN 56 (41%), ROLE 37, MIXED 28, REGISTER 15, 1 unsure — ~110 domain-shaped, no home. Five (aranya, astra, elin, ember, vera) had no register-bearing passage.

SETTLED at full corpus, 40 of 40: `portrait` 372 passages, 335 (90%) REGISTER, 1 ROLE, 3 DOMAIN, 32 MIXED. `conduct` 329 passages, 19 (6%) REGISTER, 103 (31%) ROLE, 141 (43%) DOMAIN, 65 MIXED. Same authors, sessions, doc — 90% vs 6% register; a missing dimension, not drift, predicts this. #17274 recorded predictions first: drift predicted few zero-register blocks, a missing dimension a steady rate — the second half ran higher (26 of 39 with a conduct block have no wholly-register passage; 9 of 40 keep nothing).

Moved off the row's retired `notes` attribute on 2026-08-15.
