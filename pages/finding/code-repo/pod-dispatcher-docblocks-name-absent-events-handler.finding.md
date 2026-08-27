---
id: 8a05c367-24fd-5b11-ade6-2f01c5702a70
page-type-slug: finding
title: "Pod dispatcher docblocks name absent events handler"
domain-slug: repo/code-repo
---

# Claim

Three files under `packages/infra/ci/orchestrator/src/ci-pod-dispatcher/` carry docblocks routing through `./events-handler.ts`, a file that does not exist in the repository, and describing an events-driven consume path the dispatcher has moved off. The live caller is the level-scan tick beside them.

# Evidence

At `~/code` on `main`, `13135651993c19af09ce41b6295264191071d3c1`, five references stand. `subscriber.ts:3-4`: "Invoked from the events-handler in `./events-handler.ts`, which reads `event_category = 'k8s'` rows on `public.events` and dispatches by `event_name`." `subscriber.ts:17`: "the events-handler aborts the tick, the cursor rewinds, and the runtime replays the batch." `types.ts:3` and `emit.ts:6` each name the same file as the thing that builds or invokes at consume time.

Searching `git ls-files` for `events-handler` across the whole tree returns one file, `packages/temper/game/crafting/addon/src/events-handlers.ts`, in Temper's crafting addon and unrelated to CI.

The real caller sits in the same directory: `dispatcher-tick.ts:140` imports `handleK8sCreate` from `./subscriber`, and `:365` invokes it as `await handleK8sCreate(l.payload, { k8s })`. Its own docblock at `:58` and `:84` describes that call as part of an admission tick rather than an events consume.

The axis those docblocks describe is dead. Every hit for an `eventCategory` of `k8s` is inside `packages/shared/worker-runtime` tests and helpers using the category as a generic fixture; no orchestrator registers such a subscription. `packages/infra/ci/worker/src/reactors/apply.ts:55` states "No `pod.create` events are emitted", and `manifest.ts:13` says the per-pipeline worker no longer emits them.

The cost is past tidiness. `subscriber.ts:17` explains its own error handling by cursor rewind and batch replay, which the level-scan tick does not provide, so a reader reasoning about a throw from `handleK8sCreate` designs against a failure path the code does not take.

Nothing detects this: the reference is prose in a comment rather than an import, so no type check or gate resolves it, and the tests pass.

Found ingesting `dirty/questions/code-repo-worker-fleet.md`.
