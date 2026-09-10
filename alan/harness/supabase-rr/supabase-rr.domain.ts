import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const supabaseRr = {
  id: "01a05c97-8af3-7dbb-b6b0-4fd120a787a9",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "supabase-rr",
  definition: "Supabase reached from a React Router app, on the server and in the browser",

  parts: [
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
      statement: "No key is here.",
    },
    {
      invariantKind: "departure",
      statement: "A session is in cookies on the web and in the device's own store on iOS.",
    },
    {
      invariantKind: "departure",
      statement: "A request has the client and the session the request worked out.",
    },
  ],
} as const satisfies Domain
