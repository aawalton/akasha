---
id: 16698298-7f31-5b89-abac-2932871f6994
slug: no-gate-on-a-shell-removal
page-type-slug: finding
title: "No gate on a shell removal"
domain-slug: repo/akasha-repo
---

# Claim

No hook guards a shell `rm`. A finding, an initiative or a project document can be deleted from a shell with no gate between the command and the removal, where the same act through `ops rm` is gated against the repository that would remain, reported before anything goes, and committed. A git-borne removal is refused — and the refusal that catches it tells the agent to reach for plain `rm` instead.

# Evidence

`settings/agents.json:32` is the only PreToolUse configuration in the tree: eight hooks over two matchers, seven on Bash and one on Playwright. Every one exists under `tools/hooks/`.

Measured 2026-08-28 by handing each Bash hook a PreToolUse payload naming this very file and reading the verdict, executing nothing. `git rm <path>` is refused, exit 2, by `block-destructive-git`, whose `BLOCKED_VERBS` (`tools/hooks/agent-hook-block-destructive-git.agent-hook.code.attachment.ts:39`) carry `rm`, `clean`, `checkout`, `reset`, `restore`, `rebase` and `stash`. The same payload carrying `rm <path>`, `rm -rf pages/finding`, `truncate -s 0 <path>` or `find pages -name '*.finding.md' -delete` returns 0 from all five refusing hooks. The refusal is the control: the harness fires and the payload shape is right, so the zero is an absence rather than a mis-shaped probe.

`pages/refusal/block-destructive-git-rm.refusal.md:10` and `:13` are what the one guard that reaches a removal says when it refuses: "Use plain rm + git add", and "To stage a deletion: rm <path> then git add <path>". It routes the agent it stopped into the path nothing watches.

`ops rm` is gated as claimed. `ops-cli/global/rm/rm.command.code.attachment.ts:181` lands through `repo/land/land.ts:318`, which gates every akasha patch against the tree that would remain; the files a named directory sweeps in (`:98-101`) and the sidecars taken unnamed (`:167-171`) are reported before anything goes, and the commit names every path it took.

This costs more than when it was raised. akasha absorbed every other repository, so what a shell removal takes has no copy in another tree.
