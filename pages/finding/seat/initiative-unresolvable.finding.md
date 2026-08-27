---
id: b6d5d3f7-bf25-5e72-bb52-687079097430
page-type-slug: finding
title: "Initiative unresolvable"
domain-slug: page-type/seat
---

# Claim

`tools/seat.ts --resolve` answers for the axes and ignores the records beside them, so an initiative slug has no read-only check anywhere. A launcher can refuse a bad persona, domain, role or task before it mints a row; it cannot refuse a bad initiative, because the only thing that judges one is the write itself.

# Evidence

`bun tools/seat.ts --resolve --initiative no-such-thing-xyz` exits 0 and prints an empty line, while `bun tools/seat.ts --initiative no-such-thing-xyz` refuses and names every initiative that does resolve. The resolve branch calls `resolveAttributes(args.set, args.tokens, ...)` and never `refuseRecords`, which is the whole of the difference.

`seat-help.ts` states the reason `--resolve` exists: "for a launcher that has to refuse a bad slug before it stops the seat it is replacing". An initiative is a slug and is refused on write, so it is inside that sentence and outside the code implementing it.

Found while adding `ops seat start --initiative` (#18048), which wanted exactly this check ahead of the mint and was routed around it: `packages/agents/cli/src/agent/state-identity.ts` gives the initiative a seat-verb call of its own so that a bad slug costs the record alone rather than the mode, principal, seq and flex standing beside it.

Not repaired in that pass because `tools/seat.ts` measured 14820 bytes against the 15000-byte ceiling `tools/gates/token-ceiling.ts` enforces, and the change measured about 300. Landing it means moving something out of the verb first — `--resolve` and `--name`, the two branches that answer without writing and stand ahead of the agent id, are one coherent piece and the precedent is `seat-help.ts`, `seat-args.ts` and `seat-resolve.ts`, each of which left for the same reason.
