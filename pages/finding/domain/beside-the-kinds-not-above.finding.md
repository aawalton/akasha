---
id: fe561f0f-d9da-5ca7-a880-d5e4a6dede78
slug: beside-the-kinds-not-above
page-type-slug: finding
title: "Beside the kinds not above"
domain-slug: page-type/domain
---

# Claim

`domain` stands beside `role`, `persona` and `task` rather than above them, so an author editing only the frontmatter of one of those — the `domain-parents:` key itself — is not bound by the Design section that says what the key means.

# Evidence

`domains/role.md`, `domains/persona.md` and `domains/task.md` each declare `domain-parents: agent-harness`. `domains/folder.md` and `domains/file-kind.md` declare `domain-parents: domain`.

The consequence, measured with `bun tools/governs.ts` over one document of each kind: `domains/folders/*.md` and `domains/file-kinds/*.md` are governed by `domains/domain.md` outright. `domains/roles/*.md`, `domains/personas/*.md` and `domains/tasks/**/*.md` are reached only through the section-anchored surfaces — "only where `# Definition` changes" and so on — so anyone touching a prose section is bound and anyone touching frontmatter alone is not.

The claim that a domain is not a fourth kind is still stated in live code. `tools/lib/seat-resolve.ts` reads: "A domain is not a fourth kind beside them but the property those kinds have — so one surface answering on two axes is no collision: `--role worker` and `--domain worker` both name `domains/roles/worker.md`, differing in what is claimed rather than in what is read."

The retired Vision said it outright — a role, a task and a persona each are domains. `dirty/rulings/identity/domain-has-subtypes.md` says it in quarantine, which binds nobody. No surface on the perimeter says it.

Three ways out, none settled by any instrument: `role`, `persona` and `task` gain `domain` as a parent, which is an edge decision and widens what their readers hold at boot; or the claim is written as a Design entry on `domain`; or it stands, the conditional reach already catching every edit that matters.

Raised by the `review-instructions` reading of `domains/domain.md` on 2026-08-05.
