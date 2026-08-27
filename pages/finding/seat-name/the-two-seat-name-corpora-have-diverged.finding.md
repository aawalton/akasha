---
id: 53a03a03-83cd-5ddf-a836-dd3f9b1dd1f5
page-type-slug: finding
title: "The two seat-name corpora have diverged into different grammars and the code repository holds the older"
domain-slug: domain/seat-name
---

# Claim

The seat-name corpus the two repositories are meant to hold byte for byte has diverged into two different grammars, and the code repository's copy is the older one.

# Evidence

`tools/lib/seat-name-corpus.json` and `packages/agents/shared/seat-name-corpus.json` are declared mirrored, and `tools/checks/seat-name-corpus-mirror.ts` is what holds them equal. Diffed on 2026-08-18 they disagree on nine of their cases, not on one: the instructions copy carries the handler form `amy-alan-handler` and `alan-handler`, a persona spelled alone for a seat whose principal is Alan, and declares `claude-domain-lead` and a trailing-seq name unreadable — none of which the code copy knows. #19416 moved two of its cases to the head spelling, which leaves the other seven standing.

The readers behind them diverge the same way. `tools/lib/read-seat-name.ts` and `packages/agents/shared/read-seat-name.ts` are two implementations of one grammar, and only the first admits the handler form or refuses a persona in front of a domain and a role.

Bringing the code copy level means porting the instructions reader, not editing the corpus: the code reader would fail the cases the instructions corpus carries.
