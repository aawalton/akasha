---
id: 197980cf-879d-5fc3-b1ff-3ece334297e9
page-type-slug: finding
title: "Code cites deleted instruction paths"
domain-slug: domain/agent-harness
---

# Claim

Code in the monorepo cites instruction-repo paths by name, and nothing checks that they still resolve, so a rename or a deletion in the instructions repo strands them silently — including inside refusal text an agent is told to act on.

# Evidence

97 sites across `packages/agents` cite `domains/identity.md`, which commit `415fb0b1` deleted on 2026-08-05. `cli/src/agent/decide-spawn-name.ts:71` and `cli/src/agent/pre-claim.ts:27` put that path inside user-facing refusal strings. `shared/agent-identity.ts:28,44,75` and `shared/db-agent-create.ts:72` quote its body verbatim; the quoted sentences came from its Vision, stripped earlier the same day by `b96b5e66`.

Four further targets do not resolve. `shared/agent-mode.ts:4` cites `domains/role-mode.md`, renamed to `domains/seat-mode.md`. `supervisor/src/supervisor-resume-notices.ts:9` cites `folders/agent-fleet.md`; `folders/` moved under `domains/`. `shared/compose-identity-name.ts:39,62` and `cli/src/agent/project-identity.ts:22` cite a `rulings/` directory that does not exist. `shared/agent-mode.ts:45` and `cli/src/agent/pin-identity.ts:78` cite `tools/lib/pins.ts`, absent.

Counted by grep over `packages/agents` on 2026-08-05.
