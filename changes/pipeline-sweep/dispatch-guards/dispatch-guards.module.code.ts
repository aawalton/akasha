import {
  STEP_NEGATIVE,
  STEP_TERMINAL,
  UNDERWAY,
} from "@akasha/pipeline-sweep/pipeline-page-statuses"
import type { Step, Workflow } from "@akasha/pipeline-sweep/pipeline-row-entities"

export const BLOCKER_WALK_BOUND = 4096

export function stepsByTitle(steps: readonly Step[]): ReadonlyMap<string, Step> {
  const out = new Map<string, Step>()
  for (const one of steps) if (!out.has(one.title)) out.set(one.title, one)
  return out
}

export function dependenciesOf(step: Step, byTitle: ReadonlyMap<string, Step>): readonly Step[] {
  return step.dependsOn
    .map((title) => byTitle.get(title))
    .filter((one): one is Step => one !== undefined)
}

export function workflowIsHealthy(workflow: Workflow): boolean {
  return UNDERWAY.has(workflow.status)
}

function answersFailure(step: Step): boolean {
  return step.whenConditions.some((one) => STEP_NEGATIVE.has(one))
}

export function blockerOf(step: Step, byTitle: ReadonlyMap<string, Step>): string | null {
  for (const title of step.dependsOn) {
    const dependency = byTitle.get(title)
    if (dependency === undefined) continue
    if (STEP_NEGATIVE.has(dependency.status) && !answersFailure(dependency)) return dependency.title
  }

  const seen = new Set<string>()
  const queue = [...step.dependsOn]
  let walked = 0
  while (queue.length > 0) {
    walked += 1
    if (walked > BLOCKER_WALK_BOUND) {
      throw new Error(
        `walking the dependencies of step ${step.seq} passed ${BLOCKER_WALK_BOUND} steps without ` +
          "settling, so its `depends-on` names a cycle or a tree too deep to answer"
      )
    }
    const title = queue.shift()
    if (title === undefined || seen.has(title)) continue
    seen.add(title)
    const dependency = byTitle.get(title)
    if (dependency === undefined || answersFailure(dependency)) continue
    if (STEP_NEGATIVE.has(dependency.status)) return dependency.title
    for (const further of dependency.dependsOn) if (!seen.has(further)) queue.push(further)
  }
  return null
}

export function whenConditionMet(step: Step, dependencies: readonly Step[]): boolean {
  if (step.whenConditions.length === 0) return true
  if (dependencies.length === 0) return true
  return dependencies.some((one) => step.whenConditions.includes(one.status))
}

export function allTerminal(steps: readonly Step[]): boolean {
  return steps.every((one) => STEP_TERMINAL.has(one.status))
}
