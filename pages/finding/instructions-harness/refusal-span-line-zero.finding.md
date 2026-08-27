---
id: cda3fb59-8108-52e5-96cc-bac07b6836ea
slug: refusal-span-line-zero
page-type-slug: finding
title: "Refusal span line zero"
domain-slug: domain/global
---

# Claim

The one refusal `checkNarrowing` can emit carries a span of line zero, which no parse produces, against the invariant `types.ts` states four lines from it.

# Evidence

`tools/document/check.ts` has `checkNarrowing` say its refusal at `{ start: { line: 0, column: 0, offset: 0 }, end: ... }`. `position.ts` returns `line + 1`, so line zero is a position no parse can hand back, and `types.ts` says every span is carried because a refusal that cannot name a line makes the reader search for what the door already knew.

The reason it stands is structural rather than careless: `checkNarrowing` compares one schema's frontmatter against its parent's, and a schema is a TypeScript value carrying no spans, so there is no document position to name. The document that triggers the refusal is not the thing at fault.

So the repair is a decision rather than an edit — whether a schema-against-schema refusal belongs in a channel that takes no span, or whether the span type should admit an absent position, which every other refusal would then have to be read against.
