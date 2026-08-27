---
id: 921b36f5-b4f1-5477-9fd6-ff0e0420ae8b
slug: grant-constraints-outlive-their-commands
page-type-slug: finding
title: "The constraints the three person writers enforced now stand in no live document"
domain-slug: domain/person-enrolment
---

# Claim

The constraints the three person writers enforced now stand in no live document, and the records they wrote are pages that go with the store.

# Evidence

Taken 2026-08-19, closing the two-command namespaces in the ops census. `ops person enrol`, `ops person-access grant`, `ops person-authority grant` and the three `seed-page-type` commands beside them were removed at Alan's direction, to be rebuilt file-based. Their code was deliberately left standing.

There is no `person`, `person_access` or `person_authority` table — `information_schema.tables` returns nothing matching `%person%` in `public`. All three are page types, every row a row of `pages`: 3 person, 15 person-access, 10 person-authority. The grants do not survive the pages system on their own.

Five constraints stated in those commands are now carried only by git history and by code with no command above it.

A grant row is owned by the universal user rather than by its subject, which is what stops a person minting their own.

Access has four kinds: `page-type`, `database-row`, `domain`, `route`.

An authority target suffixed `*` grants the namespace beneath it.

Enrolment writes the `person` row LAST, after reading the handler back, so a failure leaves nobody enrolled rather than somebody half enrolled. Every write is idempotent and re-running is the repair.

Enrolment takes nothing a person's document states: persona, phone and email come from `domains/persons/<slug>.md` and the handler seat name is composed from the persona and the slug. Only the account and the grants are supplied.

Three request-time web-app paths read access grants and are not test code: `api.device-secret.mint.ts`, `readout-credential.server.ts`, `route-access.server.ts`. Each reads pages, so each needs another source before the store goes.

Unresolved: 7 person documents stand in `domains/persons/` against 3 person rows.
