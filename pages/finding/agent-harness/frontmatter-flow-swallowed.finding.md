---
id: 65ff0207-6717-5631-be01-61b89ec0eece
slug: frontmatter-flow-swallowed
page-type-slug: finding
title: "Frontmatter flow swallowed"
domain-slug: domain/agent-harness
---

# Claim

The markdown front end silently destroys YAML flow mappings in frontmatter. `page-types/theme.md`
writes `domain: { type: slug, required: true }` beneath `properties:`, and `parse` answers
`{ kind: "list", items: [] }` for it — every property, section and slot that document declares
reads as ABSENT, with nothing raised. It is not a parse that fails; it is a parse that succeeds on
a hollowed document, which is the shape no reader downstream can tell from an empty declaration.

# Evidence

Measured by driving `parse` over `page-types/theme.md` directly: `properties`, `sections` and
`slots` each come back `{ kind: "list", items: [] }`, and `print(parse(src))` emits the three keys
with nothing under them. The round-trip case in `tools/document/parse.test.ts` is what noticed,
because an empty list printed and parsed back is not the document that went in.

`page-types/theme.md` is the ONLY file in the corpus using flow syntax — grepped across every
tracked `.md` — which is why nothing caught this before: the front end's bar is the corpus, and the
corpus had never written this shape. That file was added 2026-08-13 10:27 in `290530186`.

`tools/document/print.ts` has no caller anywhere outside its own test, so nothing writes a document
through the printer today. The loss is on READ rather than on write, which is what keeps this a
latent gap rather than live corruption.

The open question is whether the front end should learn flow mappings or refuse them, and refusing
is not the no-op it sounds like: `page-types/theme.md` would then be rejected until it is rewritten
in block style. That is a decision about what this repository's frontmatter is, and it is Alan's.

`page-types/` and `properties/` are held out of that test's corpus entirely as of `0569c65c`, on
Alan's direction, while the page-type work is in flight. So nothing reports this defect any more,
and this finding is the only thing standing between the exclusion and permanence.

Not measured: whether any gate or schema currently validates `page-types/*.md` against the hollowed
parse, and what else in `tools/` reaches `parse` on those paths. Both were left unchecked.
