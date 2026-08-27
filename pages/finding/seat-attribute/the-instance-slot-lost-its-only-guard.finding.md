---
id: a5a0b1b9-76da-5b3e-a064-e36128550bf4
slug: the-instance-slot-lost-its-only-guard
page-type-slug: finding
title: "The instance slot lost its only guard"
domain-slug: domain/seat-attribute
---

# Claim

The `instance` slot on an agent row is unconstrained at the write boundary. It was the one seat attribute the agent page type's coherence rules closed that no `config.options` list also covers, so removing those rules in #18086 left it guarded by nothing. `AGENT_INSTANCE_VALUES` records the estate's two spellings in code and nothing refuses a third.

# Evidence

Observed 2026-08-07 by athena, verifying #18086, and surfaced by the delivering seat rather than found afterwards.

#18086 removed the agent page type's `coherenceRules` because their `valueIn` lists were a projection of a living corpus, so any renamed slug branded every row still holding it permanently unwritable. Five of the six slots those rules closed — role, domain, persona, task, mode — are also written as `config.options` lists by `ops seat project-seat`, and `ensure-select-options-valid.ts` refuses an out-of-vocabulary write against those, checking the incoming value alone. `instance` had no such list, so it lost its only guard.

The distinction that made the removal right does not apply to this slot. The harm came from validating a whole settled row against a vocabulary that moves several times a day; `instance` is a closed enumeration written in code, the same shape as `faucet-coherence`'s `["bytes", "sum", "count"]`, where a value leaves only when somebody edits the file on purpose. A closed enum is the case whole-row `valueIn` never hurt.

So the safe use of the mechanism went out with the unsafe one, and what replaces it is a decision nobody has taken: an option list written from `AGENT_INSTANCE_VALUES`, a coherence rule restored for this slot alone, or nothing on the ground that two spellings have never been miswritten.
