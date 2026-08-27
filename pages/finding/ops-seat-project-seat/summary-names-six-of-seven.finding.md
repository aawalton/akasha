---
id: 45c9f883-8cee-55ce-ab76-9601b2a485a5
slug: summary-names-six-of-seven
page-type-slug: finding
title: "Summary names six of seven"
domain-slug: domain/global
---

# Claim

The `// command:` summary for `ops seat project-seat` names six seat vocabularies where the verb writes seven, so the declared inventory of commands is wrong by one slot.

# Evidence

`tools/commands/seat/project-seat.ts:2` reads: "Write every seat vocabulary onto the rows that store them, in one act: six `config.options` lists (role, domain, persona, task, mode, principal)".

`tools/commands/seat/project-seat.ts:31`, in `help.description`, reads "person — from one read of the corpora, so the seven cannot describe different" — naming `person` as a seventh alongside the six.

`tools/ops/declared.ts` takes each verb's summary off that `// command:` line and nothing else, so the six is what `ops --help` and every listing report. The `// command:` line is an approved code comment form and survived the comment strip, so the discrepancy is untouched by that pass.
