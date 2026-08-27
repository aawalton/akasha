---
id: 197980cf-879d-5fc3-b1ff-3ece334297e9
slug: code-cites-deleted-instruction-paths
page-type-slug: finding
title: "Code cites deleted instruction paths"
domain-slug: domain/agent-harness
---

# Claim

Code cites corpus document paths by name, and nothing checks that they still resolve, so a rename or a deletion strands them silently — including inside refusal text an agent is told to act on.

# Evidence

97 sites across `packages/agents` cite `domains/identity.md`, which commit `415fb0b1` deleted on 2026-08-05. `cli/src/agent/decide-spawn-name.ts:71` and `cli/src/agent/pre-claim.ts:27` put that path inside user-facing refusal strings. `shared/agent-identity.ts:28,44,75` and `shared/db-agent-create.ts:72` quote its body verbatim; the quoted sentences came from its Vision, stripped earlier the same day by `b96b5e66`.

Four further targets do not resolve. `shared/agent-mode.ts:4` cites `domains/role-mode.md`, renamed to `domains/seat-mode.md`. `supervisor/src/supervisor-resume-notices.ts:9` cites `folders/agent-fleet.md`; `folders/` moved under `domains/`. `shared/compose-identity-name.ts:39,62` and `cli/src/agent/project-identity.ts:22` cite a `rulings/` directory that does not exist. `shared/agent-mode.ts:45` and `cli/src/agent/pin-identity.ts:78` cite `tools/lib/pins.ts`, absent.

Counted by grep over `packages/agents` on 2026-08-05.

Re-measured 2026-08-27 against akasha, which replaced both repositories. The sites above are gone with `packages/`, and the same defect stands at five citations in surviving non-test source, every one naming a document in a `domains/` tree that no longer exists: `editor-extension/src/features/agent-tree/harness.ts:12` cites `domains/agent-harness.md` and `:179` cites `domains/subagent-turn.md`; `editor-extension/src/features/agent-tree/forest.ts:150` cites `domains/agent-turn-working.md`; `editor-extension/src/features/status-bar/legends.ts:32` cites `domains/readout-system.md`; `editor-extension/src/seat/window-identity.ts:22` cites `domains/code-editor.md`. Four of the five documents survive at a new spelling under `pages/domain/*.domain.md`; `readout-system` stands nowhere. Nothing checks them: `doctrine-path-citations` and `classifyCitationRoot` are absent from source, and `ops audit` registers no citation check.
