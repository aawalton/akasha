---
id: dbb2b457-862a-5bf8-9d79-b3f0275c4687
slug: project-show-help-names-a-relation-it-no-longer-resolves
page-type-slug: finding
title: "Project show help names a relation it no longer resolves"
domain-slug: domain/ops-cli
---

# Claim

`ops project show --help` says relation properties "(parentId, dependsOn, blocks, children) are resolved from page IDs to `{seq, title}` objects". `children` has not been a resolved relation for some time — it is derived at read time from the `parentId`-keyed resolver.

# Evidence

Found 2026-08-13 by the seat that moved `ops project show` into this repository.

The help block was carried across exactly as it stood, per the migration's rule that a surface is not repaired while its body moves — a change made there cannot be told from the move afterwards. So the inaccuracy now stands in both repositories rather than one, which is the reason to write it down rather than leave it.

What a reader takes from the current wording is that `children` is fetched and resolved like the other three. It is not; it falls out of the parent resolver. The practical consequence is small and the confusion is not: someone reasoning about read cost or about what a missing `children` value means will reason from the wrong mechanism.
