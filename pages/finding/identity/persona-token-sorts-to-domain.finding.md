---
id: 18fb18d9-1985-568f-9537-f754227ccf09
slug: persona-token-sorts-to-domain
page-type-slug: finding
title: "Persona token sorts to domain"
domain-slug: barred-meaning/identity
---

# Claim

The token sort behind the `an` front reads a bare persona name as a domain, so naming a persona and a role boots the seat into the persona's own domain rather than the one she works in.

# Evidence

Measured 2026-08-04.

`bun ~/instructions/tools/seat.ts --resolve --token athena --token lead` answers `domain=athena role=lead`.

Both readings are defensible on their own. `personas/athena.md` declares `domain-slug: athena`, so `athena` is a real entry in the domain vocabulary, and the sort matched it there and stopped. It also declares `championed-domain: agent-harness`, which is what the persona actually works in.

The front picks the wrong one of the two: `an athena lead` pins domain `athena` and loads the persona document as the domain document. Alan typed a persona and got a place.

Persona is the one axis the sort never emits. `--resolve --token sophia` answers `domain=sophia` alone, so a single persona token resolves to a domain and to nothing else.

Not verified: whether any other caller reads the sort's `domain=`, and whether a persona's own `domain-slug:` is wanted in the domain vocabulary at all.
