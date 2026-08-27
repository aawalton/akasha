---
id: cc246973-0471-5777-9d89-4e466f1b952e
slug: link-slots-compile-away
page-type-slug: finding
title: "Link slots compile away"
domain-slug: domain/pages-system
---

# Claim

A `{slot}` written inside a markdown link in a page type body is dropped when the template compiles, without a refusal. The page type reads as though it demands a link, the compiled shape demands nothing of the kind, and a body carrying no link at all holds. Every other gap in the shape language refuses; this one passes.

# Evidence

Measured on 2026-08-14 against `tools/lib/page-shape.ts` as it stands, by compiling a page type whose body is a Tasks list in the form the domain schema declares.

The template written:

```
- **[{task}]({href})** — {guidance}
```

The template compiled, in full: a `task` hole of `type: text` with `mark: strong`, a literal ` — `, and a `guidance` hole. `{href}` is not in it. There is no hole for it, no literal, and no refusal naming it.

Held against a body carrying no link whatsoever:

```
- **not a link at all** — g
```

The verdict is `HELD`. The typed schema this would replace types the same slot `{ type: "docref", to: { resolve: "path" } }`, and `tools/document/content.ts` requires such a hole to span one whole link, so the same body is refused there.

The cause is in `templateOf`: it reads `node.text` off the parsed inline node, and for a link node that is the link's label. The href stands on a sibling field the walk never looks at, so the second slot has nothing to be read from and is silently absent rather than unresolved.

Nothing in the corpus exercises this today, because no page type declares a link. The cost is that it stays invisible until a page type does, and at that point what is lost is a check the typed schema was making rather than one nobody had.

`domains/instrument.md` names the class: a blind instrument and a clean one both return nothing.
