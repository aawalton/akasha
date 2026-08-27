---
id: 6211e465-2f89-53e6-92bb-f65d9ec66cfe
slug: no-readme-rationale-points-at-quarantine
page-type-slug: finding
title: "No readme rationale points at quarantine"
domain-slug: domain/code-quality
---

# Claim

`check-no-readme` prohibits README.md across the monorepo on the grounds that a sibling CLAUDE.md carries the documentation instead, and the CLAUDE.md corpus it names has been moved to quarantine, so the check now refuses one place to write per-package documentation while pointing at another that is gone.

# Evidence

The check is live. `packages/infra/checks/src/checks/check-no-readme.ts` runs with siblings `check-no-readme-json-contract.ts` and `check-no-readme.cli.test.ts`, and exits 1 on any `README.md` found.

Its header states the rationale: "Prohibits README.md files anywhere in the monorepo. Per-package documentation lives in a sibling CLAUDE.md so the agent harness auto-loads it when the agent references files in that directory. A parallel README.md splits the source of truth and hides context from the loader."

That second sentence no longer describes the repo. `find ~/code -name CLAUDE.md`, excluding `node_modules` and `.git`, returns exactly one file, and it is one of this check's own fixtures: `packages/infra/checks/__fixtures__/no-readme/clean/CLAUDE.md`. The corpus stands quarantined in the instructions repo at `dirty/code/`, 1,139 head documents named for their old paths with the separators flattened.

The consequence is narrow but real: someone wanting per-package prose is refused `README.md` by a green check whose stated alternative no longer exists in the tree. `domains/folders/instructions-repo.md`'s Governed From Here names where such an instruction should go instead — "Write an instruction in this repo whatever it governs; `code-path:` is how one reaches code" — but the check does not say so, and its comment still routes the reader to CLAUDE.md.

What I did not measure: whether the prohibition is still wanted on its own terms, which it may well be, independent of the rationale. I did not run the check, read its fixtures beyond their directory names, or look for a redirect elsewhere in `packages/infra/checks/`. I also did not check whether the quarantined heads are scheduled to return to the code repo, which would make this self-resolving.

Noticed while ingesting `dirty/docs/claude-md-quality.md`, a rubric for authoring CLAUDE.md files, which was emptied and removed.
