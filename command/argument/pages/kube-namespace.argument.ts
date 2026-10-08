import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const kubeNamespace = {
  id: "01a094eb-dea6-7a3a-9786-e0308a924f23",
  type: "page-type/argument",
  slug: "kube-namespace",
  said: "--namespace",
  takes: "the Kubernetes namespace to look in, read as a literal string",
  value: "text",
  placeholder: "ns",
  default: "ci",
  createdAt: "2026-09-12T09:21:21.062Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
