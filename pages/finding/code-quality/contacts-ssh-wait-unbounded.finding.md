---
id: c3b4ab56-2074-52d5-921f-0c9eae6c4204
page-type-slug: finding
title: "Contacts SSH wait unbounded"
domain-slug: domain/code-quality
---

# Claim

Bounded Wait on `domains/code-quality.md` requires every wait to have a ceiling and to fail at that ceiling, and `@alanwalton/contacts` gives its remote command no ceiling at all: `runSshCapture` bounds only the SSH connect, so a write verb whose `osascript` blocks on the macOS TCC automation prompt never settles and emits nothing.

# Evidence

The rule reads: "Give every wait a ceiling, and fail at that ceiling with the reason the wait was for. An unbounded wait emits nothing — neither finished nor failed, so nothing alerts and nothing retries." `ops instructions governs` on `packages/alanwalton/contacts/src/lib/contact.ts` returns `domains/code-quality.md`, so the rule reaches this package.

`packages/alanwalton/contacts/src/lib/ssh.ts` builds its SSH arguments in `sshArgs`: `-i <key>`, `StrictHostKeyChecking=no`, `UserKnownHostsFile=/dev/null`, `ConnectTimeout=10`, `<user>@<host>`. `ConnectTimeout` bounds the connect only. There is no `ServerAliveInterval` and no remote-command ceiling.

`runSshCapture` spawns `ssh` with `bash -s` and returns a promise settling on exactly three events: `child.on("error")`, and `child.on("close")` at code 0 or non-zero. `rg -n "timeout|AbortSignal|setTimeout"` over `ssh.ts` and `remote.ts` returns nothing, so no caller supplies the ceiling the wrapper omits.

Every write goes through that wrapper. `remote.ts:79` passes `buildCreateScript`, `:89` the update script, `:101` `buildDeleteScript`. The script those builders emit runs `/usr/bin/open -ga Contacts` (`contact-osascript.ts:129`) then `/usr/bin/osascript -e "$osa"` (`:133`).

On a macbook without the TCC automation grant for `com.apple.AddressBook`, `osascript` blocks on a GUI permission dialog rather than returning. The remote `bash` does not exit, `close` never fires, and the verb emits neither a result nor an error — the state the rule's warrant names.

The package's quarantined head document recorded that as expected operator experience — "Until it is granted, a write verb **hangs** on the GUI permission prompt" — and is queued for removal, which is why this is filed here.

Not measured: I did not run a write verb, since `create`, `update` and `delete` mutate Alan's live address book. So I did not establish whether the grant is in place; the missing ceiling holds either way. Nor did I check `@alanwalton/imessage`'s ssh wrapper, which `ssh.ts` says this one mirrors.

Read at `main`, 2026-08-08.
