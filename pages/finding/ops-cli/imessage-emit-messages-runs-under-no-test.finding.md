---
id: f3adecb6-5976-5b90-9c44-2d8e27a9c978
slug: imessage-emit-messages-runs-under-no-test
page-type-slug: finding
title: "Imessage emitMessages runs under no test"
domain-slug: domain/ops-cli
---

# Claim

`emitMessages` in `tools/lib/imessage.ts` is the emitter `ops imessage recent` and `ops imessage search` both print through, and no test on any repository exercises it. It carries the direction arrow, the group-chat label prefix, the oldest-first reversal and the newline flattening, and each of those is an output contract fixed by review stated on the verbs' own documents.

# Evidence

Measured 2026-08-23, while moving `@alanwalton/imessage` into the instructions repository.

What covers what. `tools/tests/ops-imessage-unread-list.on-demand.test.ts` drives `ops imessage unread-list` end to end over eleven cases and passes, so `emitUnread` in `tools/commands/imessage/unread-list.ts` is covered. `emitMessages` is a separate function in a separate file, and `recent` and `search` have no test of any kind.

How it was established. A search for `emitMessages` across every repository returns four sites: its definition at `tools/lib/imessage.ts:28`, and its three call sites at `tools/commands/imessage/recent.ts:59`, `tools/commands/imessage/search.ts:81` and the import lines above each. No `.test.ts` file names it.

Why the older finding this replaces is gone. It claimed the coverage sat in the code repository's `packages/alanwalton/imessage/src/imessage/unread-list.unit.test.ts`, testing an emitter nothing dispatched to. That file and `registry.ts` beside it stand in no repository now, and the package itself has left the code repository, so the claim it rested on stopped being true.

Not measured: whether the on-demand shape used for `unread-list` extends to `recent` and `search`, both of which take a `--contact` that resolves against the address book before any message is fetched.
