import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const kubeNamespace = {
  id: "01a094eb-dea6-7a3a-9786-e0308a924f23",
  type: "argument",
  slug: "kube-namespace",
  said: "--namespace",
  takes: "the Kubernetes namespace to look in, read as a literal string",
  value: "text",
  placeholder: "ns",
  default: "ci",
} as const satisfies Argument
