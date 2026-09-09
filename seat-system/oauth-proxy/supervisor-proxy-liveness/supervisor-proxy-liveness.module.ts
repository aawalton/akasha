import type { Module } from "@akasha/code/module"

export const supervisorProxyLiveness = {
  id: "01a0687c-042b-7000-8bbe-73cc8f950dec",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-proxy-liveness",
  definition: "watching the oauth proxy and acting when it stops answering",
  code: "ts",
} as const satisfies Module
