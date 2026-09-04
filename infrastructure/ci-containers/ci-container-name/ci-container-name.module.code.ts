import { createHash } from "node:crypto"
import { dirname } from "node:path"

export const CONTAINER_NAME_MAX_LEN = 63

const CONTAINER_NAME_DIGEST_LEN = 8

export const STEP_LABEL_KEY = "pipeline-engine/step"

export function sanitizeDnsName(said: string, maxLen: number = CONTAINER_NAME_MAX_LEN): string {
  return said
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, maxLen)
    .replace(/^-|-$/g, "")
}

export function shortCommit(commit: string): string {
  return commit.slice(0, 7)
}

export function buildContainerName(pipelineSeq: string, stepName: string, commit: string): string {
  const composed = `pe-${pipelineSeq}-${stepName}-${shortCommit(commit)}`
  const whole = sanitizeDnsName(composed, composed.length)
  if (whole.length <= CONTAINER_NAME_MAX_LEN) return whole
  const digest = createHash("sha256")
    .update(whole)
    .digest("hex")
    .slice(0, CONTAINER_NAME_DIGEST_LEN - 1)
  const head = whole.slice(0, CONTAINER_NAME_MAX_LEN - CONTAINER_NAME_DIGEST_LEN).replace(/-$/, "")
  return `${head}-${digest}`
}

export function checkoutPath(commit: string): string {
  return `/ci-storage/checkouts/${commit}`
}

export function instructionsTreePath(commit: string): string {
  return `/ci-storage/instructions/${commit}`
}

export function akashaTreePath(commit: string): string {
  return `${dirname(instructionsTreePath(commit))}/akasha`
}
