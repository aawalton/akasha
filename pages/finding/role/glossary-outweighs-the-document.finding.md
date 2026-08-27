---
id: 5f709e22-987b-566e-9c24-7d4e41fe0a58
slug: glossary-outweighs-the-document
page-type-slug: finding
title: "Glossary outweighs the document"
domain-slug: page-type/role
---

# Claim

The `glossary:` block on `domains/role.md` costs every seat in the fleet more at boot than the document carrying it, for terms no document in the corpus writes. Sixteen slugs are named there; every seat states a role and the closure walks to `role`, so every boot embeds all sixteen definitions whole. Whether that vocabulary earns its place is a live question; that it is free is not — the belief that a glossary costs a boot nothing has been written down by at least one reader and acted on.

# Evidence

Measured on 2026-08-13 by a review-instructions seat on `domains/role.md`.

`ops instructions compose-boot --help` states that what a seat's documents draw in under `glossary:` arrives beside them, each once, embedded whole, and recorded as read. The seat taking this reading confirmed it against its own system prompt, which carried all sixteen documents. `domains/domain-glossary.md` says the same in its Design: a reader of the naming domain is given each named domain whole.

Sizes on that day: `domains/role.md` 4792 bytes; the sixteen drawn documents 7355 bytes together.

What uses the words: `seat` is also drawn by `domains/agent-harness.md`, which is this domain's parent and therefore in every closure that reaches `role`. A case-sensitive, word-boundary sweep of `domains/**` for the other fifteen terms as each is spelled in its own Definition bullet returned no document that writes one.

What the instrument cannot say: `terms-in-reach` builds its term set from the glossaries themselves, so run against a scratch worktree with this block stripped it reported fewer uses out of reach (14) than the live tree did (15), not more. An absence there is not evidence of no use.

Not measured: whether an agent that never meets the word still needs the concept — which is the whole question — and whether any other domain in a universal closure carries a comparable block.
