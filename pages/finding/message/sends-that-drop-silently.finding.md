---
id: d9cad57e-7823-5629-bd21-4c8ebbab6665
slug: sends-that-drop-silently
page-type-slug: finding
title: "Sends that drop silently"
domain-slug: page-type/message
---

# Claim

Several send paths discard a message when nothing receives it, against the intent that every message reaches a recipient, whether one has to be resumed or created.

# Evidence

`domains/message.md` states as intent that every message reaches a recipient, whether one has to be resumed or created, and that a message waits on its row rather than failing at its sender.

Paths found discarding instead. `tools/commands/voice/run.ts:326-334` logs and returns where an utterance routes to no known target. `tools/lib/kill-alert-send.ts:24-29` logs the count dropped and returns false where the recipient name holds no row. `packages/alanwalton/apns-push-notifier/src/push.ts:245-314` is a silent no-op where a user has no device tokens. `tools/lib/supervisor-limit-resume.ts:50` skips the send where the user id reads null.

The machinery for the intent does exist and is partial: the wake-watcher revives a dormant seat off a message row via `tools/lib/wake-watcher-revive.ts:13-36`, but only for seats covered by a spec in `tools/lib/wake-watcher-registry.ts:112-134`.
