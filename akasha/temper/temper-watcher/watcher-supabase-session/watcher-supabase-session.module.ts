import type { Module } from "@akasha/code-system/module"

export const watcherSupabaseSession = {
  id: "01a063c7-b050-740f-b53f-4554b3cfc269",
  pageTypeSlug: "module",
  slug: "watcher-supabase-session",
  definition:
    "the Supabase client the watcher worker holds and the stored session the client signs in with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller holds the Supabase client in a value the caller made.",
    },
    {
      invariantKind: "absence",
      statement: "No Supabase client is held at module level.",
    },
    {
      invariantKind: "departure",
      statement: "A second start hands back the client the first start made.",
    },
    {
      invariantKind: "departure",
      statement: "A start that threw leaves the holder empty.",
    },
    {
      invariantKind: "departure",
      statement: "Asking a holder that holds no client throws.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing in making the Supabase client waits on anything.",
    },
    {
      invariantKind: "departure",
      statement: "A failed re-authentication is handed to the caller rather than ending the run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ends the process.",
    },
    {
      invariantKind: "departure",
      statement: "The store the session is kept in is handed in rather than opened here.",
    },
    {
      invariantKind: "departure",
      statement: "The key the session is kept under is handed in rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "A key other than the one handed in is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A key other than the one handed in is left unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "A stored blob whose shape does not fit is answered as no session.",
    },
    {
      invariantKind: "departure",
      statement: "A session blob carries an access token.",
    },
    {
      invariantKind: "departure",
      statement: "A session blob carries a refresh token.",
    },
    {
      invariantKind: "departure",
      statement: "A session blob carries an expiry written as a number.",
    },
    {
      invariantKind: "departure",
      statement: "A session blob carrying keys beyond the three required is still a session.",
    },
    {
      invariantKind: "departure",
      statement: "One sign-out at a time is re-authenticated.",
    },
    {
      invariantKind: "departure",
      statement: "An event other than a sign-out is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Signing in afresh is handed in as a function rather than imported.",
    },
    {
      invariantKind: "departure",
      statement:
        "The maker of the Supabase client is handed in as a function rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "An empty anonymous key is refused as no key baked into the build.",
    },
    {
      invariantKind: "absence",
      statement: "No key is written here.",
    },
    {
      invariantKind: "absence",
      statement: "No test here makes a real Supabase client.",
    },
  ],
} as const satisfies Module
