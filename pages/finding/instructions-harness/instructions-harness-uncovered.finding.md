---
id: bd8e4c1a-3da9-551b-8a8c-644bc5e31dee
page-type-slug: finding
title: "Instructions harness uncovered"
domain-slug: domain/global
---

# Claim

Everything still live in the instruction-loader initiative belongs to `instructions-harness`, which has no initiative opened against it. The machinery that delivers documents to a seat is what the remainder is made of, and six gaps in it stand unaddressed.

# Evidence

Eleven initiatives stand under `initiatives/corpus/`, one for each kind of document. The machinery that delivers those documents to a seat has none, and the loader's remainder is all machinery.

Six things it still asks for, each verified on 2026-08-01. `settings/subagents.json` defines two subagent types, `general-purpose` and `claude`, each granting `Read`, `Grep` and `Glob` — so any type the client can spawn under another name is unconfined by construction, and nothing in the repository enumerates those names; the reader that established this held `Bash` as a local subagent. A failure to load the definitions at spawn is announced on the supervisor's stderr and recorded nowhere, which both `tools/lib/read-log.ts` and `tools/checks/hooks-delivered.ts` state in their own prose. `tools/checks/hooks-agree.ts` enforces that the user-tier settings copy agrees with `settings/agents.json` and nothing reports when it could be retired, `seatsUnder()` reading only `cmdline` and never a process start time. Of the hook chains registered in `settings/agents.json`, only the one at `matcher: ""` has a standing dispatch measure; `tools/gates/hook-liveness.ts` concedes in its docblock that the narrower matchers are inferred rather than observed. The loader still reads `process.cwd()` at `tools/hooks/block-memory-writes.ts:99`, `tools/hooks/block-ungoverned-writes.ts:140` and `tools/lib/governs.ts:224`, and the repository root still carries an empty `.claude/`. And an agent holding no pins is refused nothing, which `tools/hooks/hold-identity.ts` says of itself.
