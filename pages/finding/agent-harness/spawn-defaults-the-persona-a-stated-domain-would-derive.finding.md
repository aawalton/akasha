---
id: c5461529-c776-54b3-9a21-469d835c34ab
slug: spawn-defaults-the-persona-a-stated-domain-would-derive
page-type-slug: finding
title: "Spawn defaults the persona a stated domain would derive"
domain-slug: domain/agent-harness
---

# Claim

`ops seat start` defaults the persona to `claude` where `--domain` is stated and `--persona` is not, rather than deriving her from the domain. The derivation exists and works — `resolveDomainLead` — but only one caller uses it, and every other spawn states a domain and gets a seat governed by a persona nobody chose. The spawn reports success and the composed name reads complete.

# Evidence

Two seats dispatched onto #19213 and #19177 on 2026-08-15, each with `--domain alert --role developer` and no `--persona`. Both came up as:

    claude-alert-developer-build-child-commit-19213   persona: claude
    claude-alert-developer-build-child-deploy-19177   persona: claude

`resolveDomainLead("alert")` answers `{"kind":"lead","handle":"athena"}` — `alert` sits under `message` under `agent-harness`, which states `persona-champion-slug: athena`. So the right answer was reachable and nothing asked for it.

`tools/lib/message-to-start.ts` shows the compensating shape: `startSeat` calls `resolveDomainLead(domain)` itself, passes `--persona lead.handle` explicitly, and then refuses to deliver where the spawned name does not start with that handle. That refusal exists because its author knew the spawn would not derive.

Repaired by stating the attribute on each row — `echo '{"agent":"<id>","persona":"athena"}' | bun tools/seat-call.ts` — after which both names moved to `athena-alert-…`. The seats had already booted, so each ran its first turn governed by the default rather than by Athena.

What makes this a trap rather than a slip: the spawn is legal, exits 0, and prints a name that spells three of four attributes. Nothing distinguishes a seat whose persona was chosen from one whose persona was defaulted, and the same seat is addressable either way — so a domain-and-role message still reaches it and the fault never surfaces through delivery.

Filed by the seat that made the mistake, hours after repairing three rows damaged by a related defect in the same verb family.
