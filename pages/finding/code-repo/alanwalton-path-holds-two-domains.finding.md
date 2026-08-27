---
id: 53e2f342-0cb0-5e5c-9bfd-0f3cecdc0813
page-type-slug: finding
title: "Alanwalton path holds two domains"
domain-slug: repo/code-repo
---

# Claim

`packages/alanwalton/` holds Alan's own systems and agent-fleet machinery side by side, so no folder-domain glob over it is correct: one covering the directory charges every agent editing fleet code with reading Alan's domain, and one excluding the fleet needs more globs than allowed.

# Evidence

Measured 2026-08-02 from `~/code` and `~/instructions` by the lead seat on alan-harness.

The directory holds 43 subpackages. Fleet machinery among them, read from each package's own `CLAUDE.md` description: `projects` (the agent project system), `stale-project-detector` ("sweeps the projects table for in-flight rows idle past a threshold"), `persona-reward-watcher` ("messages her agent to run the reward / wallpaper flow"), `personas` (the persona registry), `feature-requests` (intake emitting an Astra handoff envelope). Alongside them sit `calendar`, `daily-tracking`, `meds`, `imessage`, `sms`, `email`, `voice`, `web` and `native-shell`, which carry Alan's own day.

Two folder domains already carve subtrees out of the same path and are parented to `code-repo` rather than to anything covering the directory: `folders/atlas-app.md` claims `packages/alanwalton/atlas/**` and `folders/narrative-engine.md` claims `packages/alanwalton/awen/**`.

`tools/document/schemas/domain.ts` types `code-path` as a glob or a list of globs with `cardinality: atMost(5)`, and declares no negation form, so an exclusion list longer than five has nowhere to be written.

Not measured: eight of the 43 subpackages were classified from their `CLAUDE.md` description lines and the rest by name only; no full classification was made. Nothing was measured about how often agents actually edit fleet code under this path, so the size of the cost is unknown — only its direction.
