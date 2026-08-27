---
id: cf58c8df-afb0-551b-8601-e1e5dc4a7e10
slug: removing-a-domain-strands-its-persona
page-type-slug: finding
title: "Removing a domain strands its persona"
domain-slug: domain/domain-system
---

# Claim

Removing a domain does not check whether a persona owns it. `ops instructions rm` reports `[governs] nothing being removed governs a region or is named as a domain parent`, and `tools/checks/domain-edges.ts` exits 0 while a persona's `championed-domain-slug:` names a document that is gone. A persona is left owning nothing, and the two things that would say so both pass.

# Evidence

Measured 2026-08-17 by causing it.

`ops instructions rm domains/narrative-abstraction.md` landed as commit `94a424bc`. Its gate output reported `[governs] not-applicable — nothing being removed governs a region or is named as a domain parent`, `[links] 2860 document(s) checked — 0 link(s) would break`, and `[mentions] 5453 file(s) checked — 0 mention(s) would be stranded`.

At that moment `domains/personas/rhia.md` carried `championed-domain-slug: narrative-abstraction`. After the removal it named a document that no longer existed. `bun tools/checks/domain-edges.ts` exited 0 against that state.

`[mentions]` checks 5453 files and did not count this one, so the key is not read as a mention of the slug. `[governs]` reads a domain parent and an instructions-path region, and ownership is neither.

Repointed to `narrative-lore` in commit `ce5c2307`, per Alan's ruling of 2026-08-16. Nothing reported the window between the two commits, and nothing would have reported it had the repoint never come.
