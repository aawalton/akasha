---
id: af7cbda8-c238-5ec8-9c78-c334835bfc8f
slug: hex-only-names-resolve-as-uuid-prefixes
page-type-slug: finding
title: "A hex-only seat name is resolved as a uuid prefix and never as a name, though a seat can hold it"
domain-slug: domain/seat-name
---

# Claim

A name of thirty-two characters or fewer whose characters are all `[0-9a-f]` once its hyphens are removed is resolved as a UUID prefix and never as a name, though `isValidAgentName` accepts it and a seat can hold it.

# Evidence

`planAgentResolution` in `packages/agents/shared/db-agent-resolve.ts` tries `planPrefixResolution` before `isValidAgentName`, and `planPrefixResolution` strips every hyphen before testing `/^[0-9a-f]+$/`. The guard meant to keep the two apart — a name over seven characters must carry a character matching `/[g-z-]/` — counts the hyphen itself as the non-hex character, so any hyphenated name of hex letters passes it and is still swallowed by prefix resolution.

Measured against the file as #19416 left it: `abc123`, `19415` and `19415-0123456` are each accepted by `isValidAgentName` and each planned as `{ kind: "prefix" }`. `19415-seat-assignment-lead` and `19415-seat-presence-developer-build-singleton-deploy` are planned as `{ kind: "name" }`, and `19415678` is refused by the validator outright.

The class is older than #19416, which only widened it: before that change a name had to begin with a letter, so `abc123` was in it and a bare project seq was not. A seat spells a bare seq only where it states a project and no domain, role, flex or task, and every real domain and role slug so far carries a letter past `f`, so nothing is known to hold such a name today.
