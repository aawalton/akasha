---
id: 571f002f-8638-506a-9c60-d9c177b91533
page-type-slug: finding
title: "Quarantined docs drift ungoverned"
domain-slug: domain/global
---

# Claim

Quarantined package documentation goes stale silently and nothing can see it happen. On 2026-08-03 every `CLAUDE.md` left the code repository for `dirty/` — zero remain in code — leaving 1,732 documents in a queue `ops instructions governs` answers "nothing governs it" for. The git-transport doc still describes "the two bare repos" against four, all mirroring since today. It drifted because quarantine removed the co-location that brought a code change and its prose together.

# Evidence

Measured 2026-08-05 in both repositories.

`find . -name CLAUDE.md -not -path "./node_modules/*"` in the code repository returns 0. The deleting commit is `7205e28efd`, 2026-08-03, "quarantine every instruction surface into the instructions repo"; the receiving side is `d3897793` in the instructions repo, "quarantine code-repo instruction files (batch-04)".

`dirty/` now holds 1,732 `.md` files across `code`, `docs`, `domains`, `folders`, `initiatives-old`, `knowledge`, `questions` and `skills`. `dirty/code` alone holds 1,138.

`ops instructions governs --file-path <instructions>/dirty/code/packages-infra-git-transport-claude.md` returns "nothing governs it". The same call for `domains/storage.md` returns five surfaces, so the instrument reports governance when there is any.

The staleness, in `dirty/code/packages-infra-git-transport-claude.md`: its description says the package "handles push/fetch over HTTP for the two bare repos it hosts"; a section headed "## The two repos" carries a two-row table; and the storage topology says "GitHub holds one offsite mirror per repo", listing only `code.git` and `instructions.git`. The hooks snapshot beside it says "The two repos differ in kind, so a single policy cannot be right for both."

There are four bare repos — `code`, `instructions`, `books`, `memory` — and as of project #17876 all four declare a `mirror.url` and carry `post-receive`. The prose was already false before that change, since `books` and `memory` were created earlier.

What makes this a claim about the queue rather than one document: while a `CLAUDE.md` sat beside the code it described, a seat changing that code met the prose in the same directory. Quarantine removed that and nothing replaced it — the queue is not governed, not gated, and not reachable from a `governs` call on the code it describes. Time in the queue is time a document can only get further from true.

Not measured: how many of the 1,732 make checkable claims at all, and whether any ingestion has run since 2026-08-03.
