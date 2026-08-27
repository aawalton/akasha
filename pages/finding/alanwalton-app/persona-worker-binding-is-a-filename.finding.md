---
id: dcd9f78d-8175-5955-867c-4fd41e873b74
slug: persona-worker-binding-is-a-filename
page-type-slug: finding
title: "Persona worker binding is a filename"
domain-slug: domain/alanwalton-app
---

# Claim

Nothing binds a persona to the worker that meters her. The supervisor discovers workers by `.worker.ts` filename suffix and each worker hardcodes its persona's slug, so no authority answers "who writes this persona's points". Nimue is the live instance: her row reads `external`/`owned-project-completions`, metered by the completions pass, while a `nimue-points` worker writing the same daily field still stands in the tree.

# Evidence

Measured 2026-08-07 against `~/code` and the live database, while emptying `dirty/skills/persona-craft/findings.md`, which recorded both halves on 2026-07-28.

The discovery mechanism. `packages/shared/worker-supervisor/src/discovery.ts:12` sets `const WORKER_SUFFIX = ".worker.ts"`, and `walkDir` below it recurses the tree collecting every file ending in that suffix, pruning only build and dot directories. There is no manifest, no registry and no persona field in a `WorkerSpec` — a worker is discovered because of what its file is called.

The other end is a constant in the worker. `fun-points/src/actions/reconcile-fun-points.ts:37` is `const AURA_PERSONA_SLUG = "aura"`, matched against persona rows at line 165; `nimue-points.worker.ts` has the same shape for `nimue`. The persona a worker meters is a string literal inside it, and the connection to her row is that the names resemble each other.

The instance. Nimue's row returns `external`, `owned-project-completions`, `greenDayPoints: 4` — so the completions pass writes her daily `faucetPoints`. `packages/alanwalton/nimue-points/` is still in the tree with its `.worker.ts`, and nothing retired it when her kind changed; the quarantined entry reports it writes the same field via `writePersonaDayPointsFromTotal`.

Why it would fail quietly: both writers produce a well-formed row, so a last-writer-wins collision leaves no artifact distinguishing it from a single correct write.

NOT ESTABLISHED, and the distinction matters: whether the `nimue-points` worker is actually scheduled. `boot-recovery.ts:13-14` describes `scanRoots` discovery as one path and its own comment at line 42 calls it "legacy", with a `desired-state-reconcile` beside it. A worker file on disk therefore does not prove a worker running. So the double-write is a live hazard whose realisation I did not measure, not a collision I observed. What is established is that nothing in the estate would tell a reviewer either way.
