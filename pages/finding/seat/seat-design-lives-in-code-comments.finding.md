---
id: 8e52b167-1bec-53f4-acc5-418e6378510b
slug: seat-design-lives-in-code-comments
page-type-slug: finding
title: "Seat design lives in code comments"
domain-slug: page-type/seat
---

# Claim

Substantive decisions about what a seat is are argued at length in code comments, and stated nowhere a reader of the domain would meet them.

# Evidence

In the instructions repo: `tools/lib/compose-seat-name.ts:43-66` on why name distinctness is the exclusion; `tools/lib/seat-rename.ts:1-41` on a name stating what a seat is, and on a refusal stopping everything while an outage degrades to a local write; `tools/lib/attributes.ts:1-70` on the compaction separation and why mode is not an attribute; `tools/lib/hold-seat.ts:1-58` and `tools/hooks/hold-seat.ts:1-94` on the whole enforcement doctrine; `tools/lib/seat-seq.ts:1-31` on one seq never a set; `tools/lib/seat-records.ts:1-33` on recorded-never-required; `tools/hooks/block-headless-halt.sh:4-52` on what a headless turn-end means; `tools/compose-boot.ts:1-30` on a prompt-embedded body counting as read.

In the code repo: `shared/persona-facts.ts:1-45`, `shared/compose-identity-name.ts:30-81`, `shared/agent-coherence.ts:28-45`, `shared/name-claim-guard.ts:20-57`, `shared/agent-instance.ts:1-22`, `shared/agent-dormancy.ts:1-30`, `supervisor/src/supervisor-resume-notices.ts:1-35`, `shared/mint-named-agent.ts:1-42`, `shared/decide-blocked-principal.ts:1-47`, `shared/agent-roles.ts:1-40`.
