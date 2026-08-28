---
id: 3f5cbffd-400a-5e5e-9504-2e012ab1d7ff
slug: schema-read-chain-skips-fragments
page-type-slug: finding
title: "Schema read chain skips fragments"
domain-slug: page-type/old-gate
---

# Claim

The `read-the-schema` gate builds its chain by walking `extends` alone, so a schema reached only through a fragment ref is required of no author.

# Evidence

Measured 2026-08-04 by a diagnostic seat running `define-principle-or-rule` against a finding about the rung shape, and confirmed here before filing. The seat was fenced from landing, so this is filed by the lead who fenced it.

`tools/gates/read-the-schema.ts:45-55`, `chainFor`, walks one edge: `for (const up of resolve(domain)?.extends ?? []) walk(up)`. Nothing there reaches `fragments`.

`tools/document/schemas/domain.ts` declares `extends: []` and holds its ranked sections as fragment refs — `{ part: "ref", fragment: "principles" }` and the same for rules — resolved against `fragments: { principles: rankedSection("principle", 12), rules: rankedSection("rule", 12) }`.

So an author writing a principle or a rule onto a domain surface is required to read `domain.ts`, which states none of the four shape rules for a ranked unit, and is never required to read `tools/document/schemas/ranked.ts`, which states all four. The specification of the thing being written is reachable only across the edge the gate does not walk.

The gate's own header states the intent it misses: "The agent has read the schema claiming this path, and everything that schema extends... An author shown only the leaf is shown a fraction of the specification."

The seat reached this by probing the door rather than by reading it: a swapped Act and description returned "expected at most 100 characters, measured 126" and "expected unmarked text, measured marked text", neither naming the fault. It also overturned three evidence claims in the finding it entered from while doing so — that `schemas/principle.ts` holds the shape (the file does not exist; folded into `ranked.ts` at `054f80ef`), that a link is refused in a description (probed: bold refused, code span refused, link admitted, `document-conforms` passed), and that `Handle` is 25 (it is 28, moved at `cb5f13d5`).

Not measured: whether any other schema holds specification behind a fragment ref, or how many authors have written a ranked unit without reading `ranked.ts`.
