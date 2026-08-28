---
id: 9d196f8c-a2be-57d7-a553-eb79171755d1
slug: template-departure-uncaught
page-type-slug: finding
title: "Template departure uncaught"
domain-slug: domain/collections
---

# Claim

Membership of the `collection-template` page type is carried by `extendsPageTypeId` alone, and nothing notices a collection-shaped type that declines it. A type extending `page-type` directly is indistinguishable at creation from one that should extend the template; the cost appears later as a shelf whose progress cannot be read. Two live types are there — `chess-puzzle`, at 5,000 rows the largest shelf outside the template, which invented a private `solved` boolean and filled it once, and `movie` at 3.

# Evidence

Measured live on 2026-08-07 against production.

`collection-template` has 29 direct descendants by `extendsPageTypeId`, and membership is
also transitive — `reading-story` (146 rows) extends `story`, which extends the template.

`chess-puzzle` holds 5,000 non-deleted rows. Exactly **1** carries `solved`. None carries
`progress`, `status` or `completedAt`. `movie` holds 3 rows and carries none of the three
either; the `status` on its rows is TMDB's release status, not the shared completion
vocabulary. Both extend `page-type` directly.

Nothing enforces conformance. `ops enforcement list` names no check on template
membership; its `readonly-collections` entry is `check-readonly-collections`, a TypeScript
readonly-array check unrelated to this. `rg --multiline 'extendsPageTypeId'` across
`packages/infra/checks` and `packages/shared/pages`, excluding `node_modules` and `dist`,
returns only the procs that read and write the key and an attribute-index snapshot — no
rule about which types must set it. The one live `collection-template` mechanism is
`packages/shared/pages/core/src/schema/collection-coherence.ts`, enforcing `completedAt`
present ⇒ `progress == length` on the template **and its descendants**, which by
construction says nothing about a type that never joined.

Not a member of this class, by Alan's ruling carried in the source: `exercise` (884 rows,
also extending `page-type` directly) is not a collection in the same sense — a reference
library drawn from repeatedly rather than a shelf worked toward done. The boundary
between a defect and not-a-collection is a judgment only he makes.

Raised by an archivist seat emptying `dirty/skills/collections/findings.md`, which stated
this twice in one document and whose surrounding counts have drifted (30 direct
descendants recorded, and `game` at 89 rows against 12 today). That file is queued for
removal, so this outlives the sweep.

Not judged: whether the repair is a check at type creation, a migration, or neither.
