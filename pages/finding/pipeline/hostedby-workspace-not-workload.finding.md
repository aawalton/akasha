---
id: fa8660c6-0b73-5b02-b12c-685869eeec0f
page-type-slug: finding
title: "Hostedby workspace not workload"
domain-slug: page-type/pipeline
---

# Claim

`hostedBy` names the declaring WORKSPACE rather than the runtime WORKLOAD name a reader needs to locate where something actually runs — all 32 declaring packages carry the identical value `@infra/ci-orchestrator`, whose `k8s/synth-deployment.ts` synthesizes a Deployment named `worker-supervisor` in namespace `workers`, and no cluster object is named `ci-orchestrator`. Its consumer, `hasHostedByDecl`, also never validates the named host exists.

# Evidence

`hostedBy` is defensible under its own definition (`.claude/docs/functional-type.md` row 3, `functional-type-shapes.ts:23-31`: "the workspace runs as a Bun.spawn subprocess inside the named host's k8s pod") and useless for "where does this actually run," the question every reader brings. Proof: `@shared/worker-supervisor` declares `hostedBy '@infra/ci-orchestrator'` — the host is hosted by its own synthesizer, circular under the reader's reading, correct under the field's definition.

Consumer: `packages/infra/checks/src/lib/functional-type-row-discriminators.ts:126-128` (`hasHostedByDecl`), a positive signal for `functionalType: "service"`. Accepts any non-empty string; never validates the named host exists or synthesizes a pod — a typo, a rename, or a dead host pass silently.

Measured cost, 2026-07-25 ~23:45Z: worker-16239 tried to tell if `devops-monitor` was running — kubectl all-namespaces nothing (searched the declared host), Loki 1h window nothing, no local process, own traffic last seen 3h17m earlier; correctly refused "dead," couldn't confirm "alive." dalla settled it via `ps` in the worker-supervisor pod: running, one of 36 `.worker.ts` children. Separately worker-16248 found 185 heartbeat rows (`worker.loop_duration_ms`), newest 43s old — answer was in the database all along (that read-side gap is #16248's).

Candidate fixes, not decided: (1) add the missing workspace-to-workload mapping, cheapest; (2) make `hostedBy` name the workload, clearer but breaks the discriminator, touches 32 packages; (3) make the discriminator validate the referent, independently justified.

Instance of the #16344 class: a declaration true of something, read as an answer to a different question. Raised by dalla after worker-16239's failed search; established by worker-16248 reading the definition, consumer, and all 32 sites; out of #16248's scope.

Project #16359, someday_maybe, domain pipeline. Carried no objective; captured off the retired `notes` attribute on 2026-08-15.
