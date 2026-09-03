import type { Workflow } from "../workflow-types/workflow-types.module.code.ts"

const DEFAULT_WHEN = { event: "push" } as const

export function workflow(
  name: string,
  config: Omit<Workflow, "name" | "when"> & { when?: Workflow["when"] }
): Workflow {
  const { when, kind, ...rest } = config
  return {
    name,
    ...(kind != null ? { kind } : {}),
    when: when ?? DEFAULT_WHEN,
    ...rest,
  }
}
