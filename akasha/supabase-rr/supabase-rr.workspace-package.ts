import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const supabaseRr = {
  id: "01a05c97-8af3-7dbb-b6b0-4fd120a787a9",
  pageTypeSlug: "workspace-package",
  slug: "supabase-rr",
  definition: "Supabase reached from a React Router app, on the server and in the browser",
  manifest: "json",
  partSlugs: [
    "module/auth-mode",
    "module/cookie-options",
    "module/request-memo",
    "module/session-cookie",
    "module/effective-auth",
    "module/browser-client",
    "module/server-client",
    "module/request-session-cache",
    "module/session-refresh",
    "module/auth-client",
    "module/auth-server",
    "module/auth-guard",
    "module/supabase-provider",
    "module/client-env-define",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No key stands here.",
    },
    {
      invariantKind: "departure",
      statement: "A session is carried in cookies on the web and in the device's own store on iOS.",
    },
    {
      invariantKind: "departure",
      statement: "One request works out its client and its session once.",
    },
  ],
} as const satisfies WorkspacePackage
