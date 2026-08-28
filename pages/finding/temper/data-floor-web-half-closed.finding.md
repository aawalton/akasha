---
id: cbf5802c-5ea4-5ab3-af92-20bab80ebbf7
slug: data-floor-web-half-closed
page-type-slug: finding
title: "Data floor web half closed"
domain-slug: domain/temper
---

# Claim

Temper's personal-data-exposure floor (Child C of Milestone 1, project #15869) found the web surface clean except one /api/items userId leak that has since been fixed and independently verified, while the in-game data-floor half stays gated on Child B (#15872) and the hand-over package stays gated on getting David Eggertsen's concrete ESO setup through Aine.

# Evidence

Project #15873, domain `temper`, status `someday_maybe` — Child C of M1 umbrella #15869. A different eye than the readiness audits: does anything handed to user #1 carry Alan's data (tokens, SavedVariables, keys, identifiers). Alan's explicit worry. Sequenced late, on the near-final handed-over package.

Scoping (2026-07-24): user #1 named as David Eggertsen (likely first), Joseph Walton (likely second), per Alan via Aine. Pass targets David's actual ESO setup, built repeatable; his setup itself to be gathered later via Aine's relay.

Web-half data-floor audit (2026-07-24): clean except one leak — `/api/items` shipped Alan's userId to every user (`api.items.tsx:29-34`), fixed under #15881. Latent: any future seeded public Browse builds must be owned by the sentinel (`ffffffff-...`), never Alan's account (`9ba554f7-...`) — unseeded today, zero exposure. `temper_market_price_extracts.uploaded_by_user_id` readable, folded into #15881.

Resolution (2026-07-25, ember): web-half data floor closed. `/api/items` leak fixed, landed, independently verified (live curl returns a pure catalog projection, zero userId). Defense-in-depth: API-layer column projection + DB-layer grant revoke (migration 5519, 403 on `uploaded_by_user_id`/`select(*)`). Sibling-table audit: no public READ endpoint exposes `_listings`/`_pricing_snapshots` `uploaded_by_user_id`; listings' grant left unaudited, low-severity follow-on.

Latent sentinel item — deliberate no-action: the sentinel-ownership constraint lives only as a note (weakest guard). No roster-seeding path existed to attach a check to; building one was judged premature. Revisit the moment a roster-seeding script is written; that script's own docs is where the constraint belongs.

Status at last capture (2026-07-25): in-game data-floor gated on Child B #15872/Nimue's rig; hand-over package gated on David's setup via Aine's relay. Both correctly gated; no parallel work available.

No `# Objective` — captured, never defined.
