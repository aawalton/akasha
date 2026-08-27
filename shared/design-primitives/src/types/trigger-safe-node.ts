import type { ReactNode } from "react"

export type TriggerSafeNode = ReactNode & {
  readonly __brand: "TriggerSafeNode"
}

export function TriggerSafeNode(node: ReactNode): TriggerSafeNode {
  return node as TriggerSafeNode
}
