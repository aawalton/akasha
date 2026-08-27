---
id: ac202db4-cb14-58ec-9e50-738ca67e1269
page-type-slug: old-ops-command
title: "Ops audit code-comments"
slug: ops-audit-code-comments
domain-parent-slug: domain/ops-audit
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/audit/code-comments.ts
path: audit code-comments
---

# Definition

- **Ops audit code-comments** — every code-repo file carrying a comment outside the approved forms.

# Design

The population is every code-repo file the code comment domain is required reading for, and the forms come from a list document here.

A machine-written file and a file under a fixtures directory are set aside and counted apart.

It refuses where nothing was read at all, a clean run over no file being a different answer from a clean run over the tree.

# Help

The code comment reading over the code repository, which is where the files are but not where the rule is. What a comment may be is stated by `pages/list/code-comment-forms.list.md`, which files are read is every file `pages/domain/code-comment.domain.md` is required reading for, and what counts as a comment at all is the classifier under `tools/code-comment/` — all three in this repository, none of them reachable by the code change being weighed. That is why this was retired as a check: dropping one approved form from the list here turned branches there red over files they never touched, and narrowing what this repository requires be read against the code comment domain cut the population from 13719 files to 26 while the check still exited clean. Nothing is lost as a gate, because `tools/hooks/block-code-comments.ts` already denies an agent's write of a comment outside the forms before it reaches disk; what this keeps is the sweep over files no agent tool wrote. As an audit it reports and never refuses on a finding, and a finding still exits 0. Machine-written files and files under a `__fixtures__` directory are set aside and named apart, as `strip.ts` leaves both alone. The denominator is files READ FOR COMMENTS, which is the reached population less those set aside and those nothing here knows how to scan (--repo-root, --json)
