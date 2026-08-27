const KEY_NAME = "app.kubernetes.io/name" as const
const KEY_INSTANCE = "app.kubernetes.io/instance" as const
const KEY_COMPONENT = "app.kubernetes.io/component" as const
const KEY_PART_OF = "app.kubernetes.io/part-of" as const
const KEY_MANAGED_BY = "app.kubernetes.io/managed-by" as const

export type LabelInput = {
  readonly name: string
  readonly managedBy: string
  readonly instance?: string
  readonly component?: string
  readonly partOf?: string
}

export type KubernetesLabels = Readonly<Record<string, string>>

export function kubernetesLabels(input: LabelInput): KubernetesLabels {
  const out: Record<string, string> = {}
  out[KEY_NAME] = input.name
  if (input.instance !== undefined) out[KEY_INSTANCE] = input.instance
  if (input.component !== undefined) out[KEY_COMPONENT] = input.component
  if (input.partOf !== undefined) out[KEY_PART_OF] = input.partOf
  out[KEY_MANAGED_BY] = input.managedBy
  return out
}

export type SelectorMode = "name-instance" | "name-instance-component"

export function selectorOf(labels: KubernetesLabels, mode: SelectorMode): KubernetesLabels {
  const name = labels[KEY_NAME]
  const instance = labels[KEY_INSTANCE]
  if (name === undefined) throw new Error(`selectorOf: labels missing required ${KEY_NAME}`)
  if (instance === undefined) throw new Error(`selectorOf: labels missing required ${KEY_INSTANCE}`)
  if (mode === "name-instance") {
    return { [KEY_NAME]: name, [KEY_INSTANCE]: instance }
  }
  const component = labels[KEY_COMPONENT]
  if (component === undefined) {
    throw new Error(`selectorOf: labels missing required ${KEY_COMPONENT} for mode ${mode}`)
  }
  return { [KEY_NAME]: name, [KEY_INSTANCE]: instance, [KEY_COMPONENT]: component }
}
