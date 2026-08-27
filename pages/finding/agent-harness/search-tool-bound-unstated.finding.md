---
id: 39805402-4ce3-58a1-8e77-4ec3874154e8
slug: search-tool-bound-unstated
page-type-slug: finding
title: "Search tool bound unstated"
domain-slug: domain/agent-harness
---

# Claim

The `rg` an agent runs in a Bash shell is a harness-injected shell function rather than the binary, and it silently excludes gitignored and hidden files. Same directory, same pattern, one command apart: `rg -l` returns one file where `/usr/bin/grep -rl` returns three, and its output says nothing about the two it dropped. No artifact on disk carries the wrapper — `tools/bash-env.sh`, the one startup file every agent shell sources, does not define it — so the bound can only be measured, never read. `command rg` finds no binary at all, so the function is the whole of `rg` in an agent shell.

# Evidence

Measured 2026-08-07 in a headless supervisor-spawned seat, in a scratch git repo holding three files with one literal: `plain.txt`, `.hidden.txt`, and `ignored/a.txt` under a `.gitignore` of `ignored/`.

    rg -l NEEDLE1234 .          -> ./plain.txt
    /usr/bin/grep -rl NEEDLE1234 .  -> ./ignored/a.txt  ./.hidden.txt  ./plain.txt
    grep -rl NEEDLE1234 .           -> ./ignored/a.txt  ./.hidden.txt  ./plain.txt

`type rg` reports `rg is a function`. `type grep` reports only `grep is aliased to 'grep --color=auto'` — so in this seat the grep family is unfiltered and `rg` alone carries the bound. Neither output names the exclusion; the two dropped files are not counted, warned about or footnoted.

WHERE THE WRAPPER IS NOT. `BASH_ENV` is set to `$HOME/repos/akasha/tools/bash-env.sh` at `settings/agents.json:3`, and that file defines `set -o pipefail`, sources `~/.secrets.env`, and nothing else — four lines in all. `bash -c 'source ~/repos/akasha/tools/bash-env.sh; type rg'` reports `rg: not found`. So the function is injected per-invocation from somewhere else, and an agent cannot discover its bound by reading any file.

Re-measured 2026-08-27 in akasha, the same three-file scratch repository: `rg -l NEEDLE1234 .` answers `./plain.txt` alone where `grep -rl NEEDLE1234 .` answers all three. `type rg` reports a function whose body execs the Claude Code binary under `ARGV0=rg`.

WHY IT MATTERS HERE. A search returning nothing is routinely taken as a verdict about the corpus. Findings in this repo cite bare `rg` runs as evidence of absence, and each of those inherits an exclusion its author did not choose and could not have reported.

NOT MEASURED: whether an interactive or `claude -p` seat wraps `grep` too, which would make the same command mean different things in two seats of one fleet; the site the function is injected from; and how many search calls across the fleet carry the bound. All three were claimed by an earlier reading I did not re-run.
