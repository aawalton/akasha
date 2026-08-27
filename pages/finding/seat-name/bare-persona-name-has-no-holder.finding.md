---
id: ab5643a5-baee-57c1-8046-e0d5411989db
page-type-slug: finding
title: "Bare persona name has no holder"
domain-slug: domain/seat-name
---

# Claim

A rule that routes a decision to a persona's bare name has nowhere to send it unless a seat happens to hold that exact name, and spawning that persona does not produce it.

# Evidence

On 2026-08-15 a check suppression had to be routed to dalla, as Check Suppression on `domains/repos/code-repo.md` requires. `ops seat gate-block --seq 18824 --holder dalla` refused outright: "no agent named 'dalla' — a request routed at a name nothing holds is the stall this record exists to surface". `ops seat block-on` refused identically. So the rule sending every check suppression to her had nowhere to send one, and the refusal is correct — it is the stall, not a fault in the verb.

SPAWNING HER DID NOT FIX IT. `ops seat start --persona dalla` produced a seat named `dalla-global-worker`, not `dalla`, and `agent session dalla` still answered that nobody held the name. A seat's name spells every attribute it states, and the domain and role a persona holds BY DEFAULT are dropped only when they are the ones stated — so stating the persona alone takes the global defaults and spells those. The bare name required restating her own defaults explicitly: `--name dalla --persona dalla --domain code-harness --role definer`, read off `championed-domain` and `role` in `domains/personas/dalla.md`.

WHAT THAT COMBINATION MEANS. Every rule routing to a bare persona name depends on somebody having spawned that persona with her own defaults restated. Nothing checks that, nothing reports it, and the first sign is a refusal at the moment a decision needs a holder — which is the moment least suited to discovering it. The seat that meets it is blocked, and the correct-looking act is to route the decision somewhere it does not belong.

Cost here was several turns and a seat spawned twice-named. The decision itself was never at risk, because the refusals were loud. A rule routing to a name whose holder was merely STOPPED rather than absent would be the quieter version of the same fault.
