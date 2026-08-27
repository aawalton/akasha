---
id: 49ba25bf-cce0-5fe2-9716-1d968003a017
page-type-slug: finding
title: "Git guard misses substitution"
domain-slug: domain/agent-harness
---

# Claim

`tools/hooks/block-destructive-git.sh` is defeated by an ordinary `$( )` command substitution in an argument to a non-git command, and that path is absent from the NOT REACHED list its own `--scope` prints. The sibling hook that refuses the backtick spelling of the same construct declares `$( )` outside its coverage and offers it as the remedy, so the refusal an agent meets routes them into the spelling that still runs.

# Evidence

Probed 2026-08-07. `ops enforcement list` reports 26 hooks, both of these among them, registered from `instructions/settings/agents.json`. The probe verb only reads, so the probe was safe in both directions.

Four Bash calls. Typed directly, the shared-refs verb piped to `wc -l` was refused: "prohibited - refs/... is shared across all worktrees of a repo". The same verb inside a `$( )` substitution in a double-quoted argument to `echo` RAN, printing `probe result: 0 entries`. Unquoted, it RAN too, printing `probe: 0 entries`. The backtick spelling of that line was refused — by the sibling hook, not the git guard — whose message offers: "Meant to substitute? Use $( ) — same job, POSIX, and it nests where a backtick does not."

WHY IT IS NOT SEEN. `block-destructive-git.sh:263` strips quoted spans, `:265` splits the rest on `[|;&]`, and `extract_subcmd_and_args` takes each segment's first word as the command. For `echo probe: $(...)` that word is `echo`, so `base != "git"` returns 1 and the segment is never examined. A substitution is not a segment boundary under that model, and the unquoted form is not touched by the dequoting step either.

THE DECLARATION DOES NOT NAME IT. `--scope` lists as NOT REACHED: `checkout-index`, `read-tree`, `worktree remove --force`, eight named plumbing verbs, a call with no determinable subcommand, and a destructive verb inside a quoted payload the dequoting step strips. The unquoted probe is none of these. `block-substituting-backtick.sh --scope` does declare its half: "$( ) and ${ }, which carry the same hazard and are REQUIRED syntax." So each hook is working as built and the composite is what nobody declared.

NOT CLAIMED. Nothing destructive ran. Not that either hook could close the class. Not a count of other guards segmenting this way.

Found while ingesting `dirty/skills/agent-harness/findings/exit-codes-and-output-channels.md`, whose entry demonstrated this in the backtick spelling. That demonstration is now refused; the class is live in the spelling the refusal recommends.
