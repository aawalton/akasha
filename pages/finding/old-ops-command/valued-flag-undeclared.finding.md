---
id: a0b6d532-b4f2-5476-8348-45de50ecff8f
slug: valued-flag-undeclared
page-type-slug: finding
title: "Valued flag undeclared"
domain-slug: page-type/old-ops-command
---

# Claim

Four flags across two `agent` verbs are advertised as taking a value and cannot take one: a flag declared with no `argLabel` is parsed as a boolean, so the value it is given falls through to the positionals or is refused outright. `pre-claim --launch spawned` and `session-flush --timeout-ms 5000` both refuse as unexpected positionals, which puts `spawned` and any timeout out of reach from the command line. A help block describing a value and a declaration admitting none are each well-formed alone.

# Evidence

Found while moving these three verbs' bodies into the instructions repository. Every case below was run against the pre-move surface and the moved one and answered identically, so this is what the verb has always done rather than anything the move introduced.

`ops seat start --launch spawned` → exit 1, `unexpected positional argument(s): spawned`.
`ops seat start --launch=spawned` → exit 1, `--launch: flag does not accept a value`.
`ops seat start --account someacct` → exit 1, the same pair.
`ops seat session-flush <id> --timeout-ms 5000` → exit 1, `unexpected positional argument(s): 5000`.

The declarations, all four carrying a `description` that names a value and no `argLabel`:
`packages/agents/cli/src/agent/pre-claim.ts` (`--launch`, `--account`) and
`packages/agents/cli/src/agent/session-flush.ts` (`--id`, `--timeout-ms`).

The parser field that decides it: `takesValue(f) { return f.argLabel !== undefined }`, at
`packages/shared/cli-core/src/parse-args.ts:107`.

`ops seat start`'s registry summary advertises `--launch, --account, --json`, so the listing
carries the same claim the help does.

Both help blocks were carried across verbatim, this being a repair rather than a move: a change
made while moving a body cannot be told from the move afterwards.
