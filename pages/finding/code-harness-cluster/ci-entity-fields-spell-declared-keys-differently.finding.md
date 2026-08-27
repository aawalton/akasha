---
id: 61ad61a2-75df-5d9b-aada-fca994fd8e36
slug: ci-entity-fields-spell-declared-keys-differently
page-type-slug: finding
title: "CI entity fields spell seven declared keys differently"
domain-slug: domain/global
---

# Claim

Seven fields on the CI entity types are spelled differently from the property keys the page types declare. The code reads the declared key and writes the differently-named field, so nothing is broken, but one concept carries two spellings across roughly 650 occurrences.

# Evidence

The pairs, entity field against declared key:

- `podName` against `container-name`
- `failReason` against `failure-reason`
- `supersededBy` against `overtaken-by-seq`
- `relaunchNotBeforeMs` against `relaunch-not-before`
- `admissionRejectedReason` against `launch-refused-reason`
- `alwaysRun` against `always-runs`
- `deployedCommitSha` against `deployed-commit`

A blind sweep of these is unsafe, and one case shows why. In 36 of the files, `podName` is the Kubernetes pod name — a different concept belonging to another domain, correctly spelled where it stands. `Ubiquitous Naming` exempts a word that belongs to one domain repeating under another. A rename that could not tell the two apart would rewrite both, and the result would typecheck: a silent corruption carrying a green light, in hundreds of places.

The coercion layer currently reads the declared key and writes the existing field name, so the page contract is correct and only the entity vocabulary differs. That is why this is drift rather than a defect.

Found by the seat re-keying the CI readers, which enumerated the declared keys against the property documents and declined the rename rather than sweeping it. Left undone deliberately: it serves tidiness rather than the migration, and a sweep of this size is the exact shape of the hazard that has produced most of the real defects in this work.

Whoever takes this needs a judgement on the `podName` ambiguity before touching a single file.
