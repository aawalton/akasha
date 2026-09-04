import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const authProxy = {
  id: "01a06864-a443-7933-9156-35c26aacdfcf",
  pageTypeSlug: "workspace-package",
  slug: "auth-proxy",
  definition: "the server reading a request's session cookie before passing the request on",
  manifest: "json",
  partSlugs: [
    "module/auth-proxy-config",
    "module/auth-proxy-server",
    "module/cookie-match-core",
    "module/cors",
    "module/cors-core",
    "module/proxy",
    "module/proxy-core",
    "module/route-map-core",
    "module/session-identity",
    "module/ttl-cache",
    "module/ws-bridge",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every request the cluster answers from outside arrives here first.",
    },
    {
      invariantKind: "departure",
      statement: "A host the route map names no target for is refused rather than guessed at.",
    },
    {
      invariantKind: "absence",
      statement: "A session is handed out and ended by the auth server rather than by the proxy.",
    },
  ],
} as const satisfies WorkspacePackage
