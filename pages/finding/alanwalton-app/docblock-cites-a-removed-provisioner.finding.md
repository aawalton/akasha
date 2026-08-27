---
id: 0b3eef71-032d-5c3b-b625-0a56b460e410
slug: docblock-cites-a-removed-provisioner
page-type-slug: finding
title: "Docblock cites a removed provisioner"
domain-slug: domain/alanwalton-app
---

# Claim

Two live docblocks in `packages/alanwalton/web/app/lib/home-dni.server.ts` cite `ensureRosterDni` as the standing convention the file mirrors, and no function of that name exists anywhere in the code repository — it was removed thirty-four days before the file was last touched, so the convention the second citation defers to is now stated nowhere.

# Evidence

`packages/alanwalton/web/app/lib/home-dni.server.ts` is tracked and live. Line 7 opens its shape docblock: "Shape (mirrors `ensureRosterDni`, deliberately simpler — no locks, no backHref, no gallery/moment reconcile, no card-page-type resolution)". Line 27 reads: "`sort_order` — matches the existing DNI/view conventions (`ensureRosterDni`)."

`rg -uuu -n "ensureRosterDni"` over `packages/` returns exactly those two lines and nothing else — no declaration, no import, no call site. `-uuu` because the claim is an absence; exit 0, both hits being the comments themselves.

The symbol was removed on 2026-07-05 by `9c5e9f2b1c3bd2fd00c0d1875b52492be5e34710`, "refactor(#14649): remove dormant server-side roster/lineup nav-DNI projections, nav routes, rateContribution + contribAnchorMs". Found with `git log --all -S "ensureRosterDni" -- packages/`. The same commit removed `ROSTER_NAV_LOCKED`, for which `rg -uuu` now exits 1 anywhere in `packages/`.

The two citations fail differently, and the second is the one that costs. Line 7 names a removed sibling to contrast against, so a reader loses only the comparison. Line 27 defers the authority for a real decision — what `sort_order` a provisioned nav and its views get — to that removed function, so a reader checking why the numbers are what they are follows the pointer to nothing. `rg -n -i "sort_order"` over `~/instructions/domains/` exits 1, so no live document states the convention either.

Nothing reports this, because a comment naming a deleted symbol still compiles and still reads as a citation.

Distinct from `pages/finding/tests/smoke-test-doc-citations-dangling.finding.md`, which I opened before filing: that is live code citing DOCUMENTS this sweep removed. This is live code citing a SYMBOL a code-repo refactor removed, so neither the cause nor the repair is shared.
