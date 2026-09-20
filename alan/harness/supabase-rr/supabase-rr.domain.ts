import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supabaseRr = {
  id: "01a05c97-8af3-7dbb-b6b0-4fd120a787a9",
  type: "page-type/domain",
  slug: "supabase-rr",
  definition: "Supabase reached from a React Router app, on the server and in the browser",

  parts: [
    "module/auth-client",
    "module/auth-guard",
    "module/auth-mode",
    "module/auth-server",
    "module/browser-client",
    "module/browser-session-refresh",
    "module/client-env-guard",
    "module/cookie-options",
    "module/effective-auth",
    "module/page-listing-loader",
    "module/request-context",
    "module/request-memo",
    "module/request-session-cache",
    "module/root-loader",
    "module/server-client",
    "module/session-cookie",
    "module/session-refresh",
    "module/sign-out-route",
    "module/sign-up-route",
    "module/supabase-provider",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No key is here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is in cookies on the web and in the device's own store on iOS.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request has the client and the session the request worked out.",
    },
  ],
} as const satisfies Domain
