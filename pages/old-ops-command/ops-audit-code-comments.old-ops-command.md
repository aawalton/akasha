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

- **Ops audit code-comments** — every akasha file carrying a comment outside the approved forms.

# Design

The population is every akasha file the code comment domain is required reading for; the forms come from a list document here.

A machine-written file and a file under a fixtures directory are set aside and counted apart.

It refuses where nothing was read at all, a clean run over no file being a different answer from a clean run over the tree.

# Help

The code comment reading over akasha, which now holds the files and the rule alike. What a comment may be is stated by `pages/list/code-comment-forms.list.md`, which files are read is every file `pages/domain/code-comment.domain.md` is required reading for, and what counts as a comment at all is the classifier under `tools/code-comment/`. The tree read defaults to akasha, `CODE_ROOT` naming another checkout where a run works in one. It was retired as a check back when the files stood in one repository and the rule in another: dropping one approved form from the list turned branches red over files they never touched, and narrowing what the code comment domain is required reading for cut the population from 13719 files to 26 while the check still exited clean. What this keeps is the sweep over files no agent tool wrote. As an audit it reports and never refuses on a finding, and a finding still exits 0. Machine-written files and files under a `__fixtures__` directory are set aside and named apart, as `strip.ts` leaves both alone. The denominator is files READ FOR COMMENTS, which is the reached population less those set aside and those nothing here knows how to scan (--repo-root, --json)
