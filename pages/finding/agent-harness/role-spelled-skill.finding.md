---
id: e8185a0c-a92f-5082-b7d2-3ca79c4fddef
page-type-slug: finding
title: "Role spelled skill"
domain-slug: domain/agent-harness
---

# Claim

The code repository calls a role document a "role skill", which is a second spelling for `role`.

# Evidence

Thirteen sites in `packages/agents` alone, every one in the present tense:

- `cli/src/agent/skill-token-guard.ts:6` — "moved to the four-layer role skills (`lead` / `manage` / `deliver`)"
- `cli/src/agent/skill-token-guard.ts:41` — "Running a domain is the `lead` role skill"
- `shared/worker-status.ts:7` and `shared/verification-review.ts:6` — "the dispatch briefs written under the `lead` role skill"
- `shared/agent-roles.ts:75` — "neither is a role skill and neither ever will be"
- `shared/agent-name-families.ts:220` — "the awen-* role skills"
- `shared/name-claim-guard.unit.test.ts:319` — "Every role skill now instructs a seat to re-assert the name it already holds"
- `routing-core/ki-handler-spec.ts:62` — "The `handler` role skill, bound to Ki. The `ki` domain skill carries the surface she is authorized to reach"
- `routing-core/on-demand-agent-spec.ts:101`, `routing-core/persona-capture-helpers-spec.ts:6`, `cli/src/agent/skill-token-guard.unit.test.ts:10,64`

Three more stand outside that tree, in `packages/alanwalton/` and `packages/infra/`.

`lead`, `manage`, `deliver` and `handler` are roles. `domains/roles/lead.md` declares `domain-slug: lead` with `domain-parents: role`, and `domains/role.md:13` defines a role as "a bounded set of responsibilities an agent is answerable for". The referent of every phrase above is live; only its carrier moved.

What moved is stated in the same tree. `cli/src/agent/skill-token-guard.ts:91` reads "The estate's skills were retired from the loading path (#17353), so no estate slug resolves". So the file kind called a skill no longer exists, while the thing it carried does, under a different name in a different repository.

`domains/` contains zero occurrences of `skill`, case-insensitive, across every document declaring a `domain-slug`. The second spelling exists only on the code side.

The same construction runs on two further axes: "domain skill" (`ki-handler-spec.ts:62`), and "persona skill" (`packages/alanwalton/personas/cli/src/persona/reward-prompt.ts:39`, `daily-standing.ts:13`).
