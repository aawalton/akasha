export interface Rule {
  apiGroups: readonly string[]
  resources: readonly string[]
  verbs: readonly string[]
  resourceNames?: readonly string[]
  resourcesRaw?: string
}

export interface NonResourceRule {
  nonResourceURLs: readonly string[]
  verbs: readonly string[]
}

export interface NamespaceProfile {
  namespace: string
  roleName: string
  comment?: string
  rules: ReadonlyArray<{ comment?: string } & Rule>
}
