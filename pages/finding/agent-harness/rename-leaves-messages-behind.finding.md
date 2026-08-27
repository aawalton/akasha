---
id: 25c5f036-55cd-5766-bf30-159d4a0ed851
slug: rename-leaves-messages-behind
page-type-slug: finding
title: "Renaming a seat leaves its unread messages behind"
domain-slug: domain/agent-harness
---

# Claim

Renaming a seat leaves its unread messages behind: they stand in a directory named for the name it had, and nothing moves them or reads them from there.

# Evidence

A message is a file at `pages/message/<to>/<id>.message.md`, where `<to>` is the recipient's seat name (`messageDirRelPath` at `tools/lib/message-file.ts:67`), and a seat reads only the directory matching the name it holds now (`seatNameForAgent` at `tools/lib/messages-agent-tools.ts:77`, used by the channel listener, `ops seat inbox`, the recipient resolver and the stale-claim sweep alike).

So a seat renamed from `a` to `b` reads `pages/message/b/` and never looks at `pages/message/a/` again. Anything unread there stops being deliverable, and the directory stays as a live-looking claim on the old name.

The Postgres store answered this with `retargetPendingMessages` and `adoptSeatPendingMessages`, called from `setAgentName` on every name bind, back when that ran in the code repository. Both were removed rather than converted: they moved nothing once the store became files, so keeping them would have been a no-op wearing the shape of a safeguard. Their removal is not the cause of this gap and did not widen it.

Two ways it could resolve, and the choice between them is not settled here: the rename could move the directory, or a seat could read the directories of every name it has held. The first loses the record of what was sent to the old name; the second needs a seat to know its own history, which nothing currently keeps.

Not measured: how often a seat is renamed while holding unread messages. The window is the gap between a message landing and the seat reading it, which is normally seconds.
