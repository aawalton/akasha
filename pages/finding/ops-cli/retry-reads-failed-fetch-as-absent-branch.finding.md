---
id: e4bca9bf-5107-58c0-9de1-caa5407cfe71
page-type-slug: finding
title: "Retry reads a failed fetch as an absent branch"
domain-slug: domain/ops-cli
---

# Claim

`ops pipeline retry` refuses with a claim that the branch is not on origin whenever its `git fetch` fails for any reason. A fetch that could not run and a branch that is genuinely absent return the same value, and only one of the two is what the refusal says.

# Evidence

Reported by the seat on project #19350 on 2026-08-17: the retry refused saying branch `project-19350` was not on origin, while `git ls-remote` showed it there at exactly the SHA in hand. I did not reproduce the refusal, but I read the code behind it and it accounts for what was seen.

`tools/commands/pipeline/retry.ts:199` defines `getBranchTip`:

- it runs `git fetch origin <branch>` in `repoDir`, which is `process.cwd()`
- `if (!fetched.ok) return null`
- then `git rev-parse origin/<branch>`, and `if (!rev.ok || rev.stdout.trim() === "") return null`

Three distinct outcomes collapse into one `null`: the working directory is not a git repository or not one with that remote, the fetch failed on the network or on credentials, or the branch really is absent. The caller has only the null, so its refusal names the third whatever happened.

The working-directory arm is the one most likely to fire, because `process.cwd()` is wherever the caller happened to be standing rather than the worktree the pipeline is for. A seat that has moved out of its worktree gets a confident, specific and wrong answer.

`git ls-remote --heads origin project-19350` answers `7de0ef790be7c9509147761e731719d990146b5b` at the time of writing, so the branch stands and stood.
