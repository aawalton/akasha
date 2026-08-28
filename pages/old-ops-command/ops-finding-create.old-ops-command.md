---
id: 2d52ad69-e41c-5371-b5b8-2d236c85abd5
page-type-slug: old-ops-command
title: "Ops finding create"
slug: ops-finding-create
domain-parent-slug: domain/ops-finding
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/finding/create.ts
path: finding create
irreversible: false
---

# Definition

- **Ops finding create** — one finding written down, keyed to its domain.

# Help

Compose a finding's frontmatter, its `# Claim` and its `# Evidence` around prose you wrote,
land it in the findings directory, and commit and push exactly that. The domain is stated ONCE
and lands as the `domain-slug:` key. Nothing in the path records it, so a path and a key have
no way to come apart.

THE FINDINGS DIRECTORY IS FLAT. A finding's slug names its file directly and nothing sits
between them, so a slug another finding already holds is refused whatever domain that other
one bears on.

NO FLAG NAMES THE REPOSITORY, and none is needed. `pages/page-type/finding.page-type.md` declares which
repository holds a finding and where under it, and this reads that declaration rather than
guessing. The DOMAIN is validated against akasha, which is where a domain stands.

THE CLAIM AND THE EVIDENCE ARE YOURS AND ARE READ FROM FILES. Compose them outside that root:
one written inside it is live at once and cannot be committed. Nothing here writes prose, and
it never drops a gate: `ops write --mechanical` sets the reading
gates aside and nothing here passes it, so every gate about what you read is levied in full,
which for a finding means `pages/page-type/finding.page-type.md` — a finding is an observation rather
than a proposal, and that is the sentence that should shape a Claim.

THE FILE NAME IS YOURS TOO, AND THE PAGE IS GIVEN IT. Existing names are two to four words
compressing the claim (`reaches-uncredited`, `irreversible-spelled-twice`) and nothing mechanical
produces one from a claim, so --slug is required. What you pass lands as `slug:` in the
frontmatter as well as in the file name, so the page states its own name and a slug that is not
the slugified title stands. --title is required for the same reason: it is the line a reader of
the findings list judges the claim by, and nothing here can shorten prose into one.
