---
id: e9e87afc-feb7-5d66-a1e2-9e86c9ecd904
slug: empty-name-exit-mismatch
page-type-slug: finding
title: "Empty name exit mismatch"
domain-slug: domain/global
---

# Claim

`ops worker-subscriber reset` says in its own help that it refuses with exit code 1 when `<name>` is empty. It exits 2, because an empty string satisfies the required positional and the refusal comes from the database lookup finding no such row.

# Evidence

Measured 2026-08-13, running `move-command-bodies` over the `worker-subscriber` namespace. Behaviour identical before and after the move; the move did not cause it and does not change it.

    $ ops worker-subscriber reset ""
    event_subscribers row with subscriber_name='' not found — list wedged subscribers via `bun ops worker-subscriber list-error`
    exit=2

The help block says: "Refuses with exit code 2 when no row matches `<name>`. Refuses with exit code 1 when `<name>` is empty." Only the first sentence is true. `exits:` declares 2 alone, so the two halves of the same document already disagree.

The mechanism: `<name>` is declared `required: true` as a positional, and `""` is a present argument, so the parser admits it. `requireFirst(parsed.positionals, "<name>")` then returns the empty string rather than refusing. The refusal that does fire is the `DataError` raised by `applyReset` when the prior `SELECT` returns no row — exit 2, and the message prints the empty name back.

Passing no positional at all is the case that does exit 1, and it is a different one:

    $ ops worker-subscriber reset
    missing required positional argument(s): <name>
    exit=1

So the help's second sentence appears to describe the no-argument case and names it "empty" instead. Either the sentence goes, or the body grows a refusal on the empty string. The moved body was left carrying the surface exactly as it stood, because a repair landed while moving a body cannot be told from the move.

Not measured: whether any other verb in the namespace makes the same claim about an empty positional.
