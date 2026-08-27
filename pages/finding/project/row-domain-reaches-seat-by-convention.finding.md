---
id: 0346fb68-30fe-53e5-9916-ffae1b1afb89
slug: row-domain-reaches-seat-by-convention
page-type-slug: finding
title: "Row domain reaches seat by convention"
domain-slug: barred-meaning/project
---

# Claim

Nothing joins a project row's declared domain to the seat dispatched onto it. The row document carries `domain:` as a required key and `ops seat start` takes `--domain`, but no instruction names the join and no check tests it, so a seat reaches the right domain by the dispatcher's habit alone.

# Evidence

Measured 2026-08-05 against `~/instructions` and `~/memory`.

`tools/document/schemas/project.ts` requires `domain:` on every project document — "the domain whose vision the work is measured against", `cardinality: once`, added in `5126d0cd` on 2026-08-03. All 71 documents under `~/memory/projects` carry it.

The database row does not. `ops project show 17593 --json` returns `owner`, `status`, `instructionsOnly` and no domain property, so the declaration lives only in the prose carrier.

`ops seat start --help` states that a headless seat "gets a domain from this flag or from nowhere" — the classifier that fills the agent row has no domain arm.

Three dispatch sites send the dispatcher to that help and none names the row's domain as what to pass: `tasks/lead/dispatch-project.md:18`, `tasks/projects/build-parent-deploy.md:27`, `tasks/projects/build-parent-instructions.md:26`. `grep -rn "agent spawn" tasks/` returns those three and nothing else.

No instrument under `tools/checks/` compares a dispatched seat's domain against its row's.

The convention nonetheless held on every live case at the time of measurement. `ops seat list` showed four dispatch seats — `code-harness-developer-17865`, `claude-agent-harness-developer-17867`, `claude-agent-harness-developer-17868`, `code-check-developer-17869` — and each carries the domain its row document declares (`code-harness`, `agent-harness`, `agent-harness`, `code-check`).

Not measured: whether any completed dispatch ever disagreed, the seat name being the only surviving trace.
