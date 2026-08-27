---
id: e8404803-0d96-53f0-9b4e-dbf9165e0df2
page-type-slug: finding
title: "Automation loader unscoped unverified"
domain-slug: domain/pages-system
---

# Claim

Two automation loaders — `packages/automation/orchestrator/src/index/automation-index-loader.ts:39` and `packages/automation/scheduler/src/load-schedules.ts:50` — call the pages loader with no `userId` predicate and `limit: 1000` under service-role/RLS-bypass, loading every tenant's automations into one collection, and whether this is a defect depends on an unverified question: whether the code consuming that collection re-establishes the owner boundary before acting on a row.

# Evidence

Project #16010 (domain `pages-system`). No objective; moved off the row's retired `notes` attribute on 2026-08-15.

Provenance: surfaced by ember sweeping the unscoped-service-role-query class for #15963. Placed here by athena, not ember — an instance of #15971's own class, which carries the four-shapes analysis deciding whether it is a defect at all.

The two sites, verified by reading the code: `packages/automation/orchestrator/src/index/automation-index-loader.ts:39` and `packages/automation/scheduler/src/load-schedules.ts:50`. Both call the pages loader with no `userId` predicate and `limit: 1000` under service-role/RLS-bypass, loading every tenant's automations into one collection.

The unverified half that decides everything: an unscoped load is a defect only if the match omits the owner check (#15971's shape 3: partition by userId, never narrow — correct where a service needs every tenant's rows). #15971 measured a blanket sweep would convert 63 correct sites into bugs. Deliverable: per site, does the consuming code re-establish the owner boundary before acting? If not, one tenant's automation can be run under another's identity — the automation-domain twin of #15963. Ember verified the load and stopped, not owning this domain.

Why not neutral: #15963 is the same shape one domain over, where the match half did omit the check — a throwaway account created 4 `temper-character` rows at 06:41Z, and 58s later 12 of Alan's `temper-task` rows were repointed at a stranger's character (same incident as project #15998), unrecoverable since `temper-task` carries no versioning. Such a query is right by accident and stays dormant until a second tenant exists; the audit fleet saw #15963 fire in 61 seconds, and Temper was onboarding its first external user at the time.

Second, separable defect, same lines: `limit: 1000` with no truncation handling — a 1001st automation is silently absent, same class as #15962's 13 watcher sites, real regardless of ownership.
