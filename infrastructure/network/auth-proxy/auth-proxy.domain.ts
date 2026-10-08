import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const authProxy = {
  id: "01a06864-a443-7933-9156-35c26aacdfcf",
  type: "page-type/domain",
  slug: "auth-proxy",
  definition: "how a person signs in to a service in the cluster",

  parts: [
    "manifest/auth-proxy-manifests",
    "module/auth-proxy-config",
    "module/auth-proxy-server",
    "module/proxy",
    "module/proxy-reading",
    "module/route-map-core",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every request the cluster answers from outside arrives here first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host the route map names no target for is refused rather than guessed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code is minted by alanwalton.com and kept here as a cookie of the host's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The people a host behind the proxy admits are named in that host's environment.",
    },
  ],
  createdAt: "2026-09-03T17:50:21.251Z",
  updatedAt: "2026-09-25T16:54:38.000Z",
} as const satisfies Domain
