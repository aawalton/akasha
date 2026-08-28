---
id: 245c617e-d45e-573d-8085-87b39394852c
page-type-slug: finding
title: "A delegate's read record goes when its turn ends, not when the delegate does"
domain-slug: domain/read-record
---

# Claim

A delegate's page is removed when its turn ends, and a message resuming it re-creates the page seconds later with an empty read record. The delegate has not returned: same context, same task, still holding every body it read. It works on with a record saying it has read nothing, and its next write is refused for files it is looking at. Thirty-six times in two hours under one seat, against four seat sweeps in seven hours across every seat.

# Evidence

Captured live 2026-08-28 05:48-05:51 by the delegate it happened to, mid-task.

    341f8c2e6d  05:48:17  astra--a35ba5d8cf77124b6 returned, so its page goes
    88733211a8  05:48:19  astra--a35ba5d8cf77124b6: a subagent states the kind it was dispatched as

It did not return. It had finished a turn; a message arrived and resumed it. Its record held 58 entries before and 4 after, all 4 read after 05:48:19, with `min seenAt = 1787917755462` and nothing predating the remake. A clean truncation at the remake, not a scatter, which is what tells it from a landing that drops entries. `.gitignore:3` is `*.uncommitted.attachment.*`, so the sidecar is untracked and does not return with the page.

`tools/hooks/agent-hook-state-subagent.agent-hook.code.attachment.ts:50-52` removes the page on `SubagentStop` and `:56` writes it again on `SubagentStart`.

Thirty-six removed-then-remade pairs under `astra` between 04:00 and 05:51. The shortest gaps say plainest that nothing ended:

    astra--a3fec02deeeae82f8  gone 04:39:58  remade 04:40:00
    astra--ac45e4bac9e754592  gone 04:53:00  remade 04:53:03

The reader and the gate never disagree. Both resolved one store for that delegate — same page, same sidecar — and `epoch.ts` `replacedAt(agent)` and `read-record.ts` `replacedAt(page)` both answered 0. An `ops read` calling a file unchanged and a gate refusing it five minutes later are two true answers with a page removal between them.

Not measured: whether anything but a turn boundary raises `SubagentStop` for a delegate still working.