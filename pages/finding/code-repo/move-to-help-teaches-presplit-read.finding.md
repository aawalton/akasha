---
id: 12c9498a-7ca2-5649-a8cf-5529a74fab84
page-type-slug: finding
title: "Move to help teaches presplit read"
domain-slug: repo/code-repo
---

# Claim

`ops project move-to --help` names the message status `read` for the state the status split renamed to `claimed`, in one of the few places a caller of a non-agents verb meets that vocabulary at the point of use. The argument the sentence closes is unaffected — the send still reaches nobody — so nothing downstream of it is wrong, and a reader checking the reasoning has no cause to check the noun.

# Evidence

Measured over `~/code` at HEAD `1313565199` on branch `main`, working tree clean, 2026-08-07.

`packages/alanwalton/projects/cli/src/project/move-to.ts:82`, inside a `description:` string of the verb's help — so this is text `--help` prints — closes its argument about why a return files its reason on the record rail:

    Nothing here wakes anyone — and a wake would be worse than none, since a send
    landing before a revived seat's process exists is marked `read` and reaches nobody.

`packages/agents/shared/message-status.ts` holds the post-split vocabulary and states each value's writer:

- `CLAIMED_MESSAGE_STATUS = "claimed"` (`:44`) — "Fetched by a reader that could not witness what became of it", and "deliberately NOT resolved — a claimed row is precisely the case the column could not close".
- `READ_MESSAGE_STATUS = "read"` (`:54`) — "A consumer was OBSERVED taking it — the only value asserting a delivery, written only by something holding a witness." Its doc-comment adds that historical rows carry `read` from when the claim wrote it directly, and "those assert more than was ever established".

The module header states the division outright at `:6`: the old single value "asserted a delivery and witnessed a fetch. A reader process claims the row, then emits" the witness separately.

So the help's `read` is the pre-split value. The state it describes — fetched by a process that no longer exists — is what `claimed` now names, and `read` is now the one value that would be false about it.

One correction to how this was previously written up, in `dirty/questions/code-repo-verb-interfaces.md`: that entry glossed the harm as the help teaching "that a row saying `read` was delivered to somebody". Post-split that reading is correct — `read` is the only value asserting a delivery. The harm runs the other way: the help teaches that a `read` row may have reached nobody, which is exactly what the split removed.
