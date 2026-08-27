---
id: bf89e635-43e6-59ca-b7a3-3bb37971e15a
page-type-slug: finding
title: "Layers without owners"
domain-slug: barred-meaning/foundational-layers
---

# Claim

`events-system` and `graph-system` are foundational layers with no persona owning them. Anything resolved by exact match on those domains reaches nobody.

# Evidence

Neither `domains/events-system.md` nor `domains/graph-system.md` carries a `persona-champion-slug:` key. Every other layer in `foundational-layers`' own `sequence:` does.

This surfaced twice while migrating alert conditions to state the domain they are about. `subscriber-lag` is genuinely an events-system condition and had to be filed to `code-harness` instead, because stating its true domain would have resolved to nobody. `child-crashloop` reached the same gap from the other side.

Ownership descending through a parent does not close it: the lookup that resolves a domain to a persona, `resolveDomainLeadOrDefault` at `tools/lib/kill-alert-send.ts:54`, filters persona rows on their own domain attribute by exact string equality rather than walking upward.
