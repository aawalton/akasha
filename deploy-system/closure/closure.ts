import { createHash } from "node:crypto"
import { answerAt, cacheAnswer, forget, gitDirAt, type Key, sweep } from "../../cache/cache.ts"
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

export function appliedAt(akasha: string, slug: string, mark: string): Applied | null {
  const held = answerAt(gitDirAt(akasha), keyFor(slug, mark))
  return isApplied(held) ? held : null
}

export function recordApplied(akasha: string, plan: Plan, mark: string): void {
  const at = gitDirAt(akasha)
  const slug = plan.service.slug
  sweep(at, DEPLOY_KIND, slug, mark)
  const applied: Applied = {
    when: new Date().toISOString(),
    manifests: plan.manifests.map((one) => relativeTo(akasha, one.path)),
  }
  cacheAnswer(at, keyFor(slug, mark), applied)
}

export function forgetGone(akasha: string, slugs: readonly string[]): void {
  forget(gitDirAt(akasha), DEPLOY_KIND, slugs)
}
