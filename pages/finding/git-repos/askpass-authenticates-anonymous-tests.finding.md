---
id: 63a99b3d-64bb-5eab-94b2-d4963f3e6bbb
slug: askpass-authenticates-anonymous-tests
page-type-slug: finding
title: "Askpass authenticates anonymous tests"
domain-slug: domain/git-repos
---

# Claim

An agent shell on the workstation inherits `GIT_ASKPASS`, so a git command run to test whether a remote is readable *without* credentials is authenticated anyway and reports it readable.

# Evidence

Observed 2026-08-05 while building `git-mirror-probe` (#17882). `git ls-remote https://github.com/aawalton/code.git` was run with `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null HOME=/nonexistent GIT_TERMINAL_PROMPT=0` — intended to strip every credential path — and returned a ref advertisement. The same request from a pod in the cluster returned `HTTP/1.1 401 Unauthorized`, and `curl` against the ref-advertisement URL from the workstation itself, carrying no environment, returned 401 for all five destinations.

The difference is `GIT_ASKPASS`, which was set in the shell to `…/VSCode-linux-x64/resources/app/extensions/git/dist/askpass.sh`. Git consults it before prompting, so it is reached whatever the config and HOME say — none of the three variables above touches it. Re-running under `env -u GIT_ASKPASS` produced `fatal: could not read Username for 'https://github.com': terminal prompts disabled`, matching the pod.

The trap is that the stripping looks exhaustive and the result looks like evidence. Config, HOME and terminal prompting are the three paths an author thinks of; the helper is a fourth that is invisible in the command and set by the editor rather than by the estate. A test that concludes "readable with no credential" from a workstation shell has not tested that, and the false conclusion is the permissive one — it reports an access boundary as open when it is closed, which is the direction that gets built on.

`SSH_AUTH_SOCK` is present in the same shell and is the same shape of trap for `git@` remotes.

What it cost here: a finding was filed claiming every GitHub mirror of the estate's bare repos was world-readable, and a live probe was built to read those destinations anonymously on the strength of it. Both were wrong. The repositories are private, the probe could not read them from the cluster, and it was the first scheduled in-cluster run that exposed it.
