import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const simAuth = {
  id: "01a05cee-e560-7b4b-9878-974e9ad04004",
  type: "page-type/module",
  slug: "sim-auth",
  definition: "password sign-in against supabase yielding a session and the user id it belongs to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The email and password come from the environment rather than from a value in this file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The throwaway identity and the real identity read from separate environment variables.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The real identity is admitted only as a deliberate read-only opt-in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "SUPABASE_STORAGE_KEY is the localStorage key the app's supabase client reads.",
    },
  ],
} as const satisfies Module
