---
id: e9f19b56-c1d6-50e6-acff-423a9b78d60d
slug: spawned-seats-ran-with-no-page-committed
page-type-slug: finding
title: "Two seats ran today with no seat page ever committed"
domain-slug: domain/agent-harness
---

# Claim

Two spawned dispatch seats held a Claude session in the last 24 hours while no seat page for either was ever committed to the memory repository, so nothing on the file side can name them.

# Evidence

Found on 2026-08-19 while moving `readSeatFacts` off the agent row and onto the seat roster. `ops seat hook-decisions --window 24h` leaves 194 of 1182 decisions with no seat name, across 7 distinct sessions. A direct query of `public.pages` for `page_type_slug = 'agent'` resolves 2 of those 7: session `4dec85c6-486d-4e9c-9899-c6e501c18159` to `19428-pages-ui-manager-build-parent-deploy`, and session `756db2ba-6749-4694-a657-145bd2c1d938` to `19429-pages-ui-developer-flex-1-build-child-deploy`. Both carry `launch=spawned`.

`git log --diff-filter=AM --name-only -- 'seats/*pages-ui*'` in the memory repository returns nothing, and the whole history holds 31 seat pages ever, so neither seat's page was created and later reaped — it was never committed at all. Their project seqs are 19428 and 19429 against a `next-seq` of 19431, so both are from today rather than from before seat pages existed.

Measured at the same time: of the agent rows `getAllAgents` returns now, zero lack a roster entry, and 19 of 19 roster seats carry a session. Six `global-archivist-flex-*` seats carrying `launch=spawned` do appear in the roster, so being spawned does not by itself explain the absence.

Why those two wrote no page was not established.
