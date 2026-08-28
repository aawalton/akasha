---
id: d4b108ec-a499-56a5-9e8a-bc04f9d930ef
slug: build-rows-never-linked
page-type-slug: finding
title: "Build rows never linked"
domain-slug: domain/temper
---

# Claim

Temper's build feature (character-build / companion-build) has no sync path that creates or links a build row to an ESO character; for Alan's only real account the sole build row, created 2026-05-04, carries an empty `esoCharacterId` (hard-coded null at `inventory-plan-helpers.ts:252`).

# Evidence

Filed by ember, 2026-07-25T08:51 UTC, as project #15938 (domain temper). Re-ran the row's negative claim against the database rather than the code.

Server-side exact counts (`ops page list --count`): control temper-task 24, temper-net-worth-snapshot 2724 (instrument discriminates). character-build 12, companion-build 6, temper-build-version 0.

createdAt/userId census: 11 of 12 character-build rows and all 6 companion-build rows were created 2026-07-24T21:29–2026-07-25T04:15, during the audit's own run. 17 of 18 rows belong to throwaway accounts (4ee54543, bb51afa8). Exactly one belongs to Alan (userId 9ba554f7): a character-build row created 2026-05-04T14:11, empty esoCharacterId — unlinked to any ESO character.

For the only real user the Plan tab has one build row, 2.5 months old, unlinked — consistent with the original claim that no sync path creates or links a build row. Corroborating code: `inventory-plan-helpers.ts:252` hard-codes `esoCharacterId: null`. The defect is the linkage, not the existence.

Methodology lesson: an audit that writes fixtures into the store it audits poisons its own evidence, and the poisoning grows over the run — the table held 1 row 18h before the audit, 18 by the end, 17 of them the audit's own. A row count is not evidence about the product until its createdAt spread is checked against the audit's start time (aine's "one control, two claims"). Caught by reading createdAt after empty titles looked odd.

Positive, verified: all 17 fleet-created rows landed on throwaway accounts, zero on Alan's (17 of 17) — the read-only-live-credentials rule was followed all night, first time checked rather than trusted.

A later note (implementer, 2026-07-25T12:21) states the row was "PARKED at verification_automated... product half is ONE question for Alan," then continues with apparently unrelated content about a commitHash reconciliation, truncated before its point.
