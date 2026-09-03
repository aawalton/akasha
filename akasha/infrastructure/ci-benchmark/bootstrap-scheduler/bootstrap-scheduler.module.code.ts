import { requireGet } from "@tools/lib/narrow"
import type { StepNode, StepStatus } from "../bootstrap-dsl/bootstrap-dsl.module.code.ts"

export function getDispatchableSteps(
  nodes: readonly StepNode[],
  statuses: Map<string, StepStatus>
): readonly StepNode[] {
  return nodes.filter((n) => {
    if (statuses.get(n.name) !== "pending") return false
    return n.dependsOn.every((d) => {
      const s = statuses.get(d)
      return s === "completed" || s === "skipped"
    })
  })
}

export function evaluateWhenCondition(
  node: StepNode,
  statuses: Map<string, StepStatus>,
  event: string
): boolean {
  if (!node.when) return true
  if (node.when.event != null && node.when.event !== event) return false
  if (node.when.status) {
    if (node.dependsOn.length === 0) return true
    const depStatuses = node.dependsOn.map((d) => requireGet(statuses, d, "statuses"))
    return node.when.status.some((s) => depStatuses.includes(s))
  }
  return true
}

export function isWorkflowComplete(
  nodes: readonly StepNode[],
  statuses: Map<string, StepStatus>
): { complete: boolean; status: "completed" | "failed" } {
  let anyFailed = false
  for (const n of nodes) {
    const s = requireGet(statuses, n.name, "statuses")
    if (s === "pending" || s === "running") return { complete: false, status: "completed" }
    if (s === "failed") anyFailed = true
  }
  return { complete: true, status: anyFailed ? "failed" : "completed" }
}

export function propagateFailure(
  failedName: string,
  nodes: readonly StepNode[],
  statuses: Map<string, StepStatus>
): readonly string[] {
  const toSkip: string[] = []
  const failed = new Set([failedName])
  for (const n of nodes) {
    if (statuses.get(n.name) !== "pending") continue
    if (n.dependsOn.some((d) => failed.has(d))) {
      toSkip.push(n.name)
      failed.add(n.name)
    }
  }
  return toSkip
}
