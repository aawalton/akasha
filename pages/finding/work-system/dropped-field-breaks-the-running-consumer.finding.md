---
id: e058ad33-b0c2-5e4c-a55d-f565e587507d
slug: dropped-field-breaks-the-running-consumer
page-type-slug: finding
title: "A dropped field breaks the consumer that is running, not the one beside it"
domain-slug: domain/work-system
---

# Claim

A producer that drops a field from a shared answer breaks the consumer already running, not the one in the repository beside it.

# Evidence

`tools/work-tree.ts` stopped emitting `kind` on every row and `byProject` in its `--colours` answer, both of them naming work tracked as a project. The consumer is the Work panel, whose source stands in `code-editor`. That source was changed in the same stretch of work to stop requiring either, its 485 tests passed, and the extension typechecked.

The panel that was RUNNING is built from `code-editor-live`, which stood three commits behind. Its schema declared `kind` a required enum and `byProject` a required record, so both `parseWorkTree` and `parseWorkColours` threw `printed a shape this cannot read` against the producer's new answer. The panel drew its last good tree and wrote the reason to a channel nobody was reading. Nothing else reported it: the two live in different repositories, so no typecheck and no suite spans them, and the producer's own tests passed because they are written against the producer.

What made it invisible is that the consumer's source and the consumer that is running are different things, and the repository under edit reads like the whole of it. `bun test` and `tsc` both answered about `code-editor`; the process answering the panel's calls was `code-editor-live`.

The producer now emits `kind: "initiative"` on every row and an always-empty `byProject`, and its help says both are there for the shipped panel and go when a build that ignores them is the one running. Both builds were then run against the live producer and both parse.
