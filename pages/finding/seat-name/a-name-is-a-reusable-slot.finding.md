---
id: 92e8b72f-843a-5aa9-ac26-34575c1787d0
page-type-slug: finding
title: "A name is a reusable slot"
domain-slug: domain/seat-name
---

# Claim

Retiring a seat releases its name back into the name space for another seat to take, so a name is a scarce reusable slot as well as a function of attributes.

# Evidence

`packages/agents/shared/db-agent-mutations.ts` carries `releaseRetiredName`, run as part of retiring a row.

`shared/db-agent-list.ts:18-25` holds that a stopped seat is revivable and a retired one is not, and that nothing revives either automatically.
