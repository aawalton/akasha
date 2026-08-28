---
page-type-slug: finding
slug: seat-read-returns-less-than-the-gate-requires
title: "`ops read --seat` returns fewer documents than the write gate requires, and the answer does not say so"
domain-slug: command/read
---

# Claim

`ops read --seat` returns a smaller set of documents than the write gate requires, and the answer gives no sign of it.

For a seat bound to persona `claude`, domain `pages-system` and role `worker`, `ops read --seat` returned 23 documents whole. The `SubagentStart` hook for that same seat named 15 further documents as unread, and refused every tool but `ops read` and `ops search` until they were read. The two sets are disjoint: not one of the 15 appeared in the 23.

The answer did not report itself as cut. `ops read --help` states that where one answer's 28000-character ceiling is reached, "what is left is neither read nor recorded, and the last line is the call that takes it, ready to run". No such line was printed. The answer ended on its conditional-reading block, and read as complete.

The ceiling is not what did it. A second `ops read --seat` was run after all 15 had been read by other calls. It returned the same 23 documents, each one whole and each marked "as `--full` asks", and still named none of the 15 — so the set `--seat` binds is smaller than the gate's, rather than the same set cut short.

The two sets differ by where the closure stops, not by size alone. `--seat` followed the page-type-and-required-reading closure for the domain binding and not for the persona or role bindings. From `pages/domain/pages-system.domain.md` it reached `pages/page-type/domain.page-type.md` and each of that page's four `required-reading-slugs:`, and on transitively to five `page-body-section` pages and `pages/domain/declared-reading.domain.md`. From `pages/role/worker.role.md` it stopped: it did not follow that page's `domain-parent-slug: page-type/role` to `pages/page-type/role.page-type.md`, nor that page's four `required-reading-slugs:` — `domain/agent-conduct`, `domain/seat-writing`, `domain/seat-running`, `domain/seat-delegating`. From `alan/persona/claude.persona.md` it likewise did not follow `page-type/persona` or that page's `domain/agent-harness`.

`pages/domain/required-reading.domain.md:18` states that required reading is "a declared reading and everything that set names in turn". `--seat` did that for one of its three bindings.

What causes this in code is not established here and no cause is named. Candidates not ruled out: a closure that walks page types for domain bindings only, a seat-binding assembly that collects the bound pages without expanding them, and a gate closure that expands a set `--seat` never intended to cover.

# Evidence

Observed 2026-08-28 by seat astra's delegate, at `6e256b522`, on this workstation.

**The two sets.** `ops read --seat`, run twice — once at the start of a turn with nothing on record, once after every document below had been read — returned these 23 documents both times, and three conditional-reading definitions beneath them:

`alan/persona/claude.persona.md`, `pages/domain/pages-system.domain.md`, `pages/domain/global.domain.md`, `pages/role/worker.role.md`, `pages/page-type/domain.page-type.md`, `pages/domain/file-structure.domain.md`, `ops-cli/global/read/read.command.md`, `ops-cli/global/search/search.command.md`, `pages/old-ops-command/ops-reminder-set.old-ops-command.md`, `pages/page-body-section/domain-definition.page-body-section.md`, `pages/domain/domain-invariant.domain.md`, `pages/domain/domain-directive.domain.md`, `pages/domain/required-reading.domain.md`, `pages/domain/file-arrangement.domain.md`, `pages/page-type/command.page-type.md`, `pages/page-type/old-ops-command.page-type.md`, `pages/page-body-section/domain-design.page-body-section.md`, `pages/page-body-section/domain-condition.page-body-section.md`, `pages/page-body-section/domain-intent.page-body-section.md`, `pages/page-body-section/domain-principle.page-body-section.md`, `pages/page-body-section/domain-rule.page-body-section.md`, `pages/domain/declared-reading.domain.md`, `pages/domain/command.domain.md`.

The `SubagentStart` hook, for the same seat, named these 15 as unread and refused every tool but `ops read` and `ops search` until they were read:

`pages/domain/agent-evidence.domain.md`, `pages/domain/agent-acting.domain.md`, `pages/domain/agent-asking.domain.md`, `pages/domain/agent-reporting.domain.md`, `pages/domain/seat-delegating.domain.md`, `pages/domain/seat-running.domain.md`, `pages/domain/agent-harness.domain.md`, `pages/domain/seat-writing.domain.md`, `pages/domain/agent-conduct.domain.md`, `pages/domain/alan-harness.domain.md`, `pages/domain/alan-harness-tools.domain.md`, `pages/domain/alan-harness-agents.domain.md`, `pages/domain/agent-definitions.domain.md`, `pages/page-type/persona.page-type.md`, `pages/page-type/role.page-type.md`.

**The second run is what rules out the ceiling.** Had the first answer been trimmed at 28000 characters, the second — run when 21 of the 23 were already on record and would have come back as one line each rather than whole — would have had room to reach further. It did not. It reprinted all 23 whole, each marked "as `--full` asks", which is the documented behaviour of `--seat`, and named none of the 15.

**Where the closure stops.** `pages/role/worker.role.md` carries `domain-parent-slug: page-type/role`. `pages/page-type/role.page-type.md:10-14` carries `required-reading-slugs:` naming `domain/agent-conduct`, `domain/seat-writing`, `domain/seat-running`, `domain/seat-delegating`. `pages/domain/agent-conduct.domain.md:7-11` names the four `agent-*` domains in turn. That chain reproduces 8 of the 15 from the role binding alone, and `alan/persona/claude.persona.md` through `pages/page-type/persona.page-type.md:10-12` reproduces `domain/agent-harness` from the persona binding. The same chain shape, taken from `pages/domain/pages-system.domain.md`, was followed in full.

**Not measured.** Whether the gate's set and `--seat`'s set are computed by the same code at all; whether a seat bound to a different persona, domain or role shows the same gap; and whether any write has actually been refused on a document `--seat` omitted, beyond this one.

**Why it matters here rather than only as an inconvenience.** `pages/domain/pages-system.domain.md:36` states "Refuse where you cannot answer, rather than answering as though there were nothing", and beneath it "A true empty and a failure read alike, and only one of them is a fault". An answer that names what a seat is bound to, omits a third of it, and prints no mark of the omission is that case: the reader is handed a complete-looking set and gets the symptom only later, from a refusal that names documents the answer never mentioned.
