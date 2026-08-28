import { createHash } from "node:crypto"
import { answerAt, answersAt, cacheAnswer, forget, type Key, sweep } from "../../cache/cache.ts"
import { type Input, markOf } from "../../cache/mark/mark.ts"
import { RUNTIME_MARK } from "../../page/runtime/runtime.ts"
import { type Plan, relativeTo } from "../deploy/deploy.ts"

export const DEPLOY_KIND = "deploy"

const APPLIED = "applied"

export interface Applied {
  readonly when: string
  readonly manifests: readonly string[]
}

function bodyOid(yaml: string): string {
  return createHash("sha256").update(yaml).digest("hex")
}

/**
 * The manifests a deploy would apply, each at the body it holds.
 *
 * THE CLOSURE IS WHAT WOULD BE APPLIED RATHER THAN WHAT WAS READ TO WORK IT OUT. A closure taken
 * over the synth and everything it imports would miss what a synth reads off disk without importing
 * it — the grafana dashboards under `data/`, the upscale bench runner — and a service whose only
 * change was one of those would read as unchanged and never deploy. What the synth emitted cannot
 * be wrong about what the synth emitted.
 *
 * THE PATH IS IN THE MARK BESIDE THE BODY, so a manifest renamed with its contents untouched still
 * moves the mark: the old path is applied no longer and the cluster keeps whatever it held.
 */
export function manifestClosureOf(akasha: string, plan: Plan): readonly Input[] {
  return plan.manifests.map((one) => ({
    path: relativeTo(akasha, one.path),
    oid: bodyOid(one.yaml),
  }))
}

export function markFor(akasha: string, plan: Plan): string {
  return markOf(DEPLOY_KIND, plan.service.slug, RUNTIME_MARK, manifestClosureOf(akasha, plan))
}

function keyFor(slug: string, mark: string): Key {
  return { kind: DEPLOY_KIND, name: slug, mark, subject: APPLIED }
}

function isApplied(value: unknown): value is Applied {
  if (typeof value !== "object" || value === null) return false
  const held = value as Record<string, unknown>
  return typeof held.when === "string" && Array.isArray(held.manifests)
}

/**
 * When this service was last deployed from exactly these manifests, or nothing.
 *
 * A MARK IS THE WHOLE QUESTION: an answer filed under one is an answer about that closure and no
 * other, so a body that changed asks a question nothing has been filed against.
 */
export function appliedAt(akasha: string, slug: string, mark: string): Applied | null {
  const held = answerAt(answersAt(akasha), keyFor(slug, mark))
  return isApplied(held) ? held : null
}

export function recordApplied(akasha: string, plan: Plan, mark: string): void {
  const at = answersAt(akasha)
  const slug = plan.service.slug
  sweep(at, DEPLOY_KIND, slug, mark)
  const applied: Applied = {
    when: new Date().toISOString(),
    manifests: plan.manifests.map((one) => relativeTo(akasha, one.path)),
  }
  cacheAnswer(at, keyFor(slug, mark), applied)
}

/**
 * Every service's record that no page names any more, removed.
 *
 * A CACHE GOES WHEN WHAT IT WAS TAKEN FROM GOES. A slug with no page deploys nothing, so what is
 * filed under it answers a question nobody can ask.
 */
export function forgetGone(akasha: string, slugs: readonly string[]): void {
  forget(answersAt(akasha), DEPLOY_KIND, slugs)
}
