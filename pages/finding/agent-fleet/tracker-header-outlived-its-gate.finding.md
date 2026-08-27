---
id: 3cddac36-271f-5fe8-a43a-a87e7146b3c5
page-type-slug: finding
title: "Tracker header outlived its gate"
domain-slug: domain/agent-fleet
---

# Claim

Two live source files contradict each other about whether the OAuth proxy's drain-before-reexec gate is wired, and the stale one is a module's own header. `in-flight-tracker.ts` says `requestSelfHealRestart` awaits `whenIdle(60_000)` before SIGTERMing the supervisor; that function awaits nothing, and its own docblock says no drain gate is needed. The module is live — the proxy builds two trackers from it — so its header names a consumer removed with #9360 and routes to a document gone from the repo.

# Evidence

The stale header is `packages/agents/shared/in-flight-tracker.ts:1-9`: "In-flight request tracker for the OAuth proxy's drain-before-reexec gate (project #9316). The proxy increments on every `/v1/messages*` request entry and decrements on exit; `requestSelfHealRestart` (`supervisor-self-heal.ts`) awaits `whenIdle(60_000)` before SIGTERMing the supervisor so an active Anthropic stream survives a `liveVersion` deploy." It closes with a markdown link reading "See self-heal-drain.md" targeting `docs/self-heal-drain.md`, written here without link syntax so this document's link check does not resolve it.

The live `requestSelfHealRestart` at `packages/agents/supervisor/src/supervisor-self-heal.ts` is synchronous, returning `undefined`. It latches `pendingReExec` and calls `killSelf("SIGTERM")` with no await of any kind, and its own docblock states the opposite: "The OAuth-proxy is its own detached process (project #9360) and survives the `execvpe` independently … so no in-process drain gate is needed here."

The wiring the header describes is gone, not moved. `rg -uuu -l "setDrainSource"` and `rg -uuu -l "drainBeforeReExec"` over `~/code` each return zero files, so both are absent including ignored and hidden files.

The module is live, which is what makes the header worth repairing rather than deleting with its subject: `buildInFlightTracker` is called at `packages/agents/oauth-proxy/src/oauth-proxy.ts:96` and `:115`, and `packages/agents/shared/agents/inflight.ts` exposes its contract as a CLI verb.

The pointer resolves nowhere. That document is the one being emptied under quarantine as `dirty/code/packages-agents-shared-docs-self-heal-drain.md`, absent from all seven roots — `~/instructions`, `~/code`, `~/memory`, `~/books`, `~/stories`, `~/code-editor`, `~/esoui` — checked with `rg -uuu --files` per root.

Met while emptying that quarantined document, which is right about the gate being gone. The contradiction is between two live files, so it outlives the sweep.
