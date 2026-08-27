---
id: 3330622b-f151-54b2-9528-15315a7d334a
page-type-slug: finding
title: "Governable repos outrun gated"
domain-slug: domain/global
---

# Claim

Five repos can be governed and three can be gated. `REPOS` in `tools/document/types.ts` declares instructions, code, memory, books and stories, and the domain schema accepts a `books-path:` and a `stories-path:` alongside the other three. Neither has a write command, so a domain can declare what it governs in books or stories while nothing judges a write landing there.

# Evidence

Carried out of the dispatched reading of `domains/agent-governance.md` on 2026-08-07 as being outside its subject, and relayed here unjudged.

I confirmed both halves in the source: `tools/document/types.ts:83` declares the five, and its comment at line 79 states the departure itself — "GOVERNED IS WIDER THAN GATED. `books` and `stories` stand here so a domain can declare what it governs there ... Neither has a command." `tools/document/schemas/domain.ts` carries `books-path` and `stories-path` as optional keys beside the other three.

Not measured: whether any live domain actually declares either key, and whether anything writes into those two repos today. So the gap may be latent rather than open.

The reviewer's reason for not adding a line about it to `domains/agent-governance.md` was that the Absence rests on judgment about boot cost rather than on anything an instrument settles.
