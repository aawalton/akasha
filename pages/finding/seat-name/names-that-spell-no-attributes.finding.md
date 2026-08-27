---
id: 1212a385-9c70-5864-a9eb-3b076e3e013f
page-type-slug: finding
title: "Names that spell no attributes"
domain-slug: domain/seat-name
---

# Claim

A seat name is defined as what a seat's attributes spell, and a whole family of live names spells a subject instead and keeps the name it was given.

# Evidence

`packages/agents/shared/agent-name-families.ts:49-80` enumerates families standing beside the composed one: human, bare-persona, seated-persona, project-scoped, project-scoped-indexed, instanced-seat, suffixed-runner, persona-campaign.

`tools/lib/seat-help.ts` names `amy-calendar` and `awen-gm--the-tower` as seats keeping the name they were given rather than one their attributes spell.

Even within the composed family the name is a subset: `tools/lib/compose-seat-name.ts:102-107` keeps task, mode and initiative out of every name, and `:20-30` drops any segment equal to the persona's own default.
