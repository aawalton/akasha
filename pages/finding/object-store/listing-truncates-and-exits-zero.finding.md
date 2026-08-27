---
id: df0775b6-7386-56ad-a089-b3711987b7a4
page-type-slug: finding
title: "Listing truncates and exits zero"
domain-slug: domain/object-store
---

# Claim

A recursive listing through the object-store gateway returns a prefix of the keyspace and exits zero, so a sweep that stopped early is indistinguishable from one that saw everything.

# Evidence

The claim stood on `domains/object-store.md` as part of its `# Vision` until 2026-08-05, written as a settled fact about the gateway. It was cut in the pass that produced this finding, on the reasoning that a defect discovered in a gateway is an observation rather than a decision the domain took — so cutting it without filing it would have destroyed the only record of it.

NOT REPRODUCED BY ME. I did not run a recursive listing against the gateway, and I did not write the original claim. What I can say is that nothing else now carries it. Whoever picks this up should start by reproducing it, because a claim of this shape turning out to be false is worth as much to know as it holding.

WHY IT MATTERS IF TRUE. `Population` on `domains/instrument.md` requires an instrument to state what it measured and to fail where it could not measure anything, because one that looked at nothing exits beside one that found nothing. A listing that silently returns a prefix and exits zero defeats that from underneath: an instrument built on it satisfies `Population` in form, stating what it measured, while the figure it states is a floor it has no way to recognise as one.

The consequence named in the original text was that listing is not a route back to a lost key. If that holds, an object whose key nothing live still references is unreachable in practice, and no sweep over the store can be trusted to find it.

Code that would settle it: `packages/infra/seaweedfs/**` and `packages/agents/shared/object-*.ts`, the paths `domains/object-store.md` declares as its `code-path:`.
