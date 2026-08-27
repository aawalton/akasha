---
id: 3814bff0-4289-55a1-801c-f717823b391a
page-type-slug: finding
title: "Endings undeclared"
domain-slug: page-type/ops-command
---

# Claim

Four `agent` verbs end on exit codes their own `exits:` list does not declare, and three declare no list at all. A well-formed but unmatched agent name is a data refusal exiting 2 in `send`, `session-flush` and `pre-claim`; `delivery`'s description promises exit 2 on a proven loss and declares no list; `interactive-verdict` exits 3 on a stall, which `block-interactive-stall.sh` keys on, stated only in prose. A caller reading the declared surface to decide what an ending means gets a code it does not name.

# Evidence

Found while moving these verbs' bodies into the instructions repository. Every ending below was run against the pre-move surface and the moved one and matched on all three streams, so each is what the verb has always done.

Exit 2, on a name that is well formed and held by nobody:
`ops seat send --to <unheld name>`, `ops seat send --from <unheld name>`, `ops seat send --blocked <unheld name>`, `ops seat session-flush <unheld name>`, `ops seat start <name held by a live seat>`.
`send` declares no `exits:` list; its help stands at `tools/lib/seat-send-help.ts`. `session-flush` declares 0 and 1 only.

Exit 3, on a turn-end classified as a stall: `ops seat interactive-verdict --transcript <a transcript whose final text announces a next act>`. Declared nowhere in the block; `tools/hooks/block-interactive-stall.sh` is the caller that reads it.

Exit 2, promised in prose and declared in no list: `ops seat delivery`'s description says exit 2 on a PROVEN loss. Not reachable live — the channel is healthy and every one of eight real ids read back `injected` — so it was proved instead at the link that changed, by showing the moved body's refusal resolves to the same class object as the pre-move body's and that `exitCodeForThrowable` returns 2 for it.

`ops seat halt` is the counter-example in the same namespace: it declares `exits: [{ code: 2, meaning: … }]`, so the shape is available and is used elsewhere.

Every help block was carried across verbatim. Adding an `exits:` entry would invent surface while moving a body, and a change made under a move cannot be told from the move afterwards.
