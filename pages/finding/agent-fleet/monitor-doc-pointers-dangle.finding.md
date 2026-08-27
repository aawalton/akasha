---
id: e8fe5b50-eaf4-5e95-9190-3d754394ecfd
slug: monitor-doc-pointers-dangle
page-type-slug: finding
title: "Monitor doc pointers dangle"
domain-slug: domain/agent-fleet
---

# Claim

Seven live comments under `packages/agents/supervisor/src/` route a reader to `docs/per-agent-monitors.md`, and no file of that name exists anywhere in the code repository. The document was quarantined into the instructions repo and has now been ingested and removed, so the pointer resolves nowhere in either repo. Each of the seven closes a module header with it as the place to read that monitor's doctrine.

# Evidence

`grep -rn "per-agent-monitors.md" packages --include=*.ts`, excluding `dist`, returns eight lines. Seven are pointers in module headers:

- `supervisor-monitors-wire.ts:8` — "See `docs/per-agent-monitors.md` for each monitor's doctrine."
- `supervisor-proxy-liveness.ts:19` — "→ OAuth-proxy liveness respawn"
- `supervisor-limit-resume.ts:22` — "→ Limit-death resume"
- `supervisor-idle-observe.ts:15` — "→ Idle probe"
- `supervisor-idle-decide.ts`
- `supervisor-precliff-restart-decide.ts`
- `supervisor-interactive-boot.ts:246`

The eighth, `packages/infra/checks/src/lib/retired-status-exclusions.ts:76`, names the document in prose rather than as a path and is not a pointer.

`find . -name "per-agent-monitors.md"` across the code repo returns nothing. The document stood at `dirty/knowledge/per-agent-monitors.md` in the instructions repo and was removed there on this ingestion.

Three of the seven pointers name a section by title — "→ Idle probe", "→ Limit-death resume", "→ OAuth-proxy liveness respawn" — so repairing the path alone would not restore what they cite. Nothing was landed to replace the document: every section of it was cut, six of the nine on filter 1, four of those because the self-stop monitor it described was removed from the fleet.

What that means for the repair is that it is a removal rather than a repoint. The doctrine each pointer promised is now carried by the module header the pointer sits in — `supervisor-guard-tick.ts`, `supervisor-idle-decide.ts` and `supervisor-proxy-liveness-decide.ts` each hold theirs in full — so the sentence to cut is the pointer, not the content.

Found ingesting `dirty/knowledge/per-agent-monitors.md`.
