---
id: 97de6cb0-f055-5f1f-a772-8d3644d9c9fe
slug: one-program-two-spellings
page-type-slug: finding
title: "One program two spellings"
domain-slug: domain/global
---

# Claim

One program carries two names across the corpus: `ops instructions <x>` spawns `tools/<x>.ts` and forwards every argument verbatim, so `bun ~/instructions/tools/read.ts` and `ops instructions read` are the same call. `domains/global.md` **Ubiquitous Naming** asks for one. The corpus is split at the top: `domains/repos/instructions-repo.md` **Recorded Reading** binds the `ops` spelling, while the machinery's own `owed:` line at `tools/lib/owed.ts:23` composes the `bun` one.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/tasks/definer/define-definition.md`, from that reading's hand-back and its report at `~/agents/claude-define-definition-archivist-review-instructions/review-define-definition.md`. Sited here rather than on the task it was found in: the split is corpus-wide and the tooling is this domain's subject.

That reading reports reading `tools/ops/forwarders.ts` and `tools/ops/tool-forward.ts` to establish that the two spellings are one program, and names the subject document's own mixture — `bun ~/instructions/tools/read.ts`, `run-gates.ts` and `edit.ts` at three lines, `ops instructions dag|governs|glossary|mv|run-checks` everywhere else. It judged this not the document's to settle and named a horizontal change as what settling it costs.

Not measured: I re-derived none of it — I did not open the two forwarder files, `tools/lib/owed.ts`, or count the sites across the corpus. Nothing here says which spelling should win, and nothing here says whether any agent has ever run the wrong one.
