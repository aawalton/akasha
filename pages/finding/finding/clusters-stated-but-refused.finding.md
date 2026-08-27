---
id: 11a19c78-d42a-585c-b99d-28cd4086ea3c
slug: clusters-stated-but-refused
page-type-slug: finding
title: "Clusters stated but refused"
domain-slug: page-type/finding
---

# Claim

`domains/finding.md` states that a domain outgrowing one listing holds clusters beneath it, and the machinery refuses exactly that: no finding may sit more than one folder under the store.

# Evidence

`domains/finding.md:16` — "a domain whose findings outgrow one listing holds clusters beneath it" — and its `memory-path: findings/**/*.md`, widened deliberately at `af454ff4` to "claim findings at any depth, ahead of the foldering".

Against that, `tools/checks/sorted-by-domain.ts:63-82` fails any finding more than one folder under the store, with the reason "A cluster beneath a domain is undecided, nothing naming one being settled yet". `tools/tests/sorted-by-domain.test.ts:86` pins that case, `rehome-finding` refuses a `--file-path` that is not `findings/<domain>/<name>.md`, and `file-finding` writes only there.

Both ends were written deliberately, so this is not one side drifting: the domain states clusters as settled design and the instrument states that nothing naming a cluster is settled. Measured today, the store holds 194 findings under 41 domain folders and none nested, so nothing is currently refused in practice. Resolving it means either cutting the clause or building cluster support.
