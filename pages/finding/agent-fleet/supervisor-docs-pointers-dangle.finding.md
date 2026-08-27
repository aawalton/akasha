---
id: 05e95a23-e834-51fc-a987-9b57dc154c3f
page-type-slug: finding
title: "Supervisor docs pointers dangle"
domain-slug: domain/agent-fleet
---

# Claim

`packages/agents/supervisor/docs/` no longer exists in the code repo, and fifteen live source files still send the reader there. Each names a document by path in a docblock — "See the failure-category account in `docs/fleet-memory-reaper.md`" and the like — and the systemd unit `memory-reaper.service` carries a `Documentation=` URL into the same removed tree. Nothing compiles or checks a path written in a comment, so all fifteen read as live pointers.

# Evidence

Read against `~/code` at `d01942409a` on 2026-08-07. `ls packages/agents/supervisor/` returns `apps.workflow.ts`, `dist`, `package.json`, `src`, `tsconfig.json` and `tsconfig.tsbuildinfo` — no `docs`.

Fifteen non-JSON source files name that tree or a document in it. Eleven are under `packages/agents/supervisor/src/`: `supervisor-proxy-liveness.ts`, `supervisor-interactive-boot.ts`, `memory-reaper-daemon.ts`, `supervisor-self-heal-jitter-decide.ts`, `supervisor-precliff-restart-decide.ts`, `supervisor-idle-decide.ts`, `agent-exit-record.ts`, `supervisor-self-heal.ts`, `supervisor-idle-observe.ts`, `supervisor-monitors-wire.ts` and `supervisor-limit-resume.ts`. Three are under `packages/agents/shared/`: `agent-exit-event.ts`, `agent-exit-reading.ts` and `agent-exit-capture.ts`. One is `packages/agents/oauth-proxy/src/state-file.ts`. Separately, `packages/infra/checks/src/lib/prose-mechanism-restatement.ratchet.json` holds eight entries keyed on paths in the same tree.

`memory-reaper-daemon.ts:12` is representative: "See the failure-category account in `docs/fleet-memory-reaper.md` and the tick in `memory-reaper-tick.ts`." The second half of that sentence resolves and the first does not. `packages/shared/dotfiles/.config/systemd/user/memory-reaper.service` carries `Documentation=https://git.alanwalton.com/alan/code/src/branch/main/packages/agents/supervisor/docs/fleet-memory-reaper.md`, which is a 404 against `main`.

The documents were moved rather than deleted — ten stand under quarantine in the instructions repo as `dirty/code/packages-agents-supervisor-docs-*.md` — so this is residue of a move in flight rather than lost work. What makes it worth recording is that nothing reports it: a path in a docblock is not typechecked, not linted and not linked, so the move left fifteen pointers that read as live and resolve to nothing, and the build is green.

Found while ingesting `dirty/knowledge/fleet-memory-reaper.md`.
