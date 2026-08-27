---
id: e538cd8a-4717-57d9-a2c3-75c2d3efdcec
page-type-slug: finding
title: "Role glob makes agent harness key inert"
domain-slug: page-type/domain
---

# Claim

As of 2026-08-02, governance closure in `tools/lib/governs.ts:resolve()` runs upward through `domain-parents:` from any matched glob, so `domains/role.md`'s universal `instructions-path`/`code-path` of `"**"` carries its parent `domains/agent-harness.md` onto every path in both repositories since `role` reparented to `agent-harness` (commit `29ff14ca`) — making `agent-harness`'s own declared key inert: it can neither widen nor narrow what already governs everything.

# Evidence

Project #17489, domain `domain`. Created by `athena-lead` as the first of three children under #17479, replacing that row's R1 whose criteria were made untrue before it was dispatched.

**The gap, restated.** `domains/agent-harness.md` declares `instructions-path: "**/*.md"` and no `code-path:`, while its definition claims "everything that binds an agent" across both repositories.

**Why widening the key would now accomplish nothing.** `domains/role.md` declares `instructions-path: "**"` and `code-path: "**"`. Governance closes upward via `domain-parents:`, and since `role` reparented from `global` to `agent-harness` (Alan's ruling, commit `29ff14ca`), role's universal glob carries `agent-harness` onto every path in both trees. Measured 2026-08-02: `governs.ts --file-path personas/athena.md` and `--file-path packages/agents/shared/persona-facts.ts` both include `domains/agent-harness.md`, though neither is claimed by its own key. Also found: neutering `agent-harness`'s `instructions-path:` to match nothing changed no result — `settings/agents.json` and `personas/claude.md` stayed governed via role's ancestry. The key can neither widen nor narrow its scope. Was to be filed as `findings/governance-closes-upward-past-scope.md`.

**Not fixed by reverting.** The reparent is Alan's ruling, out of scope to undo. It exposed an over-wide glob rather than creating one — under `global` the overmatch was invisible.

**Left for a definition reading:** whether `role.md`'s `**` is right at all; the remedy (narrow role's globs, give closure a rule on which ancestors it carries, let a document cap what it inherits, or accept agent-harness governs everything and drop its key); the cost today, measured as surfaces an agent must hold to edit a file before/after the reparent; whether any other document carries a glob wider than its own claim (only role's was checked).

**Landing:** `instructions` if frontmatter, `deploy` if it reaches `tools/lib/governs.ts`.

A 2026-08-02 re-derivation confirmed the figures firsthand; which disagreed was cut and not preserved here.
